'use strict';

import officePreview  from "./officeView";
import helper from "./helper";


/**
 * @description Office预览功能
 * @param options {object}
 * @param options.fid 文件ID，唯一id（必填）
 * @param options.name 文件名称
 * @param options.type 文件类型
 * @param options.url // Office地址
 * @param $vue Vue
 */
export default function (options, $vue) {
	helper.createElement(options, $vue, officePreview);
}
