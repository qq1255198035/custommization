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
        data:qs.stringify({pageSize: 4, pageNo:num, status:status, content:orderid})
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
        data:qs.stringify({pageNo:num})
    })
}