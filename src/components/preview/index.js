'use strict';
import Vue from 'vue';

import image from "@/components/preview/image";
import office from "@/components/preview/office";
import pdf from "@/components/preview/pdf";
import helper from "@/components/preview/helper";
import {iconData, imagesType , wordType, pdfType} from '@/components/contact';
import Loading from "@/components/preview/loading";

/**
 * @description 创建loading实例
 * @type {ExtendedVue<Vue, unknown, unknown, unknown, Record<never, any>>}
 */
const loadingVue = Vue.extend(Loading);
let $loading = new loadingVue({
  el: document.createElement('div'),
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
});
document.body.appendChild($loading.$el);

/**
 * @description 销毁loading实例
 */
const $destroy = () => {
  $loading.$destroy();
  $loading.$el.parentNode.removeChild($loading.$el);
};


/**
 * @description 文件预览功能
 * @param options {object}
 * @param options.fid 文件ID，唯一id（必填）
 * @param options.name 文件名称（选填）
 * @param options.url //文件地址（必填）
 */
export function preview(options={}) {
  options['src'] = iconData.loadicon;
  options['source'] = options['url'];
  helper.getFileBase64(options.url, options.name)
    .then(res=>{
      $destroy();
      options = Object.assign({}, options, res);
      options['status'] = true;

      //图片类型
      if (JSON.stringify(imagesType).indexOf(res['type']) !== -1) {
        image(options);
      }

      //word文件类型
      if (JSON.stringify(wordType).indexOf(res['type']) !== -1) {
        office(options);
      }
      //Pdf文件类型
      if (JSON.stringify(pdfType).indexOf(res['type']) !== -1) {
        pdf(options);
      }

      console.log('getFileBase64',options)
    })
    .catch(res=>{
      console.log('res',options);
      options['status'] = false;
      image(options);
    });
}
