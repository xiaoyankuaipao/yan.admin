<template>
  <div>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        :unique-opened="true"
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

<style  lang="less">
.el-menu-item {
  background-color: #1f2d3d !important;
  &:hover{
    background-color: #001528 !important;
  }
}
.el-scrollbar {
  height: 100%;
}

.el-scrollbar__bar.is-vertical {
  right: 0px;
}
.el-scrollbar__wrap {
  overflow-x: hidden;
}

</style>