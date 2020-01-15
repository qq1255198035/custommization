import {
  axios
} from '@/utils/request'
import qs from 'qs'
export function login(parameter) {
  return axios({
    url: '/sys/login',
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
export function passwordEmail(parameter) {
  return axios({
    url: '/sys/emailForReset',
    method: 'post',
    data: parameter
  })
}
export function passwordSet(parameter) {
  return axios({
    url: '/sys/user/changPassword',
    method: 'put',
    data: parameter
  })
}
export function registerSubmit(url, parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}
export function Logout(url, parameter) {
  return axios({
    url: url,
    method: 'post',
    data: parameter
  })
}
//消息
export function apiNotice(parameter) {
  return axios({
    url: '/iso/jeecgNotice/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
//支付入口接口

//
export function apiPersonOrder(parameter) {
  return axios({
    url: 'apiPersonOrder/list',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
//
export function apiShareList(parameter) {
  return axios({
    url: 'apiPersonOrder/toPayInfo',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
//
export function getAction(url, parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}
//
export function upLoad(formData) {
  return axios({
    url: '/sys/oss/upload',
    method: 'post',
    headers: {
        "Content-Type": "multipart/form-data"
    },
    data: formData
  })
}
//
export function apiPay(parameter) {
  return axios({
    url: '/apiPersonOrder/toPayInfo',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
//微信支付
export function wxPay(parameter) {
  return axios({
    url: '/api/wx/payBack',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function wxOrderQuery(parameter) {
  return axios({
    url: '/api/wx/wxOrderQuery',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
//payPal
export function payPal(parameter) {
  return axios({
    url: '/api1/paypal/toPayTest',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
//支付入口
export function toPaypal(parameter) {
  return axios({
    url: '/api1/paypal/toPay',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
//支付存
export function payPalOrder(parameter) {
  return axios({
    url: '/apiPersonOrder/toPay',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
//保存订单成功
export function sumbitOrder(parameter) {
  return axios({
    url: '/system/jeecgOrder/userOrderInfo',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function paymentInfos(parameter) {
  return axios({
    url: '/apiPersonOrder/toConfirmPayList',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function paymentSessionInfos(parameter) {
  return axios({
    url: '/apiPersonOrder/getPayInfoBySession',
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
//
export function payBack(parameter) {
  return axios({
    url: '/api1/paypal/payBack',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
//
export function wxPayBack(parameter) {
  return axios({
    url: '/api/wx/wxOrderQueryPayList',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
//
export function agencyInfo() {
  return axios({
    url: '/system/jeecgUser/getDealerInfo',
    method: 'post',
    //data: qs.stringify(parameter)
  })
}
export function agencyEdit(parameter) {
  return axios({
    url: '/iso/jeecgDealerUser/edit',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    data: JSON.stringify(parameter)
  })
}
//
export function personSet() {
  return axios({
    url: '/system/jeecgUser/getInfo',
    method: 'post',
    //data: qs.stringify(parameter)
  })
}
export function personEdit(parameter) {
  return axios({
    url: '/system/jeecgUser/edit',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    data: JSON.stringify(parameter)
  })
}
export function country() {
  return axios({
    url: '/iso/jeecgArea/country',
    method: 'post',
    //data: qs.stringify(parameter)
  })
}
export function province(parameter) {
  return axios({
    url: 'iso/jeecgArea/province',
    method: 'post',
    data: qs.stringify(parameter)
  })
}
export function city(parameter) {
  return axios({
    url: '/iso/jeecgArea/city',
    method: 'post',
    /*headers: {
      'X-Access-Token': data
    },*/
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

export function checkCaptcha(phone,smscode) {
  return axios({
    url: '/sys/user/emailVerification',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    data: JSON.stringify({phone:phone,smscode:smscode})
  })
}

export function colorList(pageNo,name) {
  return axios({
    url: '/sys/dictItem/colorList',
    method: 'post',
    data: qs.stringify({pageNo: pageNo,pageSize: 10,name: name})
  })
}

export function colorDelete(id) {
  return axios({
    url: '/sys/dictItem/logicallyDelete',
    method: 'post',
    data: qs.stringify({id:id})
  })
}

export function addColorList(itemValue,description,itemText,id) {
  return axios({
    url: '/sys/dictItem/addColor',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    data: JSON.stringify({itemValue:itemValue,description:description,itemText:itemText,id:id})
  })
}

export function editColorShow(id) {
  return axios({
    url: '/sys/dictItem/queryById',
    method: 'post',
    data: qs.stringify({id:id})
  })
}

export function getProductingList(code,pageNo){
  return axios({
    url: '/iso/jeecgFactoryOrder/queryToBeProducedPageList',
    method: 'post',
    data: qs.stringify({code:code,pageNo:pageNo,pageSize: 12})
  })
}

export function getProductList(code,pageNo){
  return axios({
    url: '/iso/jeecgFactoryOrder/queryInProductionPageList',
    method: 'post',
    data: qs.stringify({code:code,pageNo:pageNo,pageSize: 12})
  })
}

export function getFactoryList(orderId){
  return axios({
    url: '/system/jeecgUser/factoryList',
    method: 'post',
    data: qs.stringify({orderId})
  })
}

export function chooseFactory(orderId,orderSn,factoryOrderId,opinion,reference,factoryId){
  return axios({
    url: '/iso/jeecgFactoryOrder/chooseFactory',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    data: JSON.stringify({orderId,orderSn,factoryOrderId,opinion,reference,factoryId})
  })
}

export function logisticsList(){
  return axios({
    url: '/system/jeecgAdministrator/logistics',
    method: 'post'
  })
}
// TODO保存物流信息
export function saveLogistics(params){
  return axios({
    url: '/iso/jeecgFactoryOrder/saveLogistics',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    data: JSON.stringify({params})
  })
}

export function userInfo(){
  return axios({
    url: '/system/jeecgUser/factoryInfo',
    method: 'post'
  })
}

export function factoryDashboard(year,month){
  return axios({
    url: '/iso/jeecgFactoryOrder/factoryDashboard',
    method: 'post',
    data: qs.stringify({year,month})
  })
}

export function checkOutInfo(factoryOrderId){
  return axios({
    url: '/iso/jeecgFactoryOrderProcess/examineApproveInfo',
    method: 'post',
    data: qs.stringify({factoryOrderId})
  })
}

export function historyList(factoryOrderId){
  return axios({
    url: '/iso/jeecgFactoryOrderProcess/historyList',
    method: 'post',
    data: qs.stringify({factoryOrderId})
  })
}

export function adminOrderAffirm(factoryOrderId,approverStatus,opinion,orderSn){
  return axios({
    url: '/iso/jeecgFactoryOrderProcess/adminOrderAffirm',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    data: JSON.stringify({factoryOrderId,approverStatus,opinion,orderSn})
  })
}

export function factoryOrderList(code,pageNo){
  return axios({
    url: '/iso/jeecgFactoryOrder/list',
    method: 'post',
    data: qs.stringify({code,pageNo,pageSize: 12})
  })
}

export function callbackShow(factoryOrderId){
  return axios({
    url: '/iso/jeecgFactoryOrderProcess/queryFactoryForm',
    method: 'post',
    data: qs.stringify({factoryOrderId})
  })
}

export function sumbitOpinion(factoryOrderId,reference,opinion,orderSn){
  return axios({
    url: '/iso/jeecgFactoryOrderProcess/sumbitOpinion',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    data: JSON.stringify({factoryOrderId,reference,opinion,orderSn})
  })
}

export function orderAffirm(factoryOrderId,approverStatus,opinion,orderSn){
  return axios({
    url: '/iso/jeecgFactoryOrderProcess/orderAffirm',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset-UTF-8'
    },
    data: JSON.stringify({factoryOrderId,approverStatus,opinion,orderSn})
  })
}

export function logisticsInfo(factoryOrderId){
  return axios({
    url: '/iso/jeecgFactoryOrder/queryLogisticsInfo',
    method: 'post',
    data: qs.stringify({factoryOrderId})
  })
}