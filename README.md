# Gxd-vue-file-preview

#### 介绍
```text
vue 文件在线预览展示功能，支持文件（PDF，PNG，JPEG，JPG，GIF，DOC，DOCX，PPT，PPTX，ELXS，ELX）
```

#### 预览
![demo](http://static.e56buy.com/1610238353869.jpg ''demo'')

#### 安装
```bash

npm i gxd-file-preview --save --registry  https://registry.npm.taobao.org
```

#### 插件全局引用
``` javascript

import vueFilePreview from 'gxd-file-preview';

//初始化自定义插件，（pdf.js,worker.js文件建议放在本地服务器),cdn有可能不稳定
Vue.use(vueFilePreview,{
    pdf: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.288/build/pdf.min.js', //pdf插件
    worker:'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.288/build/pdf.worker.min.js',//pdf.work插件
});

```


#### 插件使用
```vue
<template>
  <div id="app"></div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
    data(){
      return {}
    },
    created() {
      setTimeout(()=>{
        this.$preview({
          //url: 'https://testimg.tiangongy.com/100601/a024b86760bb1ff3b38f25ae2e0b9bdf', //图片
          //url: 'https://testimg.tiangongy.com/100601/9958ff80d202f91b347b14b5c56f14e8', // xlsx
          //url: 'https://testimg.tiangongy.com/100601/12d7e6a9b0b9169b800fbb29061212c2', //pptx
          //url: 'https://testimg.tiangongy.com/100601/ce44c69f3075334e6c624b8180a42804', //doc,
          //url: 'https://testimg.tiangongy.com/100601/3b85b4f1c3accdb4bb9f7e42e1f9070e',
          url:'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
          fid: '12121212'
        })
      }, 2000);

    },
    methods:{

    }
  }
</script>

<style>
</style>

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

