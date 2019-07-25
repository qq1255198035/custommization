import Vue from 'vue'
import App from './App.vue'
import router from "./router";

import vcolorpicker from "vcolorpicker";
Vue.use(vcolorpicker);

import './import'
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
