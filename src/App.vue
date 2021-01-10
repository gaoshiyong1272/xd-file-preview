<template>
  <div id="app">
    <h1>列表展示</h1>
    <xd-file-list-preview :list="list" @remove="handleRemoveClick"></xd-file-list-preview>
    <hr>
    <h1>文件预览模式</h1>
    <a @click="handleClick" style="color: #4285f4">9958ff80d202f91b347b14b5c56f14e811</a>
  </div>
</template>

<script>
  import XdFileListPreview from "@/components/XdFileListPreview";

  export default {
    name: 'app',
    components: {XdFileListPreview},
    data() {
      return {
        list: [
          {url: 'https://testimg.tiangongy.com/100601/9958ff80d202f91b347b14b5c56f14e811'},
          {url: 'https://testimg.tiangongy.com/100601/a024b86760bb1ff3b38f25ae2e0b9bdf'},
          {url: 'https://testimg.tiangongy.com/100601/3b85b4f1c3accdb4bb9f7e42e1f9070e', name: 'aaaa'},
          {
            url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
            name: 'aaaa',
            fid: 'aadadads'
          },
        ]
      }
    },
    created() {
    },
    methods: {
      /**
       * @description 删除图片事件
       * @param item {Object} 当前被删除的文件对象
       * @param done {function} 删除文件完成回调函数
       */
      handleRemoveClick(item, done) {
        console.log('aaaaaaaa')
        setTimeout(() => {
          console.log('handleRemoveClick', item);
          done()
        }, 2000);
      },

      /**
       * @description 点击查看预览功能
       */
      handleClick() {
        this.$preview({
          //url: 'https://testimg.tiangongy.com/100601/a024b86760bb1ff3b38f25ae2e0b9bdf', //图片
          //url: 'https://testimg.tiangongy.com/100601/9958ff80d202f91b347b14b5c56f14e8', // xlsx
          //url: 'https://testimg.tiangongy.com/100601/12d7e6a9b0b9169b800fbb29061212c2', //pptx
          //url: 'https://testimg.tiangongy.com/100601/ce44c69f3075334e6c624b8180a42804', //doc,
          //url: 'https://testimg.tiangongy.com/100601/3b85b4f1c3accdb4bb9f7e42e1f9070e',
          url: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf',
          //url:'https://jfb-public-images.oss-cn-qingdao.aliyuncs.com/admin-upload/202101052326075832.mp3',
          fid: 'aadadads'
        })
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
