import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import { VueAxios } from './utils/request'
import "fullpage.js/vendors/scrolloverflow";
import VueFullPage from "vue-fullpage.js";
import 'vue-social-share/dist/client.css'
import Share from 'vue-social-share'
Vue.use(Share)
var SocialSharing = require('vue-social-sharing');
import Storage from 'vue-ls';
 
const options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'session', // storage name session, local, memory
};
Vue.use(Storage, options);
Vue.use(SocialSharing);
import vcolorpicker from "vcolorpicker";
Vue.use(vcolorpicker);
Vue.use(VueFullPage);
Vue.use(VueAxios)
import './import'
Vue.config.productionTip = false;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
