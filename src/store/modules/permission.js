import { constantRouterMap } from '@/config/router.config'
import { generatorDynamicRouter } from '@/utils/routerUtil'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    actor: 'dashboard'
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    /**
     * 构建获取和构建路由和菜单信息
     * @param commit
     * @param data
     * @returns {Promise<any>}
     * @constructor
     */
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        generatorDynamicRouter().then(routers => {
          //console.log(routers)
          commit('SET_ROUTERS', routers)
          resolve()
        })
      })
    }
  }
}

export default permission
