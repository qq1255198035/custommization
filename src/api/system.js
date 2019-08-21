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
export function Logout(url,parameter) {
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
  export function payPal(parameter) {
    return axios({
      url: '/api1/paypal/toPayTest',
      method: 'post',
      data: qs.stringify(parameter)
    })
  }
  export function paymentInfo(parameter) {
    return axios({
      url: '/apiPersonOrder/toConfirmPayList',
      method: 'post',
      data: qs.stringify(parameter)
    })
  }
  export function orders(parameter) {
    return axios({
      url: '/apiPersonOrder/getPersonalOrders',
      method: 'post',
      data: qs.stringify(parameter)
    })
  }
  export function status(parameter) {
    return axios({
      url: '/apiPersonOrder/getSchedule',
      method: 'post',
      data: qs.stringify(parameter)
    })
  }
  export function payBack(parameter) {
    return axios({
      url: '/api1/paypal/payBack',
      method: 'post',
      data: qs.stringify(parameter)
    })
  }
  export function personSet(parameter) {
    return axios({
      url: '/sys/user/register',
      method: 'post',
      data: qs.stringify(parameter)
    })
  }
  /*export function payMoney(parameter) {
    return axios({
      url: '/apiPersonOrder/toConfirmPay',
      method: 'post',
      data: qs.stringify(parameter)
    })
  }*/
