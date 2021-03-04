import { service } from '@/utils/axiosService'

/**
 * 登录
 */
export const login = (data) => service.POST('/api/identityservice/Login/RequestToken', data)

/**
 * 获取用户信息
 */
export const getUserInfo = () => service.GET('/api/systemmanageservice/User/GetUserInfo')

/**
 * 获取用户菜单
 */
export const getUserMenu = () => service.GET('/api/systemmanageservice/Permission/GetUserPermissionMenuTree')

/**
 * 获取用户按钮权限
 */
export const getUserBtn = () => service.GET('/api/systemmanageservice/Permission/GetUserBtnPermission')
