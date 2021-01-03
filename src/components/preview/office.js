import Vue from 'vue';
import officePreview  from "./office.vue";

const MD5 = require('md5.js');
const md5Fn = (str, hex = 'hex') => {
	return new MD5()['update'](str)['digest'](hex);
};

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
  let elId = `office-${md5Fn(str)}`;
	let ele = document.getElementById(elId);

	if(ele) {
		hideScroll(1);
		ele.style.display="block";
		return;
	}
	const Preview = Vue.extend(officePreview);
	let previewComponent = new Preview({
		el: document.createElement('div')
	});
	options['ele'] = elId;
  console.log('options', options)
	previewComponent.options = options;
	previewComponent.close = (id)=> {
		let ele = document.getElementById(id);
		ele.style.display = "none";
		hideScroll(-1)
	};
	document.body.appendChild(previewComponent.$el);
	hideScroll(1);
}
