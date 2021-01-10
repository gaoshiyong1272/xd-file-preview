'use strict';

import pdfPreview  from "./pdfView";
import helper from "./helper";

/**
 * @description PDF预览功能
 * @param options {object}
 * @param options.fid 文件ID，唯一id（必填）
 * @param options.name 文件名称
 * @param options.type 文件类型
 * @param options.url // PDF地址
 * @param $vue Vue
 */
export default function (options, $vue) {
  helper.createElement(options, $vue, pdfPreview);
}
