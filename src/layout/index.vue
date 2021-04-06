<template>
    <el-container class="home-container">
        <el-container>
            <el-aside :width="sidebar.opened ? '210px':'50px'">
              <el-scrollbar>
                <sidebar/>
              </el-scrollbar>
            </el-aside>
            <el-main >
              <navbar />
              <app-main />
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import Sidebar from '@/components/LeftMenu/index'
import AppMain from './components/AppMain'
import Navbar from './components/Navbar'
export default {
  name: 'Layout',
  components: {
    Sidebar,
    AppMain,
    Navbar
  },
  data () {
    return {
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.sidebar.sidebar
    }
  }
}
</script>

<style lang="less" scoped>
.home-container{
  height: 100%;
  overflow: hidden;
}
.el-aside{
  background-color: #304156;
  transition: width 0.28s;
  overflow-x: hidden;
  .el-menu{
   border-right: none;
  }
}
.el-main{
  background-color: #EAEDF1;
  // overflow: hidden;
  padding: 0;
}
</style>
<style>
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
