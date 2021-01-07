'use strict';

import imgPreview  from "./imageView";
import helper from "./helper";

/**
 * @description 图片预览功能
 * @param options {object}
 * @param options.fid 文件ID，唯一id（必填）
 * @param options.name 文件名称
 * @param options.type 文件类型
 * @param options.url //图片地址
 * @param $vue Vue
 */
export default function (options, $vue) {
	let $vm = helper.createElement(options, $vue, imgPreview);
	helper.hideScroll(1);
	document.body.appendChild($vm.$el);
}
