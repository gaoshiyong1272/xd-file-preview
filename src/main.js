import Vue from 'vue'
import App from './App.vue'

import index from "./../index";
Vue.use(index,{});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
