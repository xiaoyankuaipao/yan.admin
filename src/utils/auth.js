import Cookies from 'js-cookie'

const userToken = 'userToken'

export function getToken () {
  return Cookies.get(userToken)
}

export function setToken (token) {
  return Cookies.set(userToken, token)
}

export function clearToken () {
  return Cookies.remove(userToken)
}
