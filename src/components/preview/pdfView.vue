<template>
  <div class="pdf-preview" :id="options.ele" v-if="info">
    <div class="pdf-preview__title">
      <div class="pdf-preview__title-text">
        <img :src="options.icon" height="30" width="30">
        <input class="pdf-preview__input" v-model.number="page" type="number">
        <span>/ {{numPages}}</span>
        <button class="btn" @click="download">下载</button>
        <span>{{info.name|getFileName(options['type'].toLocaleLowerCase())}}</span>
      </div>
      <div class="pdf-preview__title-close" @click="closeHandle(options.ele)"><i class="fileIconfont iconwrong"></i></div>
    </div>
    <div class="pdf-preview__content" :style="`width: ${getWdith}`">
      <xd-pdf
        :file-url="info['response']"
        @num-pages="setTotalNumPages"
        :current-pages="page"
      ></xd-pdf>
    </div>
    <div class="img-preview__toolbar">
      <span>
        <i class="fileIconfont iconfangda" @click="zoomHandle(1)"></i>
        <i class="fileIconfont iconsuoxiao" @click="zoomHandle(-1)"></i>
        <i class="fileIconfont iconpageup" @click="overPage(-1)"></i>
        <i class="fileIconfont iconpagedown" @click="overPage(1)"></i>
        <i class="fileIconfont iconhuanyuan" @click="zoomOriginalSize()"></i>
      </span>
    </div>
    <div class="img-preview__bottom"></div>
  </div>
</template>
<script>
  import helper from "./helper";
  import download from 'downloadjs';
  import XdPdf from "../XdPdf";

  export default {
    name: "xdPdfPreview",
    props: {
      options: {
        type: Object|null,
        default(){
          return null
        }
      },
    },
    components: {XdPdf},
    data() {
      return {
        src: '',
        loadedRatio: 0,
        page: 1,
        numPages: 0,
        rotate: 0,
        width: 0.5,
        info: null,
      }
    },
    filters:{
      getFileName(name, type){
        if(name.indexOf(`.${type}`) === -1) {
          return `${name}.${type}`
        }
        return name;
      }
    },
    watch:{
      options(val){
        this.info = val;
        if(this.info['url']) {
          this.src= this.info['url']
        }
      },
    },
    created(){
      this.info = this.options;

    },
    computed:{
      getWdith() {
        return (this.width * 100) + '%';
      },
    },
    methods: {
      /**
       * @description 设置总页数
       */
      setTotalNumPages(num){
        this.numPages = num;
      },
      closeHandle(id) {
        this.close(id);
      },

      download(){
        download(this.info['response'], this.info['name'])
      },

      /**
       * @description 翻页处理
       * @param type
       */
      overPage(type){
        if (this.page + type === 0) {
          this.page = 1;
        }
        else if(this.page + type >= this.numPages){
          this.page = this.numPages;
        }
        else{
          this.page = this.page + type;
        }
      },

      zoomOriginalSize(){
        this.width = 0.5
      },

      /**
       * @description 放大页面30-100之间
       * @param type
       */
      zoomHandle(type){
        if(type === 1) {
          if (helper.addFloatNumber(this.width, 0.1) < 0.3) {
            this.width = 0.3;
          } else if (helper.addFloatNumber(this.width, 0.1) >= 1) {
            this.width = 0.98;
          } else {
            this.width = helper.addFloatNumber(this.width, 0.1);
          }
        }else{
          if (helper.cutFloatNumber(this.width, 0.1) < 0.3) {
            this.width = 0.3;
          } else if (helper.cutFloatNumber(this.width, 0.1) >= 1) {
            this.width = 0.98;
          } else {
            this.width = helper.cutFloatNumber(this.width, 0.1);
          }
        }
      },

      password: function (updatePassword, reason) {
        updatePassword(prompt('password is "test"'));
      },
      error: function (err) {
        console.log(err);
      }
    }
  };
</script>
<style type="text/css">
  @import "style.css";

  .pdf-preview i.fileIconfont {
    font-size: 30px;
    font-weight: normal;
  }
  .pdf-preview {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    min-width: 1000px;
    min-height: 300px;
    background: rgba(0, 0, 0, .6);
    z-index: 10000;
    padding-top: 48px;
    box-sizing: border-box;
  }
  .pdf-preview__title {
    position: absolute;
    background: #333;
    top: 0;
    right: 0;
    left:0;
    width: 100%;
    height: 48px;
    padding: 0 0 0 10px;
    box-sizing: border-box;
    color: #fff;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
  }
  .pdf-preview__title-close {
    cursor: pointer;
    font-size: 18px;
    height: 40px;
    width: 40px;
    line-height: 40px;
  }
  .pdf-preview__content {
    height: -moz-calc(100% - 55px);
    height: -webkit-calc(100% - 55px);
    height: calc(100% - 55px);
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    position: relative;
    z-index: 9;
    margin: 0 auto;
  }
  .img-preview__toolbar {
    position: absolute;
    font-size: 0;
    left: 50%;
    bottom: 30px;
    text-align: center;
    transform: translateX(-50%);
    z-index: 10000
  }
  .img-preview__toolbar span {
    display: flex;
    line-height: 24px;
    border-radius: 8px;
    padding: 8px 10px;
    font-size: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .img-preview__toolbar span * {
    margin: 0 6px;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    font-weight: 400;
  }
  .pdf-preview__title-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .pdf-preview__title-text img {
    margin-right: 10px;
  }

  .pdf-preview__title-text span {
    padding: 0 20px 0 10px;
  }
  .pdf-preview__title-text .btn {
    background: #4395ff;
    font-size: 14px;
    height: 30px;
    max-height: 30px;
    border-radius: 15px;
    padding: 0 20px;
    outline: none;
    border: 1px solid #4395ff;
    color: #fff;
    box-shadow: 0 0 0 rgba(0,0,0,0);
    transition: all .5s;
  }

  .pdf-preview__title-text .btn:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
    opacity: 0.9;
    background: #539dfc;
    cursor: pointer;
  }

  .pdf-preview__title-text .pdf-preview__input {
    font-size: 14px;
    height: 30px;
    max-height: 30px;
    border-radius: 15px;
    background-color: #fff;
    padding: 0 20px;
    width: 50px;
    text-align: center;
    outline: none;
  }
  .img-preview__bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 5px;
    background: #333;
    z-index: 10;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }


</style>
