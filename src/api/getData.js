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
 * 添加章分类
 */
export const addCategory = data => axiosService.POST('/api/articlemanage/ArticleCategory', data)

/**
 * 添加章分类
 */
export const updateCategory = data => axiosService.PUT('/api/articlemanage/ArticleCategory', data)

/**
  * 删除文章分类
  */
export const deleteCategory = data => axiosService.DELETE('/api/articlemanage/ArticleCategory/' + data)

/**
  * 获取文章分类列表
  */
export const getCategoryList = () => axiosService.GET('/api/articlemanage/ArticleCategory/GetArticleCategoryList')

/**
 * 根据文章分类分页获取文章
 */
export const getArticlePageByCategory = data => axiosService.GET('/api/articlemanage/Artilce/GetArticlePageByCategory', data)

/**
 * 添加文章
 */
export const addArticle = data => axiosService.POST('/api/articlemanage/Artilce/AddArticle', data)

/**
 * 编辑文章
 */
export const editArticle = data => axiosService.PUT('/api/articlemanage/Artilce/EditArticle', data)

/**
 * 删除文章
 */
export const deleteArticle = data => axiosService.DELETE('/api/articlemanage/Artilce/DeleteArticle/' + data)

/**
 * 文章编辑上传图片
 */
export const uploadPicture = data => axiosService.POST('/api/articlemanage/Picture', data)

/**
 * 根据文章Id获取文章的详细信息
 */
export const getArticleById = data => axiosService.GET('/api/articlemanage/Artilce/GetArticleById/' + data)

export const getAllTag = () => axiosService.GET('/api/articlemanage/ArticleTag/GetAllTagList')

/**
 * 获取角色列表
 */
export const getRolelist = () => axiosService.GET('/api/systemmanageservice/role/GetRoleList')

/**
 *
 * 根据角色ID查询角色信息
 */
export const getRoleById = data => axiosService.GET('/api/systemmanageservice/role/GetRoleById/' + data)

/**
  *
  * 添加或者修改角色
  */
export const addOrUpdateRole = data => axiosService.POST('/api/systemmanageservice/role/', data)

/**
  *
  * 删除角色
  */
export const deleteRole = data => axiosService.DELETE('/api/systemmanageservice/role/' + data)

/**
 *
 * 获取用户分页列表
 */
export const getUserListByPage = data => axiosService.GET('/api/systemmanageservice/User/GetUserList', data)

/**
  *
  * 添加或者修改用户
  */
export const addOrupdateUser = data => axiosService.POST('/api/systemmanageservice/User', data)

/**
  *
  * 删除用户
  */
export const deleteUser = data => axiosService.DELETE('/api/systemmanageservice/User/' + data)

/**
  *
  * 设置用户角色
  */
export const setUserRole = data => axiosService.GET('/api/systemmanageservice/User/SetUserRole?userId=' + data.userId + '&roleId=' + data.roleId)

/*
 * 获取菜单树列表
 */
export const getMenuTree = ()=> axiosService.GET('/api/systemmanageservice/menu/GetMenuTree')

/**
 * 获取菜单ComboxTree
 */
export const getMenuComboxTree = () => axiosService.GET('/api/systemmanageservice/menu/GetMenuComboxTree')

/**
 * 添加菜单
 */
export const addMenu = data => axiosService.POST('/api/systemmanageservice/menu', data)

/**
 * 修改菜单
 */
export const updateMenu = data => axiosService.PUT('/api/systemmanageservice/menu', data)

/**
 * 删除菜单
 */
export const deleteMenu = data => axiosService.DELETE('/api/systemmanageservice/menu/' + data)

/**
 *
 * 根据角色ID获取菜单树
 */
export const getMenuTreeByRoleId = data => axiosService.GET('/api/systemmanageservice/Menu/GetMenuTreeByRoleId/' + data)

/**
 *
 * 根据角色Id保存该角色具有的菜单的Ids
 */
export const saveMenuIdsByRoleId = data => axiosService.POST('/api/systemmanageservice/rolemenu/' + data.roleId, data.menuIds)
