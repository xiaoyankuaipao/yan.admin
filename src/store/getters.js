const getters = {
  sidebar: state => state.sidebarModule.sidebar,
  token: state => state.userModule.token,
  name: state => state.userModule.name,
  roles: state => state.userModule.roles
}
export default getters
