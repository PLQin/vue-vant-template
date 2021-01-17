#!/bin/sh

# Window only
# Win使用命令 start [name].sh 即可运行此脚本，或双击脚本亦可

date +"%Y-%m-%d %H:%M:%S"" ------ git add ."
git add ../

date +"%Y-%m-%d %H:%M:%S"" ------ git commit"
echo -n "请填写commit（可空）"
read remarks
if [ ! -n "$remarks" ];then
	remarks=`date +%Y-%m-%d" "%H:%M:%S`
fi
git commit -m "$remarks"

date +"%Y-%m-%d %H:%M:%S"" ------ git pull"
git pull

date +"%Y-%m-%d %H:%M:%S"" ------ 请自行执行 git push"
# git push

exec /bin/bash
