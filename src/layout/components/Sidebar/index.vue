<template>
  <div>
          <el-menu
            :default-active="activeMenu"
            :collapse="isCollapse"
            background-color="#304156"
            text-color=#bfcbd9
            :unique-opened="false"
            active-text-color="#409EFF"
            :collapse-transition="false"
            mode="vertical"
            style="border:0px"
            router
          >
            <el-menu-item index="/dashboard">
                <i class="el-icon-setting"></i>
                <span slot="title">dashboard</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">导航一</span>
                </template>
                    <el-menu-item index="/test">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                    <el-menu-item index="1-3">选项3</el-menu-item>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Sidebar',
  components: {
  },
  computed: {
    ...mapGetters([
      'sidebar'
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
