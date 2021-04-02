const getters = {
  sidebar: state => state.sidebar.sidebar,
  token: state => state.user.token,
  userName: state => state.user.name,
  menus: state => state.user.menus
}
export default getters
