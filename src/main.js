import Vue from 'vue'
import App from './App.vue'
import router from "./router";
//import i18n from './lang'
import store from './store/'
import './permission'
import { VueAxios } from './utils/request'
import "fullpage.js/vendors/scrolloverflow";
import VueFullPage from "vue-fullpage.js";
//import 'vue-social-share/dist/client.css';
import Share from 'vue-social-share';
import VueIntro from 'vue-introjs';
import 'intro.js/introjs.css';
import '@/utils/filter';
import hasPermission from '@/utils/hasPermission'
Vue.use(Share);
Vue.use(VueIntro);
Vue.use(hasPermission)
var SocialSharing = require('vue-social-sharing');
import '@babel/polyfill'
import Storage from 'vue-ls';
const options = {
  namespace: 'vuejs__', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'session', // storage name session, local, memory
};
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.use(Storage, options);
Vue.use(SocialSharing);
import 'vue-social-share/dist/client.css'

Vue.use(VueFullPage);
Vue.use(VueAxios)
import './import'
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  //i18n,
  render: h => h(App),
}).$mount('#app')
