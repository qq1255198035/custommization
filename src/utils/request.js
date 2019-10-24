
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
    console.log("------异常响应------",token)
    console.log("------异常响应------",error.response.status)
    switch (error.response.status) {
      case 403:
        notification.error({ message: 'System error', description: 'access denied',duration: 4})
        break
      case 500:
        
        //notification.error({ message: 'System hint', description:'Token失效，请重新登录!',duration: 4})
        if(token && data.message=="Token失效，请重新登录"){
          // update-begin- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
          // store.dispatch('Logout').then(() => {
          //     window.location.reload()
          // })
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
          // update-end- --- author:scott ------ date:20190225 ---- for:Token失效采用弹框模式，不直接跳转----
        }
        break
      case 404:
          notification.error({ message: 'System error', description:'Sorry, resources are not found!',duration: 4})
        break
      case 504:
        notification.error({ message: 'System error', description: 'Network Timeout'})
        break
      case 401:
        notification.error({ message: 'System error', description:'Unauthorized, please log in again',duration: 4})
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
  const token = Vue.ls.get(ACCESS_TOKEN);//Vue.ls.get('token')
  if (token) {
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
  
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
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