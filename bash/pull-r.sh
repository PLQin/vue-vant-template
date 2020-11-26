#!/bin/sh

# Window only
# Win使用命令 start [name].sh 即可运行此脚本，或双击脚本亦可

date +"%Y-%m-%d %H:%M:%S"" ------ git stash"
git stash

date +"%Y-%m-%d %H:%M:%S"" ------ git pull -r"
git pull -r

date +"%Y-%m-%d %H:%M:%S"" ------ git stash pop"
git stash pop

exec /bin/bash
