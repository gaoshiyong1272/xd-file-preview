import Vue from 'vue';
import officePreview  from "./office.vue";
import helper from "@/components/preview/helper";

export default function (options) {
  let str = `${options.name}${options.fid}`;
  let elId = `office-${helper.md5Fn(str)}`;
	let ele = document.getElementById(elId);

	if(ele) {
		helper.hideScroll(1);
		ele.style.display="block";
		return;
	}
	const officePreviewObj = Vue.extend(officePreview);
	let officeComponent = new officePreviewObj({
		el: document.createElement('div')
	});
	options['ele'] = elId;
  console.log('options', options)
	officeComponent.options = options;
	officeComponent.close = (id)=> {
		let ele = document.getElementById(id);
		ele.style.display = "none";
		helper.hideScroll(-1)
	};
	document.body.appendChild(officeComponent.$el);
	helper.hideScroll(1);
}
