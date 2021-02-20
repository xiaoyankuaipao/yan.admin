<template>
    <div class="container">
        <el-dropdown menu-align="start">
            <div class="userinfo-container">
                <img :src="img.user">
                 <span>&nbsp;{{userName}}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <!-- 修改密码对话框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" size="tiny"></el-dialog>
    </div>
</template>

<script>
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
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.userinfo-container {
  line-height: 45px;
  height: 100%;
  cursor: pointer;
  display: flex;
  margin-right: 20px;
}

.userinfo-container img {
  width: 36px;
  height: 36px;
  margin-top: 5px;
  border-radius:25px;
}
.userinfo-container span {
  line-height: 45px;
  color: red;
}
</style>
