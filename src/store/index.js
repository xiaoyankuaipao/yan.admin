import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import sidebarModule from './modules/sidebarModule'
import userModule from './modules/userModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sidebarModule,
    userModule
  },
  getters
})

export default store
