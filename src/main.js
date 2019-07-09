import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import { Fabric } from "vue-fabric";
import vcolorpicker from "vcolorpicker";
Vue.use(vcolorpicker);
Vue.use(Fabric);
import './import'
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
