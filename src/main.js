import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import "fullpage.js/vendors/scrolloverflow";
import VueFullPage from "vue-fullpage.js";

import vcolorpicker from "vcolorpicker";
Vue.use(vcolorpicker);
Vue.use(VueFullPage);
import './import'
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
