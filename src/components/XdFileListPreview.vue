<template>
  <div class="xd-file-list__body">
    <div class="xd-file-list__item" v-for="(item,index) in dataList" :key="index">
      <div class="xd-file-list__item-icon">
        <img v-if="item['icon']" :src="item['icon']" alt="icon">
        <div v-else><i class="fileIconfont iconwenjian"></i></div>

      </div>
      <div class="xd-file-list__item-text">
        <div class="xd-file-list__item-text-title" :title="getName(item)">{{getFileName(item)}}</div>
        <div class="xd-file-list__item-text-link" @click="handleClick(item)" :style="`color: ${linkColor}`">点击查看</div>
      </div>
    </div>
  </div>
</template>

<script>
  import helper from "@/components/preview/helper";
  import  {iconData} from "@/components/contact";

  export default {
    name: "XdFileListPreview",
    props: {
      list: {
        type: Object | Array,
        default() {
          return []
        }
      },
      linkColor: {
        type: String,
        default: '#4285F4',
      }
    },

    data() {
      return {
        dataList: [],
        loaded: false
      }
    },
    watch: {
      list(val) {
        this.setDataValue(val)
      }
    },

    created() {
      this.setDataValue(this.list);
    },

    methods: {
      setDataValue(val) {
        if (val.length > 0){
          this.dataList = val;

          //未加载过
          if (!this.loaded) {
            let temp = [];
            this.dataList.map((item, index) => {
              helper.getFileBase64(item.url, item.name ? item.name : '')
                .then(res => {
                  res['status'] = true;
                  temp.push(res);
                })
                .catch(res=>{
                  temp.push({
                    src: iconData.loadicon,
                    status: false,
                    url: item['url'],
                    source: item['url'],
                  });
                });
            });
            this.dataList = temp;
            this.loaded = true;
          }

        }
      },

      getName(item) {
        if (!item.url) return '文件不存在';

        if (item.name) {
          return item.name;
        }
        let arr = item.url.split('/');
        return arr[arr.length - 1];
      },

      getFileName(item) {
        if (!item.url) return '文件不存在';
        if (item.name) {
          return helper.cutStringLen(item.name, 23);
        }
        let arr = item.url.split('/');
        return helper.cutStringLen(arr[arr.length - 1], 23);
      },

      handleClick(item) {
        console.log('handleClick', item);
        this.$preview(item)
      }
    }

  }
</script>

<style scoped lang="less">
  @name: xd-file-list;
  .@{name} {
    &__body {
      padding-top: 20px;
      color: #333;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }


    &__item {
      padding: 10px;
      box-sizing: border-box;
      height: 68px;
      background: #f6f7fa;
      border: 1px solid #cacad1;
      border-radius: 5px;
      width: 294px;
      margin: 0 20px 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: flex-start;
      text-align: left;
      flex-wrap: nowrap;

      &-icon {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        background: #fff;

        img {
          width: 100%;
          height: 100%;
        }

        div {
          width: 50px;
          height: 50px;
          text-align: center;
          vertical-align: middle;
        }

        i {
          margin-top: 3px;
          font-size: 40px !important;
           width: 100%;
           height: 100%;
          display: inline-block;
        }
      }

      &-text {
        flex: 1;

        &-title {

        }

        &-link {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC, PingFangSC-Regular;
          color: #4285f4;
          line-height: 20px;
          cursor: pointer;
        }

        &-link:hover {
          text-decoration: underline;
        }
      }
    }
  }

</style>
