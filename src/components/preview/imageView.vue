<template>
  <div class="img-preview" :id="options.ele" v-if="info && options && options.ele">
    <div class="img-preview-title" ref="imgPreviewHeader">
      <div class="img-preview-l" v-if="options.status">
        <img :src="options.icon" width="30" height="30">
        <span v-html="options.name"></span>
        <span>.{{options['type'].toLocaleLowerCase()}}</span>
        <button class="btn" @click="download">下载</button>
      </div>
      <div class="img-preview-close" @click="closeHandle(options.ele)"><i class="iconfont iconwrong"></i></div>
    </div>
    <div class="img-preview-content">
      <div v-show="options.status" class="img-preview-content-box" @click="closeHandle(options.ele)"
           :style="`top:${top}px;left: ${left}px`">
        <img
                @mousedown="interHandle"
                @mousemove="moveHandle"
                @mouseup="leaveHandle"
                @mouseleave="leaveHandle"
                @mouseout="leaveHandle"
                @click.stop="()=> {return false}"
                ref="imgPreview"
                :style="`cursor: ${pointerHandle()}; height: ${height}px; width:${width}px;transform:scale(${scale}) translate(${translatex}px,${translatey}px) rotate(${angle}deg)`"
                @load="loadhandle()"
                @error="errorHandle"
                :src="options.url" alt="preview"
        />
      </div>
      <div class="img-preview-scale-percentage" v-if="showScale"><span>{{scalePercentage}}%</span></div>
      <div class="img-preview-error" v-if="!options.status" @click="closeHandle(options.ele)">
        <div class="img-preview-error-content">
          <div class="img-preview-error-ico"><i class="iconfont iconwenjian"></i></div>
          <div class="img-preview-error-tips">哎哟！我们无法加载该文件。</div>
          <div class="img-preview-error-url" v-html="options.url"></div>
        </div>
      </div>
    </div>
    <div class="img-preview-toolbar" v-if="options.status && isShowToolbar">
      <span>
        <i class="iconfont iconfangda" @click="zoomHandle(1)"></i>
        <i class="iconfont iconsuoxiao" @click="zoomHandle(-1)"></i>
        <i class="iconfont iconzuozhuan" @click="rotateHandle(-1)"></i>
        <i class="iconfont iconyouzhuan" @click="rotateHandle(1)"></i>
        <i class="iconfont iconhuanyuan" @click="zoomOriginalSize()"></i>
      </span>
    </div>
    <div class="img-preview-bottom"></div>
  </div>
</template>
<script>
  import lodash from "lodash";
  import {iconData} from './../contact'
  import download from 'downloadjs';

  window.timeer = null;
  window.zoomTimeer = null;

  window.boxyEleStop = () => {
    return false;
  };
  export default {
    name: "img-preview",
    props: {
      options: Object,
    },

    watch: {
      options(val) {
        this.info = val
      }
    },
    data() {
      return {
        /**image**/
        showScale: false,
        bodyEle: null,
        eleStop: null,
        isShowToolbar: false,
        scalePercentage: 100,
        scaleZoomTime: 500,
        isError: false,
        show: false,
        top: -9999,
        left: -9999,
        width: 0,
        height: 0,
        angle: 0,
        scale: 1,
        moveStatus: false,
        translatex: 0,
        translatey: 0,
        offsetX: 0,
        offsetY: 0,
        scaleLen: 0.2,
        scaleMax: 4, /**最大放大4倍**/
        scaleMin: 0.2, /**最小缩小0.2倍**/
        originalWidth: 0,
        originalHeight: 0,
        windowWidth: 0,
        windowHeight: 0,
        loadingEle: '',
        loadingUrl: iconData.loadicon,
        /**image**/

        info: null,
      }
    },

    mounted() {
      this.windowWidth = document.body.clientWidth;
      this.windowHeight = window.innerHeight - 60;
      let that = this;

      this.$nextTick(() => {
        window.onresize = lodash.debounce(() => {
          that.windowWidth = window.innerWidth;
          //console.log(that.$refs.imgPreviewHeader, that.$refs.imgPreviewHeader.clientHeight);
          that.windowHeight = window.innerHeight - that.$refs.imgPreviewHeader.clientHeight;
          that.loadhandle();
        }, 400);
      });

      /**屏蔽图片拖拽功能**/
      window.bodyEle = document.getElementsByTagName('body')[0];
      window.bodyEle.ondragstart = () => {
        return false;
      }
      window.bodyEle.onselect = () => {
        return false;
      }

      //window.bodyEle.addEventListener('dragstart', window.boxyEleStop,false);
      //window.bodyEle.addEventListener('select', window.boxyEleStop, false);
    },
    methods: {

      download() {
        console.log(this.info)
        download(this.info['response'], this.info['name'])
      },

      loadhandle() {
        let img = this.$refs.imgPreview;

        this.originalWidth = img.naturalWidth;
        this.originalHeight = img.naturalHeight;


        /**
         * imgw <= ww and imgh <= wh
         */
        if (this.originalWidth <= this.windowWidth && this.originalHeight <= this.windowHeight) {
          this.width = this.originalWidth;
          this.height = this.originalHeight;
        }
        // else if(this.originalWidth > this.windowWidth && this.originalHeight < this.windowHeight){
        // 	this.width = this.windowWidth;
        // 	this.height = this.width * this.originalHeight/ this.originalWidth;
        // }else if(this.originalHeight > this.windowHeight && this.originalWidth < this.windowWidth){
        // 	this.height = this.windowHeight;
        // 	this.width = this.height * this.originalWidth / this.originalHeight;
        // }

        /**
         * imgh > wh and imgw > ww
         * 实际高度/窗口高度的倍数  与 实际宽度/窗口宽度的倍数 比较 谁的倍数越大 就使用谁为基准参数
         */
        else {

          let wb = this.originalWidth / this.windowWidth;
          let Hb = this.originalHeight / this.windowHeight;
          console.log('aaa', wb, Hb);

          if (wb > Hb) {
            this.width = this.windowWidth;
            this.height = this.width * this.originalHeight / this.originalWidth;
          } else {
            this.height = this.windowHeight;
            this.width = this.height * this.originalWidth / this.originalHeight;
          }
        }

        console.log(this.width, this.height, this.originalWidth, this.originalHeight);

        this.top = 0;
        this.left = 0;
        this.show = true;
        this.isShowToolbar = true;
      },
      zoomHandle(type) {
        let scale = this.scale + this.scaleLen * type;
        if (scale < this.scaleMin) scale = this.scaleMin;
        if (scale > this.scaleMax) scale = this.scaleMax;
        this.scale = scale;
        this.showScale = true;
        this.scalePercentage = parseInt(this.scale * 100);

        if (window.zoomTimeer) {
          clearTimeout(window.zoomTimeer);
        }
        window.zoomTimeer = setTimeout(() => {
          this.showScale = false;
        }, this.scaleZoomTime);
      },
      zoomOriginalSize() {

        /**原始尺寸不处理**/
        // if (this.scale === 1) {
        //   return
        // }

        this.scale = 1;
        this.angle = 0;
        this.translatex = 0;
        this.translatey = 0;

        this.showScale = true;
        this.scalePercentage = parseInt(this.scale * 100);

        if (window.zoomTimeer) {
          clearTimeout(window.zoomTimeer);
        }
        window.zoomTimeer = setTimeout(() => {
          this.showScale = false;
        }, this.scaleZoomTime);

      },
      rotateHandle(type) {
        this.angle = this.angle + 90 * type;
        if (this.angle % 180 === 0) {
          this.loadhandle(1)
        } else {
          this.loadhandle(-1)
        }
      },
      pointerHandle() {
        let img = this.$refs.imgPreview;

        /**旋转状态不支持拖拽**/
        if (this.angle !== 0) {
          return 'default';
        }

        if (!img) return 'default';
        if (this.width * this.scale > this.windowWidth
          || this.height * this.scale > this.windowHeight) {
          return 'pointer';
        } else {
          return "default"
        }
      },
      moveHandle($vet) {
        if (this.pointerHandle() === 'default' || !this.moveStatus) return;
        this.translatex = $vet.offsetX - this.offsetX;
        this.translatey = $vet.offsetY - this.offsetY;

      },
      interHandle($vet) {
        if (this.pointerHandle() === 'default') return;
        this.offsetX = $vet.offsetX - this.translatex;
        this.offsetY = $vet.offsetY - this.translatey;
        this.moveStatus = true;
      },
      leaveHandle($vet) {
        if (this.pointerHandle() === 'default') return;
        this.moveStatus = false;
      },
      errorHandle($vet) {
        console.log('errorHandle=>', $vet);
        this.isError = true;
        this.show = true
      },
      closeHandle(id) {
        //window.bodyEle.removeEventListener('dragstart', window.boxyEleStop);
        //window.bodyEle.removeEventListener('select', window.boxyEleStop);
        this.close(id);
      },
    },


  };
</script>
<style type="text/css">
  @import "style.css";

  .img-preview {
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
    z-index: 2098;
  }

  .img-preview-title {
    width: 100%;
    height: 48px;
    background: #333;
    color: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  .img-preview-l img {
    margin-right: 15px;
  }

  .img-preview-l {
    float: left;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left:10px;
  }

  .img-preview-l .btn {
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

  .img-preview-l .btn:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
    opacity: 0.9;
    background: #539dfc;
    cursor: pointer;
  }


  .img-preview-l .icontupian {
    font-size: 30px;
    margin-right: 10px;
  }

  .img-preview-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    background: #333;
  }

  .img-preview-close {
    cursor: pointer;
    float: right;
    font-size: 30px;
    width: 30px;
    height: 30px;
    margin: 9px 7px 0 0;
    line-height: 30px;
  }

  i.iconfont {
    font-size: 30px;
    font-weight: normal;
  }

  i.iconfont.iconzuozhuan, i.iconfont.iconyouzhuan, i.iconfont.iconhuanyuan {
    font-size: 28px;
    font-weight: normal !important;
  }

  .img-preview-toolbar {
    position: absolute;
    font-size: 0;
    left: 50%;
    bottom: 30px;
    text-align: center;
    transform: translateX(-50%);
    z-index: 10000
  }

  .img-preview-toolbar span {
    display: flex;
    line-height: 24px;
    border-radius: 8px;
    padding: 8px 10px;
    font-size: 0;
    background: rgba(0, 0, 0, 0.5);
  }

  .img-preview-toolbar span * {
    margin: 0 6px;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    font-weight: 400;
  }

  .img-preview-scale-percentage {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .img-preview-scale-percentage span {
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    color: #fff;
    text-align: center;
    margin-right: 5px;
  }

  .img-preview-content {
    height: -moz-calc(100% - 60px);
    height: -webkit-calc(100% - 60px);
    height: calc(100% - 60px);
    overflow: hidden;
    position: relative;

  }

  .img-preview-content-box {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
    height: 100%;
    width: 100%;
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .img-preview-content-box img {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .img-preview-mask {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
  }

  .img-preview-mask span {
    width: 80px;
    height: 80px;
    padding: 10px;
    margin-right: 5px;
    border-radius: 10px;
    background: #171717;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  }

  .img-preview-mask img {
    width: 100%;
    height: 100%;
  }

  .img-preview-error {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-wrap: nowrap;
    height: 100%;
    width: 100%;
  }

  .img-preview-error-content {
    width: 540px;
    background: #000;
    border-radius: 10px;
    padding: 30px;
    color: #fff;
    text-align: center;

  }

  i.iconfont.iconwenjian {
    font-size: 60px;
    font-weight: normal;
  }

  .img-preview-error-tips {
    font-size: 18px;
    line-height: 30px;
    padding: 10px 0 30px
  }

  .img-preview-error-url {
    font-size: 13px;
    line-height: 24px;
    word-wrap: break-word;
  }

  .ant-tooltip.ant-tooltip-placement-top {
    z-index: 1000;
  }

</style>
