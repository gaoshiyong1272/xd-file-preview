import Vue from 'vue'
import App from './App.vue'

import index from "./../index";
Vue.use(index,{
  pdf: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.288/build/pdf.min.js',
  worker:'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.288/build/pdf.worker.min.js',
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
