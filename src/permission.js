import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import notification from 'ant-design-vue/es/notification'
import {queryByIdA} from './api/seller'
import {
  setDocumentTitle,
  domTitle
} from '@/utils/domUtil'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
NProgress.configure({
  showSpinner: false
})

const whiteList = ['login', 'register', 'home', 'passwordSet', 'products', 'about','design'] // no redirect whitelist
console.log(router)
router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
    if (Vue.ls.get(ACCESS_TOKEN)) {
      /* has token */
      if (to.path === '/login') {
        next()
        NProgress.done()
      }else if(to.path === '/neworder'){
        next()
        console.log(999)
        // 未通過審批，禁止進入
        queryByIdA().then(res => {
          console.log(res)
          if(res.code == 0){
            if(res.result == 1){
              next()
            }else if(res.result == 0){
              notification.error({
                message: 'Error',
                description: 'Sorry,Not examined and approved'
              })
              next({
                path: from.path,
              })
            }else if(res.result == 2){
              notification.error({
                message: 'Error',
                description: 'Sorry,Failure to pass the examination and approval'
              });
              next({
                path: from.path,
              })
            }else if(res.result == 3){
              notification.error({
                message: 'Error',
                description: 'Sorry, please apply first.'
              });
              next({
                path: from.path,
              })
            }
          }
        })
      } else {
        if (store.getters.roles.length === 0) {
          console.log(store.getters.roles.length)
          store
            .dispatch('GetInfo')
            .then(res => {
              console.log(res)
              // 动态菜单与用户信息解耦
              store.dispatch('GenerateRoutes').then(() => {
                // 根据roles权限生成可访问的路由表
                // 动态添加可访问路由表
                console.log(router)
                router.addRoutes(store.getters.addRouters)
  
                console.log(store.getters.addRouters)
                const redirect = decodeURIComponent(from.query.redirect || to.path)
                console.log(redirect)
                if (to.path === redirect) {
                  // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                  next({
                    ...to,
                    replace: true
                  })
                } else {
                  // 跳转到目的路由
                  next({
                    path: redirect
                  })
                }
              })
            })
            .catch(() => {
              notification.error({
                message: 'Error',
                description: 'Failed to request user information, please try again'
              })
              store.dispatch('Logout').then(() => {
                next({
                  path: '/login',
                  query: {
                    redirect: to.fullPath
                  }
                })
              })
            })
        } else {
          next()
        }
      }
    } else {
  
      console.log(whiteList.includes(to.name))
      if (whiteList.includes(to.name)) {
        // 在免登录白名单，直接进入
        console.log(whiteList)
        next()
      } else {
        console.log(22)
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
        NProgress.done()
      }
    }  
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 *  @see https://github.com/sendya/ant-design-pro-vue/pull/53
 */
const action = Vue.directive('action', {
  bind: function (el, binding, vnode) {
    const actionName = binding.arg
    const roles = store.getters.roles
    const elVal = vnode.context.$route.meta.permission
    const permissionId = elVal instanceof String && [elVal] || elVal
    roles.permissions.forEach(p => {
      if (!permissionId.includes(p.permissionId)) {
        return
      }
      if (p.actionList && !p.actionList.includes(actionName)) {
        el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
      }
    })
  }
})

export {
  action
}