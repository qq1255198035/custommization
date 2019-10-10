import {
    axios
} from '@/utils/request'
import qs from 'qs'

export function salesDate() {
    return axios({
        url: '/system/jeecgOrder/salesDate',
        method: 'post'
    })
}
// 保存留言
export function texts(parameter) {
    return axios({
        url: '/system/jeecgOrder/opinion',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 修改此方案
export function programme(parameter) {
    return axios({
        url: '/system/jeecgOrder/chooseOne',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 申请新方案
export function newScheme(parameter) {
    return axios({
        url: '/system/jeecgOrder/applyNew',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//开始团体订单
export function startGroup(parameter) {
    return axios({
        url: '/system/jeecgOrder/startTeamOrder',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 查询折扣
export function discount(parameter) {
    return axios({
        url: '/iso/jeecgDealerUser/dealerDiscount',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//编辑订单详情折扣
export function discountEdit(parameter) {
    return axios({
        url: '/system/jeecgGoodsPic/queryMainById',
        method: 'post',
        data: qs.stringify(parameter)
    })
}

export function discountEdit1(parameter) {
    return axios({
        url: '/system/jeecgGoodsPic/queryMainByIdForGoodsId',
        method: 'post',
        data: qs.stringify(parameter)
    })
}

//确定订单折扣
export function discountSure(parameter) {
    return axios({
        url: '/system/jeecgGoodsPic/updatePrice',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//开始统一订单
export function orderFroms(parameter) {
    return axios({
        url: '/system/jeecgOrder/payOrderDate',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 微信支付
export function teamPayBack(parameter) {
    return axios({
        url: '/api/wx/teamPayBack',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
// 微信查询
export function wxCheckPay(parameter) {
    return axios({
        url: '/api/wx/wxTeamOrderQuery',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//微信回调
export function wxBackPay(parameter) {
    return axios({
        url: '/api/wx/wxTeamOrderQuery',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//payPal
export function paypalSeller(parameter) {
    return axios({
        url: '/api1/paypal/toTeamPayTest',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//paypal回调
export function paypalSellerBack(parameter) {
    return axios({
        url: '/api1/paypal/payTeamBack',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//团体订单删除
export function sellerOrderDetel(parameter) {
    return axios({
        url: '/system/jeecgOrder/orderDel',
        method: 'post',
        data: qs.stringify(parameter)
    })
}
//团体订单取消接口
export function sellerOrderCale(parameter) {
    return axios({
        url: '/system/jeecgOrder/orderCancel',
        method: 'post',
        data: qs.stringify(parameter)
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

export function categoryList(id, num) {
    return axios({
        url: '/system/jeecgGoods/listForCategory',
        method: 'post',
        data: qs.stringify({
            pageSize: 8,
            categoryId: id,
            pageNo: num
        })
    })
}

export function groupOrderList(num, status, orderid) {
    return axios({
        url: '/system/jeecgOrder/teamOrderList',
        method: 'post',
        data: qs.stringify({
            pageSize: 5,
            pageNo: num,
            status: status,
            content: orderid
        })
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
        data: qs.stringify({
            pageNo: num,
            pageSize: 10
        })
    })
}

export function withdrawalList(num) {
    return axios({
        url: '/iso/jeecgWithdrawRecord/withdrawalList',
        method: 'post',
        data: qs.stringify({
            pageNo: num,
            pageSize: 7
        })
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
        data: JSON.stringify(params)
    })
}

export function queryById(id) {
    return axios({
        url: '/system/jeecgAddress/queryById',
        method: 'post',
        data: qs.stringify({
            id: id,
        })
    })
}

export function deleteAddress(id) {
    return axios({
        url: '/system/jeecgAddress/delete',
        method: 'post',
        data: qs.stringify({
            id: id,
        })
    })
}

export function teamOrderDetails(id) {
    return axios({
        url: '/system/jeecgOrder/teamOrderDetails',
        method: 'post',
        data: qs.stringify({
            orderId: id,
        })
    })
}

export function orderDetailUp(id) {
    return axios({
        url: '/system/jeecgOrder/orderDetailUp',
        method: 'post',
        data: qs.stringify({
            orderId: id,
        })
    })
}

export function orderStatus(id) {
    return axios({
        url: '/system/jeecgOrder/orderStatus',
        method: 'post',
        data: qs.stringify({
            orderId: id,
        })
    })
}

export function orderDetailDown(id) {
    return axios({
        url: '/system/jeecgOrder/orderDetailDown',
        method: 'post',
        data: qs.stringify({
            orderId: id,
        })
    })
}

export function delProducts(id) {
    return axios({
        url: '/system/jeecgGoodsPic/delete',
        method: 'post',
        data: qs.stringify({
            id: id,
        })
    })
}

export function selectById(id) {
    return axios({
        url: '/system/jeecgGoods/selectById',
        method: 'post',
        data: qs.stringify({
            goodId: id,
        })
    })
}

export function exampleConfirm(id) {
    return axios({
        url: '/system/jeecgOrder/affirm',
        method: 'post',
        data: qs.stringify({
            orderId: id,
        })
    })
}

export function saveDesign(params) {
    return axios({
        url: '/system/jeecgOrder/addDesign',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset-UTF-8'
        },
        data: JSON.stringify(params)
    })
}

export function queryBalance() {
    return axios({
        url: '/ios/jeecgCommissionRecord/queryBalanceByToken',
        method: 'post',
    })
}

export function nextStptes(account, name, amount, type) {
    return axios({
        url: '/ios/jeecgCommissionRecord/oneNext',
        method: 'post',
        data: qs.stringify({
            account: account,
            name: name,
            amount: amount,
            type: type
        })
    })
}

export function twoNext(params) {
    return axios({
        url: '/ios/jeecgCommissionRecord/twoNext',
        method: 'post',
        data: qs.stringify(params)
    })
}

export function referencePic(pidStr) {
    return axios({
        url: '/system/jeecgGoodsPic/referencePic',
        method: 'post',
        data: qs.stringify({
            pidStr: pidStr
        })
    })
}

export function deleteEXimg(id) {
    return axios({
        url: '/iso/jeecgGoodsPicDes/delete',
        method: 'post',
        data: qs.stringify({
            id: id
        })
    })
}

export function sourceUpload(formData) {
    return axios({
        url: '/sys/oss/sourceUpload',
        method: 'post',
        headers: {
            "Content-Type": "multipart/form-data"
        },
        data: formData
    })
}

export function addEximg(pid, picUrl, remarks, fileUrl) {
    return axios({
        url: '/iso/jeecgGoodsPicDes/add',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset-UTF-8'
        },
        data: JSON.stringify({
            pid: pid,
            picUrl: picUrl,
            remarks: remarks,
            fileUrl: fileUrl
        })
    })
}

export function addRemarks(id, remarks) {
    return axios({
        url: '/system/jeecgGoodsPic/addRemarks',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset-UTF-8'
        },
        data: JSON.stringify({
            pid: id,
            remarks: remarks
        })
    })
}

export function colorList(status) {
    return axios({
        url: '/system/jeecgGoodsPic/color',
        method: 'post',
        data:qs.stringify({status:status})
    })
}

export function changeFontFamily(params) {
    return axios({
        url: '/system/jeecgGoods/changeFont',
        method: 'post',
        data:qs.stringify(params)
    })
}

export function changeGoodsColor(id,color) {
    return axios({
        url: '/system/jeecgGoods/changeGoodsColor',
        method: 'post',
        data:qs.stringify({goodsId: id,itemValue: color})
    })
}

export function artFontList() {
    return axios({
        url: '/system/jeecgGoodsPic/artFont',
        method: 'post'
    })
}

export function changeFont(params) {
    return axios({
        url: '/system/jeecgGoods/changeFont',
        method: 'post',
        data:qs.stringify(params)
    })
}

export function designList() {
    return axios({
        url: '/system/jeecgCart/carList',
        method: 'post'
    })
}

export function updateShow(id) {
    return axios({
        url: '/system/jeecgCart/updateShow',
        method: 'post',
        data:qs.stringify({id: id})
    })
}

export function delDesignList(id) {
    return axios({
        url: '/system/jeecgCart/delete',
        method: 'post',
        data:qs.stringify({id: id})
    })
}

export function handleDesignList(id) {
    return axios({
        url: '/system/jeecgCart/commitOrder',
        method: 'post',
        data:qs.stringify({id: id})
    })
}

export function getPic(content) {
    return axios({
        url: '/system/jeecgGoodsPic/getPic',
        method: 'post',
        data:qs.stringify({content: content})
    })
}

export function comDetails(id) {
    return axios({
        url: '/ios/jeecgCommissionRecord/selectById',
        method: 'post',
        data:qs.stringify({id: id})
    })
}

export function rmWhite(pic) {
    return axios({
        url: '/system/jeecgGoods/rmWhite',
        method: 'post',
        data:qs.stringify({pic: pic})
    })
}

export function queryByIdA() {
    return axios({
        url: '/iso/jeecgDealerUser/queryById',
        method: 'post',
    })
}

// 系统接口
export function checkOutOrders(pageNo,content,status) {
    return axios({
        url: '/system/jeecgAdministrator/administratorOrderList',
        method: 'post',
        data:qs.stringify({pageNo:pageNo, content:content, pageSize: 12,status: status})
    })
}

export function startDesign(orderId) {
    return axios({
        url: '/system/jeecgAdministrator/employeeStartDesign',
        method: 'post',
        data:qs.stringify({orderId:orderId})
    })
}

export function sendSample(orderId) {
    return axios({
        url: '/system/jeecgAdministrator/employeeSendSample',
        method: 'post',
        data:qs.stringify({orderId:orderId})
    })
}

export function logistics() {
    return axios({
        url: '/system/jeecgAdministrator/logistics',
        method: 'post',
    })
}

export function confirmLogistics(orderId,shippingNo,transportMode,senderName,senderPhone,senderAddress,senderProvince,senderCity,senderDistrict) {
    return axios({
        url: '/system/jeecgAdministrator/confirmLogistics',
        method: 'post',
        data:qs.stringify({
            orderId:orderId,shippingNo:shippingNo,transportMode:transportMode,
            senderName:senderName,senderPhone:senderPhone,senderAddress:senderAddress,senderProvince:senderProvince,
            senderCity:senderCity,senderDistrict:senderDistrict
        })
    })
}

export function dealerList(name,status,pageNo) {
    return axios({
        url: '/system/jeecgAdministrator/getDealerList',
        method: 'post',
        data:qs.stringify({pageSize: 12,pageNo:pageNo,name:name,status:status,})
    })
}

export function dealerDetails(dealerId) {
    return axios({
        url: '/system/jeecgAdministrator/getDealerDetails',
        method: 'post',
        data:qs.stringify({dealerId:dealerId})
    })
}

export function approvalDealer(ids,status,remark,level) {
    return axios({
        url: '/system/jeecgAdministrator/approvalDealer',
        method: 'post',
        data:qs.stringify({ids:ids,status:status,remark:remark,level:level})
    })
}

export function dealerGrade() {
    return axios({
        url: '/system/jeecgAdministrator/selectDealerGrade',
        method: 'post',
    })
}

export function dealerDesignList(orderId) {
    return axios({
        url: '/system/jeecgAdministrator/getDealerDesignList',
        method: 'post',
        data:qs.stringify({orderId:orderId})
    })
}

export function confirmSample(picId) {
    return axios({
        url: '/system/jeecgAdministrator/confirmationSample',
        method: 'post',
        data:qs.stringify({picId:picId})
    })
}

export function viewDesign(picId) {
    return axios({
        url: '/system/jeecgAdministrator/getDealerDesignDemand',
        method: 'post',
        data:qs.stringify({picId:picId})
    })
}

export function photoInfo(url) {
    return axios({
        url: '/system/jeecgAdministrator/getPhotoInfo',
        method: 'post',
        data:qs.stringify({url:url})
    })
}

export function colorInfo(color) {
    return axios({
        url: '/system/jeecgAdministrator/getColorInfo',
        method: 'post',
        data:qs.stringify({color:color})
    })
}

export function designingScheme(despicId) {
    return axios({
        url: '/system/jeecgAdministrator/getDesigningScheme',
        method: 'post',
        data:qs.stringify({despicId:despicId})
    })
}

export function updateDespic(params) {
    return axios({
        url: '/system/jeecgAdministrator/updateJeecgGoodsDespic',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset-UTF-8'
        },
        data: JSON.stringify(params)
    })
}

export function rejectDesign(despicId) {
    return axios({
        url: '/system/jeecgAdministrator/getDesignerDesign',
        method: 'post',
        data:qs.stringify({despicId:despicId})
    })
}

export function getTrackingData(orderId) {
    return axios({
        url: '/system/jeecgOrder/logisticsInformation',
        method: 'post',
        data:qs.stringify({orderId:orderId})
    })
}

export function withdrawList(pageNo) {
    return axios({
        url: '/system/jeecgAdministrator/getWithdrawList',
        method: 'post',
        data:qs.stringify({pageNo:pageNo,pageSize: 10})
    })
}