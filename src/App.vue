<template>
  <div id="app">

  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {

    },
    created() {
      this.$fileHelper.getFileBase64('http://testimg.tiangongy.com/Fmg7IUqj7tAU0YXiAo55KTL_lwaO');
      this.$fileHelper.getFileBase64('https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2471826223,1654648024&fm=26&gp=0.jpg');
      this.$fileHelper.getFileBase64('//img0.bdstatic.com/static/searchdetail/img/logo-2X_0c4ef02.png');
      this.$fileHelper.getFileBase64('http://dev.e56buy.com/static/images/logo.jpg')
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
