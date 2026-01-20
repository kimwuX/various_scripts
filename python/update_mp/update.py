import requests
import json
import os
import re
import subprocess
import zipfile

# ===================== 核心配置 - 可根据需求修改 =====================
# 本地版本配置文件的存放路径，固定为当前目录下的config.json
LOCAL_CONFIG_FILE = "config.json"
# 超时配置，单位秒
REQUEST_TIMEOUT = 30
# git 命令
GIT_EXE = "git"
# ====================================================================

def init_local_config():
    """初始化本地版本配置文件，如果文件不存在则创建并写入初始模板"""
    if not os.path.exists(LOCAL_CONFIG_FILE):
        # 这里是配置模板，每一个字典对应一个「待更新文件」的完整配置，可新增/修改
        init_config = {
            "files": [{
                "file_name": "项目主程序",             # 文件标识名称（自定义）
                "local_version": "1.0",               # 本地当前版本号
                "server_version_url": "http://服务器1地址/version.json",  # 服务器的版本json文件链接
                "download_url_template": "http://服务器1地址/update/{version}/main_package.zip",  # 文件下载链接模板
                "unzip_target_dir": "./update_main",  # 解压目录（非压缩包留空即可）
                "is_zip": True  # 是否是zip压缩包：True=是，False=普通文件
            },
            {
                "file_name": "数据插件包",
                "local_version": "2.1",
                "server_version_url": "http://服务器2地址/plugin_version.json",
                "download_url_template": "http://服务器2地址/plugin/{version}/data_plugin.exe",
                "unzip_target_dir": "",
                "is_zip": False
            }],
            "repos": [{
                "repo_name": "repo_owner/repo_name",  # 线上仓库名称
                "local_version": "1.0",               # 本地当前版本号
                "target_dir": "./repo_main"           # 线上仓库目录
            }],
            "proxies": {
                "http": "http://127.0.0.1:7897",
                "https": "http://127.0.0.1:7897"
            }
        }

        # 写入初始配置，格式化json方便阅读
        with open(LOCAL_CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump(init_config, f, ensure_ascii=False, indent=4)

        print(f"✅ 初始化本地配置文件完成：{LOCAL_CONFIG_FILE}")
    else:
        print(f"✅ 本地配置文件已存在，开始加载：{LOCAL_CONFIG_FILE}")

def version_compare(online_ver, local_ver) -> bool:
    """
    版本号对比核心函数
    :param online_ver: 服务器获取的线上版本号(str)
    :param local_ver: 本地记录的版本号(str)
    :return: 线上版本更高返回True，否则返回False
    """
    if not local_ver:
        return True

    mat_local_ver = re.search(r"\d+(\.\d+)*", local_ver)
    if not mat_local_ver:
        print(f"\n❌ 本地版本号格式有误：{local_ver}")
        return False
    mat_online_ver = re.search(r"\d+(\.\d+)*", online_ver)
    if not mat_online_ver:
        print(f"\n❌ 线上版本号格式有误：{online_ver}")
        return False

    # 统一转为字符串并按小数点分割成列表
    online_ver_list = mat_online_ver[0].strip().split(".")
    local_ver_list = mat_local_ver[0].strip().split(".")
    # 补零对齐两个版本号的长度，避免 2.0 < 2.0.1 这类情况判断错误
    max_len = max(len(online_ver_list), len(local_ver_list))
    online_ver_list += ["0"] * (max_len - len(online_ver_list))
    local_ver_list += ["0"] * (max_len - len(local_ver_list))

    # 逐位对比版本号大小
    for o, l in zip(online_ver_list, local_ver_list):
        if int(o) > int(l):
            return True
        elif int(o) < int(l):
            return False

    # 版本号完全一致
    return False

def download_file(url, save_path, proxies):
    """断点续传下载文件，返回下载是否成功"""
    try:
        # 创建保存目录
        os.makedirs(os.path.dirname(save_path), exist_ok=True)

        # 请求头，支持断点续传
        headers = {}
        file_size = 0
        if os.path.exists(save_path):
            file_size = os.path.getsize(save_path)
            headers["Range"] = f"bytes={file_size}-"
            print(f"检测到本地已有文件，已下载 {file_size/1024/1024:.2f} MB，开始断点续传")

        response = requests.get(url, headers=headers, stream=True, timeout=REQUEST_TIMEOUT, proxies=proxies)
        if response.status_code == 416:
            print(f"\n✅ 文件已完整下载，本地文件大小：{file_size/1024/1024:.2f} MB")
            return True

        response.raise_for_status()  # 抛出HTTP请求错误

        total_size = int(response.headers.get("content-length", 0)) + file_size
        current_size = file_size
        with open(save_path, "ab") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
                    # 简单进度显示
                    current_size += len(chunk)
                    print(f"\r下载进度: {current_size/1024/1024:.2f}MB / {total_size/1024/1024:.2f}MB", end="")

        print("\n✅ 文件下载完成")
        return True
    except Exception as e:
        print(f"\n❌ 文件下载失败: {str(e)}")
        return False

def rename_old_file(target_path, old_version):
    """
    核心新增：文件/文件夹已存在时，重命名旧文件，追加【_旧版本号】后缀
    :param target_path: 待检查的文件/文件夹路径
    :param old_version: 本地旧版本号，用于拼接后缀
    :return: 重命名后的路径，无文件则返回原路径
    """
    if not os.path.exists(target_path):
        return target_path

    # 清除目录路径后面的 '/' 或者 '\'
    target_path = target_path.strip("/").strip("\\")

    # 区分【文件】和【文件夹】，彻底解决splitext对文件夹的命名错误
    # is_file = os.path.isfile(target_path)
    file_dir = os.path.dirname(target_path)
    file_name = os.path.basename(target_path)

    # 规范命名逻辑：文件=前缀_版本号.后缀 | 文件夹=文件夹名_版本号
    # if is_file:
    #     file_main, file_ext = os.path.splitext(file_name)
    #     # 版本号加在【主体和后缀之间】，保留原文件后缀，不影响文件使用
    #     new_name = f"{file_main}_{old_version}{file_ext}"
    # else:
    #     # 文件夹直接拼接版本号，不走splitext，避免小数点识别错误
    #     new_name = f"{file_name}_{old_version}"

    new_name = f"{file_name}_{old_version}"
    new_path = os.path.join(file_dir, new_name)

    # 执行重命名
    os.rename(target_path, new_path)
    print(f"ℹ️  检测到旧文件已存在，已重命名为: {new_path}")
    return new_path

def unzip_file(zip_path, target_dir, old_version):
    """
    升级解压函数：解压zip压缩包到指定目录，解压前检测文件是否存在，存在则重命名旧文件
    解压后自动删除压缩包，old_version=本地更新前的旧版本号
    """
    try:
        if not zipfile.is_zipfile(zip_path):
            print(f"❌ {zip_path} 不是有效的zip压缩包")
            return False

        # 创建解压目录
        os.makedirs(target_dir, exist_ok=True)
        with zipfile.ZipFile(zip_path, 'r') as zip_file:
            # 遍历压缩包内所有文件/文件夹，逐个处理
            for file_info in zip_file.infolist():
                # 获取当前文件的解压目标路径
                extract_path = os.path.join(target_dir, file_info.filename)

                # 关键逻辑：如果文件/文件夹已存在，先重命名旧文件
                if os.path.exists(extract_path):
                    rename_old_file(extract_path, old_version)

                # 执行解压
                zip_file.extract(file_info, target_dir)

        print(f"✅ 压缩包解压完成，解压路径：{target_dir}")
        # 解压成功后删除压缩包
        os.remove(zip_path)
        print(f"✅ 已删除压缩包源文件：{zip_path}")
        return True
    except Exception as e:
        print(f"❌ 解压失败: {str(e)}")
        return False

def update_local_config(update_subject, update_index, new_version):
    """更新本地配置文件中的版本号"""
    try:
        with open(LOCAL_CONFIG_FILE, "r", encoding="utf-8") as f:
            config_list = json.load(f)

        # 更新对应文件的版本号
        config_list[update_subject][update_index]["local_version"] = new_version

        with open(LOCAL_CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump(config_list, f, ensure_ascii=False, indent=4)

        print(f"✅ 本地版本号已更新为：{new_version}")
        return True
    except Exception as e:
        print(f"❌ 更新本地配置失败: {str(e)}")
        return False

def update_files(file_list, proxies):
    # 遍历每个待更新的文件配置，逐个处理
    for config_idx, config in enumerate(file_list):
        print("="*60)
        print(f"\n📌 开始检查【{config['file_name']}】更新状态")
        current_local_ver = config['local_version'] # 保存旧版本号，用于重命名
        print(f"本地当前版本：{current_local_ver}")
        print(f"服务器版本文件：{config['server_version_url']}")

        # 步骤1：请求服务器的版本JSON文件
        try:
            res = requests.get(config['server_version_url'], timeout=REQUEST_TIMEOUT,
                               proxies=proxies if config['is_proxy'] else None)
            res.raise_for_status()
            server_version_data = res.json()
            # 服务器的json文件中，版本号的key固定为 version（可根据服务器实际情况修改）
            online_version = str(server_version_data.get("version", current_local_ver))
            print(f"服务器最新版本：{online_version}")
        except Exception as e:
            print(f"❌ 获取服务器版本号失败: {str(e)}")
            continue

        # 步骤2：版本号对比，判断是否需要更新
        if not version_compare(online_version, current_local_ver):
            print(f"✅ 当前已是最新版本，无需更新")
            continue

        print(f"⚠️ 检测到新版本！开始执行更新流程")

        # 步骤3：拼接下载链接（模板替换，{version} 会被实际版本号替换）
        download_url = config['download_url_template'].replace("{version}", online_version)
        print(f"📥 文件下载链接：{download_url}")

        # 步骤4：设置下载保存路径
        file_suffix = download_url.split(".")[-1]
        temp_save_path = f"./download/{config['file_name']}.{file_suffix}"

        # 步骤5：下载文件
        if not download_file(download_url, temp_save_path,
                             proxies=proxies if config['is_proxy'] else None):
            continue

        # 步骤6：如果是压缩包，执行【带重命名】的解压；非压缩包则移动并检测重命名
        if config['is_zip'] and config['unzip_target_dir']:
            if not unzip_file(temp_save_path, config['unzip_target_dir'], current_local_ver):
                continue
        else:
            # 非压缩包处理：检测目标文件是否存在，存在则重命名旧文件
            target_path = os.path.join(config['unzip_target_dir'],
                                       os.path.basename(temp_save_path)) if config['unzip_target_dir'] else temp_save_path
            os.makedirs(os.path.dirname(target_path), exist_ok=True)

            # 关键：非压缩包也做重命名处理
            if os.path.exists(target_path):
                rename_old_file(target_path, current_local_ver)

            os.replace(temp_save_path, target_path)
            print(f"✅ 普通文件已保存至：{target_path}")

        # 步骤7：更新本地配置文件的版本号
        update_local_config("files", config_idx, online_version)

def update_repos(repo_list, proxies):
    # 记录当前目录
    current_path = os.getcwd()
    # 遍历每个待更新的仓库配置，逐个处理
    for config_idx, config in enumerate(repo_list):
        print("="*60)
        print(f"\n📌 开始检查【{config['repo_name']}】更新状态")
        current_local_ver = config['local_version']
        print(f"本地当前版本：{current_local_ver}")

        # 步骤1：从GitHub Release获取最新版本号
        try:
            api_url = f"https://api.github.com/repos/{config['repo_name']}/releases"
            response = requests.get(api_url, timeout=REQUEST_TIMEOUT,
                                    proxies=proxies if config['is_proxy'] else None)
            response.raise_for_status()  # 抛出4xx/5xx错误（如404仓库不存在、403请求超限）
            releases = response.json()
            if not releases:
                print(f"❌ 该仓库无Release版本")
                continue
            # 取第一个（最新发布）的tag_name作为版本号
            online_version = releases[0]["tag_name"].strip()
            print(f"线上最新版本：{online_version}")
        except Exception as e:
            print(f"❌ 获取线上版本失败: {str(e)}")
            continue

        # 步骤2：版本号对比，判断是否需要更新
        if not version_compare(online_version, current_local_ver):
            print(f"✅ 当前已是最新版本，无需更新")
            continue
        print(f"⚠️ 检测到新版本！开始执行更新流程")

        # 步骤3：检查本地项目路径
        if not os.path.exists(config['target_dir']):
            print(f"❌ 本地项目路径不存在：{config['target_dir']}")
            continue
        os.chdir(config['target_dir'])  # 切换到项目目录

        try:
            # 步骤4：检查是否为Git仓库
            subprocess.run(
                [GIT_EXE, "rev-parse", "--is-inside-work-tree"],
                capture_output=True, text=True, check=True
            )
            # 步骤5：拉取最新代码
            pull_result = subprocess.run(
                [GIT_EXE, "pull"],
                capture_output=True, text=True, check=True
            )
            print(f"✅ Git拉取成功！\n{pull_result.stdout}")
        except subprocess.CalledProcessError as e:
            error_info = e.stderr or e.stdout
            print(f"❌ Git更新失败：{error_info}")
            print("💡 排查方向：1.Git是否安装 2.本地是否有未提交冲突 3.网络能否访问GitHub 4.本地项目路径是否正确")
            continue
        except FileNotFoundError:
            print(f"❌ 未找到Git可执行文件，请修改GIT_EXE配置")
            continue
        except Exception as e:
            print(f"❌ {config['repo_name']}更新失败：{str(e)}")
            continue
        finally:
            os.chdir(current_path)

        # 步骤6：更新本地配置文件的版本号
        update_local_config("repos", config_idx, online_version)

def main_update_task():
    """主更新任务：核心逻辑执行"""
    # 初始化本地配置
    init_local_config()

    # 加载本地配置
    with open(LOCAL_CONFIG_FILE, "r", encoding="utf-8") as f:
        update_configs = json.load(f)

    update_files(update_configs["files"], update_configs["proxies"])
    update_repos(update_configs["repos"], update_configs["proxies"])

    print("="*60)
    print("\n🎉 所有文件更新检查完成！")

if __name__ == "__main__":
    # 程序入口，直接执行主更新任务
    main_update_task()