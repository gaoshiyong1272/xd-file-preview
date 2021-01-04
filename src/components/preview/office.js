import Vue from 'vue';
import officePreview  from "./office.vue";
import helper from "./helper";

export default function (options) {
	let $vm = helper.createElement(options, Vue, officePreview);
	helper.hideScroll(1);
	document.body.appendChild($vm.$el);
}
