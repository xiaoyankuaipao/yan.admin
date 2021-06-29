import { getToken, setToken, clearToken } from '@/utils/auth'
import { login, getUserInfoAndMenus } from '@/api/getData'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    menus: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_Name: (state, name) => {
    state.name = name
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  login ({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(resposne => {
        if (resposne.state === 1) {
          commit('SET_TOKEN', 'Bearer ' + resposne.token.access_token)
          setToken('Bearer ' + resposne.token.access_token)
          resolve()
        } else {
          throw('用户名或者密码错误')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  getUserInfoAndMenus ({commit, state}) {
    return new Promise((resolve, reject) => {
      getUserInfoAndMenus().then(resposne => {
        console.log(resposne)
        if (resposne.state === 1) {
          commit('SET_Name', resposne.data.userInfo.realName)
          commit('SET_MENUS', resposne.data.menuTreeDtos)
          resolve()
        } else {
          throw('获取用户信息错误')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout ({commit, state}) {
    clearToken()
    commit('RESET_STATE')
  },
  resetToken ({commit}) {
    return new Promise(resolve => {
      clearToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
