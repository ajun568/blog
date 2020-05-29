---
title: 'git - 命令合集'
description: 'Deeruby: git - 命令合集 页面用于记录git的使用，常用git命令'
date: '2019-12-09'
updated: '2020-05-29'
meta:
- name: keywords
  content: 前端、博客、deeruby、Deeruby、deeruby.com、yijun、yijun's blog、git、git命令、常用命令
---

# git - 命令合集
> 本文档是关于git基础指令的文档

* 帮助命令
```
git help
```
* 克隆远程库代码
```
git clone store_address
```
* 检查当前状态（血的教训，每次pull/checkout前一定要看看分支是否干净）
```
git status
```
* 检查更改的不同
```
git diff
```
* 打印该分支的改动信息(作者，时间，commit内容)
```
git log
```
* 创建新分支 **git branch则为查看当前所有分支**
```
git branch new_name
```
* 切换分支 **创建并切换分支用`git checkout -b branch_name`**
```
git checkout
```
* 提交文件 **"."代表全部**
```
git add .
```
* 给文件附上内容简介`message`
```
git commit -m"message"
```
* 提交到远程分支 **没有origin就是提交到本地分支，下同**
```
git push origin branch_name
```
* 拉取远程分支的内容
```
git pull origin branch_name
```
* 合并分支 **决不允许子分支与子分支合并**
```
git merge branch_name
```
* 重命名本地分支 **重命名远程分支流程：重命名本地->删除远程->推到远程**
```
git branch -m old_name new_name
```
* 删除本地分支
```
git branch -D branch_name
```
* 删除远程分支
```
git push origin --delete branch_name
```
* 版本回退 回退到上一/上N版本
```
git reset --hard HEAD^
git reset --hard HEAD~N
```
* 版本回退 回退到指定ID版本
```
git reset --hard commit_id
```
* 查看版本ID <用于错误回滚流程后的复原`git reset --hard commit_id`>
```
git reflog
```
> 整体流程
```
mkdir folders
git clone origin_address
cd folders
npm install
npm run dev <看配置文件运行方式>
<open a new window>
git checkout -b develop
(git pull origin develop)
git checkout -b feature/xxx/xxx
git add .
git commit -m"xxx"
git push origin feature/xxx/xxx
git checkout develop
git pull origin develop
git merge feature/xxx/xxx <resolve the conflict>
```
