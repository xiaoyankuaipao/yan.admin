<template>
  <div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="false"
        active-text-color="#409EFF"
        :collapse-transition="false"
        mode="vertical"
        style="border: 0px"
        router
      >
        <submenu :data="menus" />
      </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Submenu from './subMenu.vue'
export default {
  name: 'leftMenu',
  components: {
    Submenu
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'menus'
    ]),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>

<style>

</style>