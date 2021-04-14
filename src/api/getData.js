import axiosService from '@/utils/axiosService'

/**
 * 登录
 */
export const login = (data) => axiosService.POST('/api/identityservice/Login/RequestToken', data)

/**
 * 获取用户信息
 */
export const getUserInfo = () => axiosService.GET('/api/systemmanageservice/User/GetUserInfo')

/**
 * 获取用户信息和菜单
 */
export const getUserInfoAndMenus = () => axiosService.GET('/api/systemmanageservice/User/GetUserInfoAndMenu')

/**
 * 获取用户菜单
 */
export const getUserMenu = () => axiosService.GET('/api/systemmanageservice/Permission/GetUserPermissionMenuTree')

/**
 * 获取用户按钮权限
 */
export const getUserBtn = () => axiosService.GET('/api/systemmanageservice/Permission/GetUserBtnPermission')

/**
 * 添加或者修改文章分类
 */
export const addOrUpdateCategory = data => axiosService.POST('/api/articlemanage/ArticleCategory',data)

/**
  * 删除文章分类
  */
export const deleteCategory = data => axiosService.DELETE('/api/articlemanage/ArticleCategory/' + data)

/**
  * 获取文章分类列表
  */
export const getCategoryList = () => axiosService.GET('/api/articlemanage/ArticleCategory/GetArticleCategoryList')
