import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export default new Router({
  routes: [
    {
      path: '/Login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
    // {
    //   path: '/',
    //   component: () => import('@/layout/index'),
    //   children: [
    //     {
    //       path: '/test',
    //       component: () => import('@/views/test/index'),
    //       meta: ['选项1']
    //     }
    //   ]
    // }
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      children: [{
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }]
    },
    {
      path: '/test',
      component: Layout,
      children: [{
        path: 'test',
        name: 'test',
        component: () => import('@/views/test/index'),
        meta: { title: '导航一', icon: 'test' }
      }]
    }
  ]
})
