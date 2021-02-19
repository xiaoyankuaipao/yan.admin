import Cookies from 'js-cookie'

const state = {
  sidebar: {
    // !!常常用来做类型判断，在第一步!（变量）之后再做逻辑取反运算,两个叹号表示把目标值转化为布尔值，相当于使用Boolean()方法
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true
  }
}

const mutations = {
  TOGGER_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  ClOSE_SIDEBAR: state => {
    state.sidebar.opened = false
    Cookies.set('sidebarStatus', 0)
  }
}

const actions = {
  toggleSidebar ({ commit }) {
    commit('TOGGER_SIDEBAR')
  },
  closeSidebar ({ commit }) {
    commit('ClOSE_SIDEBAR')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
