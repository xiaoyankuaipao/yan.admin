<template>
    <div class="navbar">
        <shink :is-active="sidebar.opened" class="shink-container" @toggleClick="toggleSideBar" />
        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
          <user />
        </div>
        <!-- 修改密码对话框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="tiny"></el-dialog>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Shink from '@/components/Shrink/index'
import Breadcrumb from '@/components/Breadcrumb'
import User from '@/components/User'
export default {
  data () {
    return {
      userName: 'yanchuanpeng',
      img: {
        user: require('../../assets/user.jpg')
      },
      dialogTitle: '修改密码',
      dialogVisible: false
    }
  },
  components: {
    Shink,
    Breadcrumb,
    User
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('sidebarModule/toggleSidebar')
    }
  }
}
</script>

<style scoped>
.navbar {
  height: 45px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
.shink-container {
  line-height: 45px;
  height: 100%;
  float: left;
  cursor: pointer;
}
.shink-container:hover{
  background-color: #d9d9d9;
  transition: background-color .28s;
}

.breadcrumb-container{
  line-height: 45px;
  height: 100%;
  float: left;
  cursor: pointer;
  /* transition: background .3s; */
}

.right-menu {
  float: right;
  height: 100%;
  line-height: 45px;
  padding-right: 20px;
}

</style>
