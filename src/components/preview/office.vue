<template>
  <div class="pdf-preview" :id="options.ele" v-if="options && options.ele">
    <div class="pdf-preview-title">
      <div class="pdf-preview-close" @click="close(options.ele)"><i class="iconfont iconwrong"></i></div>
    </div>
    <div class="pdf-preview-content">
      <div class="pdf-preview-content-box">
        <iframe v-if="src" :src="src" height="100%" width="100%" frameborder="0"></iframe>
      </div>
    </div>
  </div>
</template>
<script>
  window.pdfUrl = "";
  window.pdfLang = "zh-CN";
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
          this.getUrl(val['source'])
        }
      }
    },
    data() {
      return {
        otherPreviewUrl: 'https://view.officeapps.live.com/op/view.aspx?src=',
        src: '',
      }
    },
    methods: {
      getUrl(val) {
        this.src = `${this.otherPreviewUrl}${val}&lang=${window.pdfLang}&llcc=${window.pdfLang}`;
      }
    }
  };
</script>
<style>
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
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }

  .pdf-preview-title {
    position: absolute;
    top: 8px;
    right: 14px;
    width: 30px;
    height: 30px;
    color: #fff;
    z-index: 10;
  }

  .pdf-preview-close {
    cursor: pointer;
    font-size: 30px;
    width: 100%;
    height: 100%;
    line-height: 30px;
  }

  .pdf-preview-close .el-icon-close {
    font-weight: normal;
  }

  .pdf-preview-content {
    height: -moz-calc(100% - 0);
    height: -webkit-calc(100% - 0);
    height: calc(100% - 0);
    height: 100%;
    overflow: hidden;
    position: relative;
    z-index: 9;
  }
  .pdf-preview-content  iframe {
    background: #000;
  }

  .pdf-preview-content-box {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
    height: 100%;
  }

  .pdf-preview-content-box img {

  }

  .pdf-preview-mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

</style>
