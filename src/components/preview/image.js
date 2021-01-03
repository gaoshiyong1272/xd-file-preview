import Vue from 'vue';
import imgPreview  from "./image.vue";
import helper from "@/components/preview/helper";

/**
 * @description 图片预览功能
 * @param options {object}
 * @param options.fid 文件ID，唯一id（必填）
 * @param options.name 文件名称
 * @param options.type 文件类型
 * @param options.url //图片地址
 */
export default function (options) {
	let str = `${options.name}${options['fid']}`;
	let elId = `img-${helper.md5Fn(str)}`;
	let ele = document.getElementById(elId);

	if(ele) {
		ele.style.display="block";
		helper.hideScroll(1);
		return;
	}
	const Preview = Vue.extend(imgPreview);
	let previewComponent = new Preview({
		el: document.createElement('div')
	});
	options['ele'] = elId;
	previewComponent.options = options;
	previewComponent.close = (id)=> {
		let ele = document.getElementById(id);
		ele.style.display = "none";
		helper.hideScroll(-1);
	};
	document.body.appendChild(previewComponent.$el);
	helper.hideScroll(1);
}
