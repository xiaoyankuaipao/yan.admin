import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import sidebarModule from './modules/sidebarModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sidebarModule
  },
  getters
})

export default store
