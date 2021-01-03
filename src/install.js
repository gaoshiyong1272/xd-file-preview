'use strict';

// 自动以数组加载并结构保存组件，便于遍历
import {preview} from "@/components/preview";
import helper from "@/components/preview/helper";

// 定义 install 方法
const install = function (Vue, options) {
  if (install.installed) return;
  install.installed = true;

  Vue.prototype.$options = options;
  Vue.prototype.$preview = preview;
  Vue.prototype.$fileHelper = helper;
  console.log('Vue.use()=> options', options);

};

if (typeof window !== 'undefined' && window['Vue']) {
  install(window['Vue'])
}

export default {
  install
}
