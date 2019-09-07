import { axios } from '@/utils/request'
import qs from 'qs'

export function salesDate() {
    return axios({
        url: '/system/jeecgOrder/salesDate',
        method: 'post'
    })
}

export function userInfo() {
    return axios({
        url: '/system/jeecgUser/userInfo',
        method: 'post'
    })
}

export function orderingList() {
    return axios({
        url: '/system/jeecgOrder/working',
        method: 'post'
    })
}

export function listAll() {
    return axios({
        url: '/system/jeecgCategory/listAll',
        method: 'post'
    })
}

export function categoryList(id,num) {
    return axios({
        url: '/system/jeecgGoods/listForCategory',
        method: 'post',
        data:qs.stringify({pageSize: 8,categoryId: id, pageNo:num})
    })
}

export function groupOrderList(num,status,orderid) {
    return axios({
        url: '/system/jeecgOrder/teamOrderList',
        method: 'post',
        data:qs.stringify({pageSize: 2, pageNo:num, status:status, content:orderid})
    })
}

export function commissionsData() {
    return axios({
        url: 'ios/jeecgCommissionRecord/queryByToken',
        method: 'post',
    })
}

export function commissionList(num) {
    return axios({
        url: '/ios/jeecgCommissionRecord/commissionList',
        method: 'post',
        data:qs.stringify({pageNo:num,pageSize: 12})
    })
}

export function withdrawalList(num) {
    return axios({
        url: '/iso/jeecgWithdrawRecord/withdrawalList',
        method: 'post',
        data:qs.stringify({pageNo: num, pageSize: 7})
    })
}

export function adressList() {
    return axios({
        url: '/system/jeecgAddress/list',
        method: 'post'
    })
}

export function addressOne() {
    return axios({
        url: '/iso/jeecgArea/addressOne',
        method: 'post'
    })
}

export function addAddress(params) {
    return axios({
        url: '/system/jeecgAddress/add',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset-UTF-8'
        },
        data:JSON.stringify(params)
    })
}

export function queryById(id) {
    return axios({
        url: '/system/jeecgAddress/queryById',
        method: 'post',
        data:qs.stringify({id: id,})
    })
}

export function deleteAddress(id) {
    return axios({
        url: '/system/jeecgAddress/delete',
        method: 'post',
        data:qs.stringify({id: id,})
    })
}

export function teamOrderDetails(id) {
    return axios({
        url: '/system/jeecgOrder/teamOrderDetails',
        method: 'post',
        data:qs.stringify({orderId: id,})
    })
}

export function orderDetailUp(id) {
    return axios({
        url: '/system/jeecgOrder/orderDetailUp',
        method: 'post',
        data:qs.stringify({orderId: id,})
    })
}

export function orderStatus(id) {
    return axios({
        url: '/system/jeecgOrder/orderStatus',
        method: 'post',
        data:qs.stringify({orderId: id,})
    })
}

export function orderDetailDown(id) {
    return axios({
        url: '/system/jeecgOrder/orderDetailDown',
        method: 'post',
        data:qs.stringify({orderId: id,})
    })
}

export function delProducts(id) {
    return axios({
        url: '/system/jeecgGoodsPic/delete',
        method: 'post',
        data:qs.stringify({id: id,})
    })
}

export function selectById(id) {
    return axios({
        url: '/system/jeecgGoods/selectById',
        method: 'post',
        data:qs.stringify({goodId: id,})
    })
}

export function exampleConfirm(id) {
    return axios({
        url: '/system/jeecgOrder/affirm',
        method: 'post',
        data:qs.stringify({orderId: id,})
    })
}