import  axiosService  from '@/utils/axiosService'

/**
 * 登录
 */
export const login = (data) => axiosService.POST('/api/identityservice/Login/RequestToken', data)

/**
 * 获取用户信息
 */
export const getUserInfo = () => axiosService.GET('/api/systemmanageservice/User/GetUserInfo')

/**
 * 获取用户菜单
 */
export const getUserMenu = () => axiosService.GET('/api/systemmanageservice/Permission/GetUserPermissionMenuTree')

/**
 * 获取用户按钮权限
 */
export const getUserBtn = () => axiosService.GET('/api/systemmanageservice/Permission/GetUserBtnPermission')
