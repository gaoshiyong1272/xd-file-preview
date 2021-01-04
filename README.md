# Gxd-vue-file-preview

#### 介绍

vue cli 文件在线预览展示功能

## 安装
```
npm install vue-file-preview --save --registry  https://registry.npm.taobao.org
```

## 插件全局引用
``` javascript

import vueFilePreview from 'gxd-file-preview';

//初始化自定义插件
Vue.use(vueFilePreview,{});


```

##### 项目开发下载与初始化

```bash
# 克隆项目
git clone git@gitee.com:e56buy/xd-file-preview.git

# 进入项目目录
cd xd-file-preview

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。
建议通过npm按照，通过如下操作解决 npm 下载速度慢的问题
npm install --save --registry=https://registry.npm.taobao.org
```
##### Nginx配置静态资源可以跨域访问
```text

#全局模式

server {
    listen       80;
    add_header 'Access-Control-Allow-Origin' '*';
    location /Roboto/ {
        root   /home/images;
        autoindex on;
    }
}

#文件路径配置访问

#访问路径拼接img访问本地绝对路径下的某图片 
location /img/ {
    #跨域配置，如果不生效请先清除浏览器缓存数据
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
    expires      30d;
    #当访问https://server_name/img/路径时，就会访问本的/Users/chokshen/Desktop/img/文件夹
    root /Users/chokshen/Desktop/;
    error_log off;
    access_log /dev/null;
    autoindex on;
}

```

