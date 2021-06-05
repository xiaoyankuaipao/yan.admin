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
        name: 'categoryList',
        component: () => import('@/views/articlemanage/categorymanage/index'),
        meta: ['文章管理', '分类管理']
      }, {
        path: '/articleList',
        name: 'articleList',
        component: () => import('@/views/articlemanage/articlemanage/index'),
        meta: ['文章管理', '文章管理']
      }, {
        path: '/userList',
        name: 'userList',
        component: () => import('@/views/systemmanage/user/index'),
        meta: ['系统管理', '用户管理']
      }, {
        path: '/menuList',
        name: 'menuList',
        component: () => import('@/views/articlemanage/articlemanage/index'),
        meta: ['系统管理', '菜单列表']
      }, {
        path: '/roleList',
        name: 'roleList',
        component: () => import('@/views/systemmanage/role/index'),
        meta: ['系统管理', '角色列表']
      }]
    }
  ]
})
