<template>
  <div class="xd-loading" v-if="show">
    <div class="xd-loading-box">
      <img :src="iconData.loadicon" />
    </div>
  </div>
</template>

<script>
  import {iconData} from './../contact'
  export default {
    name: "loading",
    props: ['show'],
    data(){
      return {
        iconData
      }
    },
    created() {
      console.log('loading',this.show);
    },

    watch:{
      show(){
        console.log('loading', this.show);
      }
    }
  }
</script>

<style>
  .xd-loading {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
  }
  .xd-loading-box {
    height: 120px;
    width: 120px;
    border-radius: 15px;
    overflow: hidden;
  }

  .xd-loading-box img {
    height: 100%;
    width: 100%;
  }
</style>
