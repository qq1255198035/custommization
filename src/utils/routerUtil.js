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

  //CountdownTime: () => import("@/pages/Website/CountdownTime"),

  dashbored: () => import("@/pages/Seller/DashBored"),
  grouporder: () => import("@/pages/Seller/GroupOrder"),
  commissions: () => import("@/pages/Seller/Commissions"),
  commissionsdetails: () => import("@/pages/Seller/CommissionsDeatils"),
  //design: () => import("@/pages/Seller/Design"),
  myorder: () => import("@/pages/Seller/MyOrders"),
  //
  //share: () => import("@/pages/userSystem/share/share"),
  //payment: () => import("@/pages/userSystem/payment/payment"),
  //paysuccess: () => import("@/pages/userSystem/paySuccess/paySuccess"),
  orders: () => import("@/pages/userSystem/orders/orders"),
  personSet: () => import("@/pages/person/person"),
  // 
  neworder: () => import("@/pages/Seller/NewOrder"),
  //orderres: () => import("@/pages/Seller/OrderResult"),
  orderdetails: () => import("@/pages/Seller/OrderDetails"),
  // ...more
}
console.log(constantRouterComponents)
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
  console.log(Vue.ls.get(ACCESS_TOKEN))
  return axios({
    url: '/sys/permission/getUserPermissionByToken',
    method: 'get',
    data: qs.stringify({
      token: Vue.ls.get(ACCESS_TOKEN),
      internationalization: localStorage.lang
    })
    /* headers: {
      'Access-Token': 'xxx'
    }
    */
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
      console.log(res)
      const result = res.result.menu
      console.log(result)
      console.log(res.result.menu)
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
      console.log(routers)
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
  console.log(parent)
  console.log(routerMap)

  console.log(routerMap)
  return routerMap.map(item => {
    console.log(item)
    console.log(constantRouterComponents)
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
    console.log(item.hidden)
    console.log(currentRouter.path)
    console.log(currentRouter.meta)
    // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
    currentRouter.path = currentRouter.path.replace('//', '/')

    // 重定向
    item.redirect && (currentRouter.redirect = item.redirect)
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    console.log(currentRouter)
    return currentRouter
  })
}