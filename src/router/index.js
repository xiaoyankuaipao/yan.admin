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
        name: '导航一',
        component: () => import('@/views/test/index'),
        meta: { title: '导航一', icon: 'test' }
      }]
    }
  ]
})
