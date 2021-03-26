import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import sidebarModule from './modules/sidebarModule'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sidebarModule,
    user
  },
  getters
})

export default store
