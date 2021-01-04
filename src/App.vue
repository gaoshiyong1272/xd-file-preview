<template>
  <div id="app"></div>
</template>

<script>
  export default {
    name: 'app',
    components: {

    },
    created() {
      this.$preview({
        url: 'https://testimg.tiangongy.com/100601/a024b86760bb1ff3b38f25ae2e0b9bdf', //图片
        //url: 'https://testimg.tiangongy.com/100601/9958ff80d202f91b347b14b5c56f14e8', // xlsx
        //url: 'https://testimg.tiangongy.com/100601/12d7e6a9b0b9169b800fbb29061212c2', //pptx
        //url: 'https://testimg.tiangongy.com/100601/ce44c69f3075334e6c624b8180a42804', //doc,
        //url: 'https://testimg.tiangongy.com/100601/3b85b4f1c3accdb4bb9f7e42e1f9070e',
        fid: 'aadadads'
      })
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
