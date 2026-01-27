#!/bin/bash
set -euo pipefail

# 初始化默认参数
TARGET_DIR="."          # 默认当前目录
DRY_RUN=0               # 0=实际执行，1=仅预览
OLD_STR=""              # 要替换的原内容
NEW_STR=""              # 替换后的新内容
USE_REGEX=0             # 0=普通字符串替换(默认)，1=正则替换

# 颜色输出（增强可读性）
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # 恢复默认颜色

# 显示使用帮助
show_help() {
    cat << EOF
批量重命名文件脚本 - 支持普通/正则替换、指定目录、dry run预览
使用格式: $0 [选项] 原内容 新内容
核心参数:
  原内容    要替换的文件名内容（普通模式：直接写字符串，无需转义；正则模式：按sed规则写正则）
  新内容    替换后的内容（正则模式下可通过 \\1/\\2 引用sed正则分组）

可选选项:
  -d, --dir DIR         指定目标文件目录（默认：当前目录 ./）
  -n, --dry-run         仅预览重命名结果，不实际执行（dry run模式）
  -r, --regex           开启正则替换模式（默认：普通字符串全局替换）
  -h, --help            显示本帮助信息

使用示例:
  1. 普通替换：当前目录所有文件的"old"为"new"，实际执行
     $0 old new
  2. 正则替换：预览将/tmp/files下file123.txt的数字替换为_num_，指定目录+预览
     $0 -d /tmp/files -n -r 'file([0-9]+)' 'file_num_\\1'
  3. 普通替换后缀：当前目录txt改为md（无需转义.），dry run预览
     $0 -n .txt .md
  4. 正则替换后缀：当前目录仅替换纯txt后缀（需转义.），实际执行
     $0 -r '\\.txt$' '.md'
  5. 普通替换：移除./docs目录文件名中的空格，实际执行
     $0 -d ./docs ' ' ''
EOF
}

# 解析命令行参数
parse_args() {
    while [[ $# -gt 0 ]]; do
        case "$1" in
            -d|--dir)
                TARGET_DIR="$2"
                shift 2
                ;;
            -n|--dry-run)
                DRY_RUN=1
                shift
                ;;
            -r|--regex)
                USE_REGEX=1
                shift
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            --)
                shift
                break
                ;;
            *)
                # 收集原内容和新内容（最后两个非选项参数）
                if [[ -z "$OLD_STR" ]]; then
                    OLD_STR="$1"
                elif [[ -z "$NEW_STR" ]]; then
                    NEW_STR="$1"
                else
                    echo -e "${RED}错误：多余的参数 -> $1${NC}" >&2
                    show_help
                    exit 1
                fi
                shift
                ;;
        esac
    done

    # 校验核心参数
    if [[ -z "$OLD_STR" || -z "$NEW_STR" ]]; then
        echo -e "${RED}错误：必须传入「原内容」和「新内容」两个核心参数！${NC}" >&2
        show_help
        exit 1
    fi

    # 校验目录是否存在
    if [[ ! -d "$TARGET_DIR" ]]; then
        echo -e "${RED}错误：指定的目录不存在 -> $TARGET_DIR${NC}" >&2
        exit 1
    fi

    # 标准化目录路径（确保以/结尾，避免拼接错误）
    TARGET_DIR=$(realpath "$TARGET_DIR")
}

# 核心重命名函数
batch_rename() {
    local file old_name new_name
    # 遍历目标目录下的所有文件（不含子目录，如需递归可修改为find）
    for file in "$TARGET_DIR"/*; do
        # 跳过目录、链接，仅处理普通文件
        [[ -f "$file" ]] || continue
        # 获取纯文件名（不含路径）
        old_name=$(basename "$file")

        # 分模式生成新文件名：普通字符串替换 / 正则替换
        if [[ $USE_REGEX -eq 1 ]]; then
            # 正则替换：sed -E 扩展正则，g全局替换
            new_name=$(echo "$old_name" | sed -E "s/$OLD_STR/$NEW_STR/g")
        else
            # 普通字符串替换：bash内置替换，${变量//原字符串/新字符串} 实现全局替换
            new_name=${old_name//$OLD_STR/$NEW_STR}
        fi

        # 新名和原名一致，跳过
        if [[ "$new_name" == "$old_name" ]]; then
            continue
        fi

        # 处理dry run/实际执行
        if [[ $DRY_RUN -eq 1 ]]; then
            echo -e "${YELLOW}[预览]${NC} $old_name -> ${GREEN}$new_name${NC}"
        else
            # 实际重命名（-v显示过程）
            mv -v "$file" "$TARGET_DIR/$new_name"
        fi
    done

    # 执行完成提示
    echo -e ""
    if [[ $DRY_RUN -eq 1 ]]; then
        echo -e "${YELLOW}【预览结束】未实际修改文件名（-n/--dry-run）${NC}"
    else
        echo -e "${GREEN}【执行完成】批量重命名结束，目标目录：$TARGET_DIR${NC}"
    fi
    echo -e "${YELLOW}【替换模式】$( [[ $USE_REGEX -eq 1 ]] && echo "正则替换" || echo "普通字符串全局替换" )${NC}"
}

# 主执行流程
main() {
    parse_args "$@"
    # 打印配置预览
    echo -e "${YELLOW}===== 批量重命名配置 =====${NC}"
    echo -e "目标目录：$TARGET_DIR"
    echo -e "替换规则：「$OLD_STR」→「$NEW_STR」"
    echo -e "执行模式：$( [[ $DRY_RUN -eq 1 ]] && echo "仅预览（dry run）" || echo "实际执行" )"
    echo -e "替换模式：$( [[ $USE_REGEX -eq 1 ]] && echo "正则替换（sed -E）" || echo "普通字符串替换（全局）" )"
    echo -e "${YELLOW}=========================${NC}\n"
    # 执行重命名
    batch_rename
}

# 启动主函数
main "$@"