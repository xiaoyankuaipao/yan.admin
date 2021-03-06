// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import plugin from './components/index' // 全局组件

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import '@/permission'

Vue.config.productionTip = false

Vue.use(plugin) // 注册全局组件
Vue.use(ElementUI, { locale })
Vue.use(mavonEditor)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
