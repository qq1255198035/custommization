import Vue from 'vue'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import {
  axios
} from '@/utils/request'
import qs from 'qs'
// 前端路由表
const constantRouterComponents = {
  // 基础页面 layout 必须引入
  BasicLayout: () => import('@/layouts/BasicLayout'),
  BlankLayout: () => import('@/layouts/BlankLayout'),
  SellerLayout: () => import('@/layouts/SellerLayout'),
  RouteView: () => import('@/layouts/RouteView'),
  dashbored: () => import("@/pages/Seller/DashBored"),
  grouporder: () => import("@/pages/Seller/GroupOrder"),
  commissions: () => import("@/pages/Seller/Commissions"),
  commissionsdetails: () => import("@/pages/Seller/CommissionsDeatils"),
  designList: () => import("@/pages/Seller/DesignList"),
  orders: () => import("@/pages/userSystem/orders/orders"),
  personSet: () => import("@/pages/person/person"),
  dealerInfo: () => import("@/pages/common/dealerInfo/dealerInfo"),
  noticeList: () => import("@/pages/common/noticeList/noticeList"),
  //工厂
  Workplace: () => import('@/views/dashboard/Workplace'),
  Analysis: () => import('@/views/dashboard/Analysis'),
  //系统
  workbench:() => import("@/views/salessystem/workbench/workbench"),
  specification: () => import("@/views/system/specification"), //设计需求
  sellerUserList: () => import("@/views/system/customer"), //经销商审批列表
  OrderManagement: () => import("@/views/system/OrderManagement"), //订单管理
  orderListDetails: () => import("@/views/system/orderDetails"), //订单详情
  sellerInfo: () => import("@/views/system/SellerInfo"),//经销商详情
  isystemRole:() => import("@/views/system/RoleList"), //角色管理
  PermissionList:() => import("@/views/system/PermissionList"), //菜单管理
  UserList:() => import("@/views/system/UserList"), //用户管理
  onlineGoods: () => import("@/views/system/onlineGoods"), // 设计师设计需求
  productTypes: () => import("@/views/system/productTypes"), //佣金审批
  GoodsManagement:() => import("@/views/system/GoodsManagement"), //商品管理
  RoleUserList:() => import("@/views/system/RoleUserList"), //角色维护
  UserAnnouncementList:() => import("@/views/system/UserAnnouncementList"), //我的消息
  DictList:() => import("@/views/system/DictList"), //商品管理，添加修改
  DictItemList:() => import("@/views/system/DictItemList"),
  colorList:() => import("@/views/system/colorList"),
  // 客服 生产管理
  TobeProducts:() => import("@/views/system/TobeProducts"),
  Producting: () => import("@/views/system/Producting")
  //SysAnnouncementList:() => import("@/views/system/SysAnnouncementList"), //系统通告
  
  //format: () => import("@/views/management/format/format"), //商品类别
}
// 前端未找到页面路由（固定不用改）
const notFoundRouter = {
  path: '*',
  redirect: '/404',
  hidden: true
}
/**
 * 获取后端路由信息的 axios API
 * @returns {Promise}
 */

export const getRouterByUser = () => {
  return axios({
    url: '/sys/permission/getUserPermissionByToken',
    method: 'get',
    data: qs.stringify({
      token: Vue.ls.get(ACCESS_TOKEN),
      internationalization: localStorage.lang
    })
  })
}

/**
 * 获取路由菜单信息
 *
 * 1. 调用 getRouterByUser() 访问后端接口获得路由结构数组
 *    @see https://github.com/sendya/ant-design-pro-vue/blob/feature/dynamic-menu/public/dynamic-menu.json
 * 2. 调用
 * @returns {Promise<any>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    // ajax
    getRouterByUser().then(res => {
      const result = res.result.menu
      const resultList = [{
        component: "SellerLayout",
        meta: {
          title: ""
        },
        name: '',
        key: '',
        redirect: "index",
        children: [
          ...result
        ]
      }]
      const routers = generator(resultList)
      routers.push(notFoundRouter)
      resolve(routers)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 格式化 后端 结构信息并递归生成层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */

export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const currentRouter = {
      // 路由地址 动态拼接生成如 /dashboard/workplace
      path: `${parent && parent.path || ''}/${item.name}`,
      // 路由名称，建议唯一
      name: item.name || item.key || '',
      hidden: item.hidden || false,
      component: constantRouterComponents[item.component || item.name],
      // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
      meta: {
        title: item.meta.title,
        icon: item.meta.icon || undefined
      }
    }
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')

    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}