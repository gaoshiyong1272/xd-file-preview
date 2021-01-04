<template>
  <div class="office-preview" :id="options.ele" v-if="info && options && options.ele">
    <div class="office-preview-title">
      <div class="office-preview-text">
        <img :src="options.icon" height="30" width="30">
        <span>{{options.name}}.{{options['type'].toLocaleLowerCase()}}</span>
        <button class="btn" @click="download">下载</button>
      </div>
      <div class="office-preview-close" @click="handleCloseClick(options.ele)"><i class="iconfont iconwrong"></i></div>
    </div>
    <div class="office-preview-content">
      <div class="office-preview-content-box">
        <iframe v-if="src" :src="src" height="100%" width="100%" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
  window.pdfUrl = "";
  window.pdfLang = "zh-CN";
  import download from 'downloadjs';

  export default {
    name: "office-preview",
    props: {
      options:{
        type: Object|null,
        default(){
          return null
        },
      }
    },
    created(){
      if(this.options) {
        this.getUrl(this.options['source'])
      }

    },
    watch: {
      options(val) {
        if (val) {
          console.log('options',val);
          this.getUrl(val['source']);
          this.info = val;
        }
      }
    },
    data() {
      return {
        otherPreviewUrl: 'https://view.officeapps.live.com/op/view.aspx?src=',
        src: '',
        info: null,
      }
    },
    methods: {
      download() {
        console.log(this.info)
        download(this.info['response'], this.info['name'])
      },

      getUrl(val) {
        this.src = `${this.otherPreviewUrl}${val}&lang=${window.pdfLang}&llcc=${window.pdfLang}`;
      },
      handleCloseClick(el){
        this.close(el);
      }
    }
  };
</script>
<style>
  .office-preview {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }

  .office-preview-title {
    position: absolute;
    top:0;
    left:0;
    right:0;
    height: 48px;
    background: #333;
    color: #fff;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    box-sizing: border-box;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  .office-preview-text {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .office-preview-text img {
    margin-right: 15px;
  }

  .office-preview-text .btn {
    background: #4395ff;
    margin-left: 20px;
    font-size: 14px;
    height: 30px;
    max-height: 30px;
    border-radius: 15px;
    padding: 0 20px;
    outline: none;
    border: 1px solid #4395ff;
    color: #fff;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    transition: all .5s;
  }

  .office-preview-text .btn:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
    opacity: 0.9;
    background: #539dfc;
    cursor: pointer;
  }

  .office-preview-close {
    cursor: pointer;
    font-size: 30px;
    height: 30px;
    width: 30px;
    line-height: 30px;
  }

  .office-preview-close .el-icon-close {
    font-weight: normal;
  }

  .office-preview-content {
    height: -moz-calc(100% - 0);
    height: -webkit-calc(100% - 0);
    height: calc(100% - 0);
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 9;
  }

  .office-preview-content  iframe {
    background: #000;
    height: 100%;
  }

  .office-preview-content-box {
    height: 100%;
  }



</style>
