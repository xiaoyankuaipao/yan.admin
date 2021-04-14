import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/layout'

Vue.use(Router)

// 解决问题：Navigation cancelled from "/" to "/" with a new navigation.
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    {
      path: '/',
      component: Layout,
      redirect: '/manage',
      children: [{
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }]
    },
    {
      path: '/xx',
      component: Layout,
      // redirect: '/categoryList',
      name: '文章管理',
      children: [{
        path: '/categoryList',
        name: 'Table',
        component: () => import('@/views/articlemanage/categorymanage/index'),
        meta: ['文章管理', '分类管理']
      }]
    }
  ]
})
