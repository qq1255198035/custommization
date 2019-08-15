import { axios } from '@/utils/request'
import qs from 'qs'
export function login(parameter) {
    return axios({
        url:'/sys/login',
        method: 'post',
        data: parameter
    })
}
export function register(parameter) {
  return axios({
    url: '/sys/email',
    method: 'post',
    data: parameter
  })
}
export function registerSubmit(url,parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}
export function apiPersonOrder(parameter) {
  return axios({
    url: '/apiPersonOrder/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function getAction(url,parameter) {
    return axios({
      url: url,
      method: 'get',
      params: parameter
    })
  }
 
  export function apiPay(parameter) {
    return axios({
      url: '/apiPersonOrder/toPay',
      method: 'post',
      data: qs.stringify(parameter)
    })
  }