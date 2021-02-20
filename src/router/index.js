import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
      path: '/',
      component: () => import('@/layout/index')
    }
  ]
})
