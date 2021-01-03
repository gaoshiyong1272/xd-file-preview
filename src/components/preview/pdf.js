import Vue from 'vue';
import pdfPreview  from "./pdf.vue";
import helper from "@/components/preview/helper";

export default function (options) {
	let str = `${options.name}${options.fid}`;
	let elId = `pdf-${helper.md5Fn(str)}`;
	let ele = document.getElementById(elId);

	if(ele) {
		helper.hideScroll(1);
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
		helper.hideScroll(-1)
    window.pdfUrl = '';
	};
	document.body.appendChild(previewComponent.$el);
	helper.hideScroll(1);
}
