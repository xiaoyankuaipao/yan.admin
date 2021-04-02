import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import 'nprogress/nprogress.css'

import { getToken } from '@/utils/auth'

NProgress.configure({
  showSpinner: true,
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  minimum: 0.3
})

const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // 具有token，登录时直接跳转到 主页
      next({path: '/'})
      NProgress.done()
    } else {
      const hasMenus = store.getters.menus && store.getters.menus.length > 0
      if (hasMenus) {
        next()
      } else {
        // 获取用户信息
        try {
          await store.dispatch('user/getUserInfoAndMenus')
        } catch (error) {
          // 发生错误时 清空token 跳转到 登录界面
          await store.dispatch('user/resetToken')
          Message.error(error.toString() || '发生错误')
          next({path: '/login'})
          NProgress.done()
        }
      }
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({path: '/login'})
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
