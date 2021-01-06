<template>
  <div>
    <div ref="parent"></div>
    <xd-load-pdf-script :pdf="$xdOptions['pdf']" :worker="$xdOptions['worker']" @load="handleLoad"></xd-load-pdf-script>
  </div>
</template>

<script>
  import XdLoadPdfScript from "@/components/XdLoadPdfScript";

  export default {
    name: 'XdPdf',
    components: {XdLoadPdfScript},
    props: {
      fileUrl: {
        type: Blob,
        default: ''
      },
      currentPages: {
        type:Number,
        default: 1,
      }
    },

    data() {
      return {
        pdfFile: null, //pdf对象
        context: null, //canvas对象
      }
    },
    watch:{
      currentPages(val){
        this.openPage(val);
      },
    },

    methods: {
      /**
       * @description pdf 和 workerjs加载完毕事件
       */
      handleLoad(){
        this.createCanvas();
        this.fileReader(this.fileUrl)
          .then(pdfArrayBuffer => {
            this.renderFile(pdfArrayBuffer);
            this.$emit('onLoad', pdfArrayBuffer);
          })
          .catch();
      },

      /**
       * @description 创建Canvas节点
       */
      createCanvas(){
        let canvas = document.createElement('canvas');
        if (this.$refs.parent) {
          this.$refs.parent.appendChild(canvas)
        }
        this.context = canvas.getContext('2d')
      },

      /**
       * @description 文件流转化 Blob to ArrayBuffer
       * @param responseBlob {Blob}
       * @returns {Promise<unknown>}
       */
      fileReader(responseBlob){
        return new Promise((resolve, reject)=>{
          const reader = new FileReader();
          reader.onload = (e) =>{
            let pdfArrayBuffer = new Uint8Array(e.target['result']);
            resolve(pdfArrayBuffer);
          };
          reader.readAsArrayBuffer(responseBlob);
        })
      },

      getPdfFile(url) {
        const _this = this
        this.xhr.abort()// 请求中止
        this.xhr.open('get', url, true)
        this.xhr.responseType = 'blob';
        this.xhr.onload = function () {
          const reader = new FileReader();
          let t = new Date().getTime();
          reader.onload = function (e) {
            let typedarray = new Uint8Array(e.target['result']);
            console.log('111111', new Date().getTime() - t);
            _this.renderFile(typedarray);
            _this.$emit('onLoad', typedarray)
          };
          reader.readAsArrayBuffer(this.response);

        }
        this.xhr.send()
      },

      /***
       * @description 生产pdf对象
       * @param pdfArrayBuffer
       */
      renderFile(pdfArrayBuffer) {
        if(PDFJS !== undefined) {
          // 加载字体文件，避免字体显示不完成，——不加这两行不显示日期
          PDFJS.cMapUrl = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.288/cmaps/';
          PDFJS.cMapPacked = true;
          PDFJS['getDocument'](pdfArrayBuffer).then(pdf => {
            if (pdf) {
              this.pdfFile = pdf;
              let pageNum = pdf.numPages;
              this.$emit('num-pages', pageNum);
              this.openPage(this.currentPages);
            }
          })
        }

      },

      openPage(pageNumber) {
        let scale = 8;
        this.pdfFile.getPage(pageNumber).then(page => {
          let viewport = page.getViewport(scale);
          let canvas = this.context.canvas;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = '100%';
          canvas.style.height = '100%';
          let renderContext = {
            canvasContext: this.context,
            viewport: viewport
          }
          page.render(renderContext).then(() => {
            // 渲染完成
            this.$emit('onRender')
          })
        })
      }
    }
  }
</script>

<style>
</style>
