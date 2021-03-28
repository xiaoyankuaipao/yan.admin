/*  axios 封装 */
import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'

const service = axios.create({
  baseURL: '',
  timeout: 5000
})

service.interceptors.request.use(
  configure => {
    configure.headers = {
      'Content-type': 'application/json'
    }
    if (store.getters.token) {
      configure.headers.Authorization = getToken
    }
    return configure
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error)
    if (error.response) {
      if (error.response.status === 504) {
        Message({
          message: '网关超时',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      } else if (error.response.status === 401) {
        MessageBox.confirm('尝试未经授权的操作，请先登录', 'Confirm logout', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          message: '请求失败',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
    } else {
      return Promise.reject(error)
    }
  }
)

/* GET 方法 */
service.GET = async (url, params) => {
  let result = await service({
    url: url,
    method: 'GET',
    params: params
  })
  return result.data
}

/* POST 方法 */
service.POST = async (url, data) => {
  let result = await service({
    url: url,
    method: 'POST',
    data
  })
  return result.data
}

/** PUT 方法 */
service.PUT = async (url, data) => {
  let result = await service({
    url: url,
    method: 'PUT',
    data
  })
  return result.data
}

/**  DELETE 方法 */
service.DELETE = async (url, data) => {
  let result = await service({
    url: url,
    method: 'DELETE',
    data
  })
  return result.data
}

export default service;
