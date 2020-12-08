# Gxd-vue-base

#### 介绍
vue cli 初始化vue项目基础模块（纯净版本）

##### 项目下载与初始化

```bash
# 克隆项目
git clone git@gitee.com:e56buy/xd-vue-base.git

# 进入项目目录
cd xd-vue-base

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --save --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

##### 项目git迁移相关操作

```bash
$ cd /project/

$ git remote remove origin  //与远端断开联系

$ git remote add origin git@github.com:xxxxxxxxxxxxxxxx.git  ///与远端建立联系

$ git push -u -f origin master //把本地分支强制推送到远端

$ git push --tags   //把本地tags强制推送到远端

$ git push -u -f  --all origin 把所有分支推送到远端

$ git config --global gitflow.multi-release true #建立多分枝
$ git config --global gitflow.multi-hotfix true #建立多分枝

```

