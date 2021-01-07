'use strict';

import image from "./image";
import office from "./office";
import pdf from "./pdf";
import helper from "./helper";
import {iconData, imagesType , wordType, pdfType} from './../contact';
import Loading from "./loading";


/**
 * @description 文件预览功能
 * @param options {object}
 * @param options.fid 文件ID，唯一id（必填）
 * @param options.name 文件名称（选填）
 * @param options.url //文件地址（必填）
 * @param $vue
 */
export function preview(options={}, $vue) {
  console.log('ddd',$vue);

  /**
   * @description 创建loading实例
   * @type {ExtendedVue<Vue, unknown, unknown, unknown, Record<never, any>>}
   */
  const loadingVue = $vue.extend(Loading);
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

  let t = new Date().getTime();

  options['src'] = iconData.loadicon;
  options['source'] = options['url'];
  helper.getFileBase64(options.url, options.name)
    .then(res=>{
      let now = new Date().getTime();
      let deTime = 1000 - (now - t);
      console.log('deTime', deTime)
      setTimeout(()=>{
          $destroy();
          options = Object.assign({}, options, res);
          options['status'] = true;

          //图片类型
          if (JSON.stringify(imagesType).indexOf(res['type']) !== -1) {
            image(options, $vue);
          }

          //word文件类型
          if (JSON.stringify(wordType).indexOf(res['type']) !== -1) {
            office(options, $vue);
          }
          //Pdf文件类型
          if (JSON.stringify(pdfType).indexOf(res['type']) !== -1) {
            console.log('Pdf文件类型', pdf);
            pdf(options, $vue);
          }
        }, (deTime <=10? 10: deTime));
        console.log('getFileBase64',options)
    })
    .catch(res=>{
      console.error('res',options, res);
      options['status'] = false;
      $destroy();
      image(options, $vue);
    });
}
