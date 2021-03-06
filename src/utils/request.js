
import Vue from 'vue'
import axios from 'axios'
//import store from '@/store'
import { VueAxios } from './axios'
import {Modal, notification} from 'ant-design-vue'
import router from '../router';
import { ACCESS_TOKEN } from "@/store/mutation-types"

// 创建 axios 实例
const service = axios.create({
  baseURL: '/jeecg-boot', // api base_url
})

const err = (error) => {
  if (error.response) {
    let data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)
    Vue.$vLoading.hide();
    switch (error.response.status) {
      case 403:
        notification.error({ message: 'System error', description: 'access denied',duration: 4})
        break
      case 500:
        if(token && data.message=="Token失效，请重新登录"){
          Modal.error({
            title: 'Logon has expired',
            content: 'Sorry, the login has expired. Please login again.',
            okText: 'Re login',
            mask: false,
            onOk: () => {
              router.push({
                path: '/login'
              })
              /*store.dispatch('Logout').then(() => {
                Vue.ls.remove(ACCESS_TOKEN)
                window.location.reload()
              })*/
            }
          })
        }else{
          notification.error({ message: 'System error', description: 'Network error,please login again!'})
        }
        break
      case 404:
          notification.error({ message: 'System error', description:'Sorry, resources are not found!',duration: 4})
        break
      case 504:
        notification.error({ message: 'System error', description: 'Network Timeout'})
        break
      case 401:
        notification.error({ message: 'System error', description:'Unauthorized, please login again',duration: 4})
        /*if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }*/
        break
      default:
        notification.error({
          message: 'System error',
          description: data.message,
          duration: 4
        })
        break
    }
  }
  return Promise.reject(error)
};

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN);
  // 如果是微信支付页面，隐藏loading状态
  if(config.url == '/api/wx/wxOrderQuery'){
    Vue.$vLoading.hide();
  }else{
    Vue.$vLoading.show();
  }
  if (token){
    config.headers[ 'X-Access-Token' ] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  if(config.method=='get'){
    config.params = {
      _t: Date.parse(new Date())/1000,
      ...config.params
    }
  }
  return config
},(error) => {
  Vue.$vLoading.hide();
  return Promise.reject(error);
})

// response interceptor
service.interceptors.response.use((response) => {
    Vue.$vLoading.hide();
    return response.data
},err)

const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}