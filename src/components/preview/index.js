'use strict';

import image from "@/components/preview/image";
import office from "@/components/preview/office";
import pdf from "@/components/preview/pdf";
import helper from "@/components/preview/helper";
import {iconData, imagesType , wordType, pdfType} from '@/components/contact';

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
