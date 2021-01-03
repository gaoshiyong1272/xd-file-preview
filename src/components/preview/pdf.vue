<template>
  <div class="pdf-preview" :id="options.ele" v-if="options && options.ele">
    <div class="pdf-preview-title">
      <div class="pdf-preview-close" @click="close(options.ele)">
        <a-icon type="close-circle"/>
      </div>
    </div>
    <div class="pdf-preview-content">
      <div class="pdf-preview-content-box">
        <iframe v-if="src" :src="src" height="100%" width="100%" frameborder="0"></iframe>
        <div v-else ><a-spin/></div>
      </div>
    </div>
  </div>
</template>
<script>
  window.pdfUrl = "";
  import { getPdfbase46 } from '@/api/'
  import helper from "./helper";
  export default {
    name: "pdf-preview",
    props: {
      options: Object,
    },
    watch: {
      options(val) {
        if (val) {
          if(/^(data:application\/pdf).*$/.test(val.url)) {
            this.getUrl(val)
          }else{
            this.checkCrossDomain(val);
          }
        }
      }
    },

    data() {
      return {
        pdfPreviewUrl: '/static/pdf/web/viewer.html',
        src: '',
      }
    },
    methods: {
      /***
       * 检测访问地址是否跨域
       * @param val
       */
      checkCrossDomain(val){
        let host = helper.parseURL();
        let pdfurl = helper.parseURL(val.url);
        if (host.host !== pdfurl.host) {
          this.getPdfBase64(val);
        }else{
          this.getUrl(val)
        }
      },
      getPdfBase64(val){
        getPdfbase46(val.url)
          .then((res)=>{
            if(res && res.code === 200) {
              console.log(val);
              val.url = res.response;
              this.getUrl(val);
            }
          })
          .catch((res)=>{
            this.$message.error('操作失败');
          });
      },
      getUrl(val) {
        if (/^.*(\.pdf)$/.test(val.url) || /^(data:application\/pdf).*$/.test(val.url)) {
          window.pdfUrl = val.url;
          this.src = this.pdfPreviewUrl;
        }
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
    background: rgba(0, 0, 0, 1);
    z-index: 10000;
  }

  .pdf-preview-title {
    position: absolute;
    top: 15px;
    right: 14px;
    width: 18px;
    height: 18px;
    color: #fff;
    z-index: 10;
  }

  .pdf-preview-close {
    cursor: pointer;
    font-size: 18px;
    width: 100%;
    height: 100%;
    line-height: 18px;
  }

  .pdf-preview-close .el-icon-close {
    font-weight: bold;
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
