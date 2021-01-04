import Vue from 'vue';
import pdfPreview  from "./pdf.vue";
import helper from "@/components/preview/helper";

export default function (options) {
	let $vm = helper.createElement(options, Vue, pdfPreview);
	helper.hideScroll(1);
	document.body.appendChild($vm.$el);
}
