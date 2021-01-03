import Vue from 'vue';
import pdfPreview  from "./pdf.vue";

const MD5 = require('md5.js');
const md5Fn = (str, hex = 'hex') => {
	return new MD5()['update'](str)['digest'](hex);
};

/***
 * 支持base64 和 同域名下访问，跨域的情况需要后台配合支持跨域处理
 * @param type
 */
const hideScroll = (type)=> {
	let body = document.getElementsByTagName('body')[0];
	if(type === 1) {
		body.style.overflowY = 'hidden';
		body.style.height = '100%';
	}else{
		body.style.overflowY = 'auto';
		body.style.height = 'auto';
	}
};

export default function (options) {
	let str = `${options.name}${options.fid}`;
	let elId = `pdf-${md5Fn(str)}`;
	let ele = document.getElementById(elId);

	if(ele) {
		hideScroll(1);
		ele.style.display="block";
		return;
	}
	const Preview = Vue.extend(pdfPreview);
	let previewComponent = new Preview({
		el: document.createElement('div')
	});
	options['ele'] = elId;
	previewComponent.options = options;
	previewComponent.close = (id)=> {
		let ele = document.getElementById(id);
		ele.style.display = "none";
		hideScroll(-1)
    window.pdfUrl = '';
	};
	document.body.appendChild(previewComponent.$el);
	hideScroll(1);
}
