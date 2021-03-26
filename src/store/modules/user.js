import { getToken, setToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/getData'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    roles: []
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
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  login ({commit}, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(resposne => {
        console.log(resposne)
        commit('SET_TOKEN', resposne.token)
        setToken(resposne.token)
        resolve()
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  getUserInfo ({commit, state}) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(resposne => {
        commit('SET_Name', resposne.name)
        commit('SET_ROLES', resposne.roles)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
