import Vue from 'vue'
import { login } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'

import { loadLanguageAsync } from '@/lang'
import { getRouterByUser } from '@/utils/routerUtil'
const user = {
  state: {
    token: '',
    name: '',
    
    avatar: '',
    roles: [],
    info: {},
    lang: 'zh-TW'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name }) => {
      state.name = name
     
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
   
    SET_LANG: (state, lang) => {
      state.lang = lang
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      Vue.ls.set(ACCESS_TOKEN,'')
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(res => {
            // const result = response.result
            if (res.code == 200) {
              Vue.ls.set(ACCESS_TOKEN, res.result.token, 7 * 24 * 60 * 60 * 1000)
              commit('SET_TOKEN', res.result.token)
              console.log(res)
              commit('SET_AVATAR', res.avatar)
              commit('SET_NAME', { name: res.result.username })
              commit('SET_INFO', res.user)
            }
            resolve(res)
          })
          .catch(error => {
            reject(error)
            console.log(error)
          })
      })
    },
    // 获取用户信息
    // eslint-disable-next-line
    GetInfo({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        getRouterByUser().then(res => {
          const result = res.result.menu
          commit('SET_ROLES', result)
          resolve(res.result.menu)
        }).catch(err => {
          reject(err)
        })
      
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise(resolve => {
        console.log(resolve)
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        console.log(state)
        Vue.ls.remove(ACCESS_TOKEN)
      })
    },
    SetLang({ commit }, lang) {
      console.log(lang)
      return new Promise(resolve => {
        
        commit('SET_LANG', lang)
        loadLanguageAsync(lang)
        resolve()
      })
    }
  }
}

export default user
