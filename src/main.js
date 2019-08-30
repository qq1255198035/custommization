import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import i18n from './lang'
import store from './store/'
import './permission'
import { VueAxios } from './utils/request'
import "fullpage.js/vendors/scrolloverflow";
import VueFullPage from "vue-fullpage.js";
import 'vue-social-share/dist/client.css';
import Share from 'vue-social-share';
import VueIntro from 'vue-introjs';
import 'intro.js/introjs.css';
Vue.use(Share);
Vue.use(VueIntro);
var SocialSharing = require('vue-social-sharing');

import Storage from 'vue-ls';
const options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'session', // storage name session, local, memory
};

Vue.use(Storage, options);
Vue.use(SocialSharing);
import 'vue-social-share/dist/client.css'
import vcolorpicker from "vcolorpicker";
Vue.use(vcolorpicker);
Vue.use(VueFullPage);
Vue.use(VueAxios)
import './import'
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
