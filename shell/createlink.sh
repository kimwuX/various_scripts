#!/bin/bash

print_menu() {
    echo ""
    echo "------------------------------"
    echo "1. Create a hard link to target file"
    echo "2. Create a symbolic link to target file/directory"
    echo "3. Create hard links to all files in target directory"
    echo "4. Create symbolic links to all files in target directory"
    echo "5. Exit"
    echo "------------------------------"
    echo ""
}

create_one() {
    while true; do
        read -p "Enter target path: " src_path
        if [ -n "$src_path" ]; then
            break
        fi
    done
    # 检查源文件/目录是否存在
    if [ ! -e "$src_path" ]; then
        echo "ERROR: '$src_path' NOT exists"
        return
    fi
    # 目录不能创建硬链接
    if [ -d "$src_path" ] && [ $1 -eq 0 ]; then
        echo "ERROR: CANNOT create hard link to directory"
        return
    fi

    read -p "Enter parent directory (leave empty for current direcotry): " dst_dir
    [ -z "$dst_dir" ] && dst_dir=$PWD
    # 创建目标目录（如不存在）
    if [ ! -d "$dst_dir" ]; then
        mkdir -p "$dst_dir"
        if [ $? -ne 0 ]; then
            echo "ERROR: '$dst_dir' directory create FAILED"
            return
        fi
    fi

    read -p "Enter link name (leave empty for source name): " link_name
    # 链接名称
    [ -z "$link_name" ] && link_name=$(basename "$src_path")

    dst_link="${dst_dir%/}/$link_name"
    if [ $1 -eq 0 ]; then
        ln "$src_path" "$dst_link"
    else
        ln -s "$src_path" "$dst_link"
    fi
    if [ $? -eq 0 ]; then
        echo "Link: $dst_link → $src_path"
    else
        echo "ERROR: link create FAILED"
    fi
}

create_all() {
    while true; do
        read -p "Enter target directory: " src_dir
        if [ -n "$src_dir" ]; then
            break
        fi
    done
    # 检查源目录是否存在
    if [ ! -d "$src_dir" ]; then
        echo "ERROR: '$src_dir' NOT exists"
        return
    fi

    read -p "Enter parent directory of link (leave empty for current direcotry): " dst_dir
    [ -z "$dst_dir" ] && dst_dir=$PWD

    read -p "Enter link directory (leave empty for source name): " link_name
    # 链接文件夹名称
    [ -z "$link_name" ] && link_name=$(basename "$src_dir")
    link_dir="${dst_dir%/}/$link_name"

    # 创建目标目录（如不存在）
    if [ ! -d "$link_dir" ]; then
        mkdir -p "$link_dir"
        if [ $? -ne 0 ]; then
            echo "ERROR: '$link_dir' directory create FAILED"
            return
        fi
    fi

    # 处理目录结构
    find "$src_dir" -type d -print0 | while IFS= read -r -d '' dir; do
        rel_path="${dir#$src_dir}"
        target_dir="$link_dir/${rel_path#/}"

        # 跳过已存在的目录
        [ -d "$target_dir" ] && continue

        mkdir -p "$target_dir"
    done

    count=0
    # 创建文件链接
    find "$src_dir" -type f -print0 | while IFS= read -r -d '' file; do
        rel_path="${file#$src_dir}"
        target_file="$link_dir/${rel_path#/}"

        # 跳过已存在的文件
        if [ -e "$target_file" ]; then
            echo "WARNING: '$target_file' existed"
            continue
        fi

        if [ $1 -eq 0 ]; then
            ln "$file" "$target_file"
        else
            ln -s "$file" "$target_file"
        fi
        if [ $? -eq 0 ]; then
            ((count++))
            echo "($count)Link: $target_file → $file"
        else
            echo "ERROR: link create FAILED"
        fi
    done
}

# 主程序
while true; do
  print_menu
  read -p "Enter your choice: " choice
  case $choice in
    1)
      create_one 0
      ;;
    2)
      create_one 1
      ;;
    3)
      create_all 0
      ;;
    4)
      create_all 1
      ;;
    5)
      echo "Goodbye!"
      break
      ;;
    *)
      echo "Invalid choice, please try again."
      ;;
  esac
done
