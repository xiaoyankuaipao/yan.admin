<template>
    <div>
        <el-card style="margion:10px;">
            <div slot="header" class="clearfix" v-text="title"></div>
            <el-row>
                <el-button-group>
                    <el-button type="primary" icon="el-icon-plus" @click="onCreate">添加</el-button>
                    <el-button type="primary" icon="el-icon-edit" @click="onEdit">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="onDelete">删除</el-button>
                    <el-button type="default" icon="el-icon-edit-outline" @click="onAssignRole">为用户分配角色</el-button>
                </el-button-group>
            </el-row>
            <y-table ref="userTable" :search-api="searchApi">
                <template slot="columns">
                    <el-table-column type="index" min-width="10%"></el-table-column>
                    <el-table-column prop="userName" label="用户名" min-width="20%"></el-table-column>
                    <el-table-column prop="realName" label="姓名" min-width="20%"></el-table-column>
                    <el-table-column prop="email" label="邮箱" min-width="50%"></el-table-column>
                </template>
            </y-table>
        </el-card>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <component :is="dialogType" v-if="dialogVisible" :formData="formData" @submit-complete="onCloseDialog"></component>
        </el-dialog>
    </div>
</template>

<script>
import addOrUpdate from './addOrUpdate'
import assignRole from './assignRole'
import {getUserListByPage, deleteUser} from '@/api/getData'
export default {
  data () {
    return {
      title: '用户管理',
      searchApi: getUserListByPage,
      dialogTitle: '添加用户',
      dialogVisible: false,
      dialogType: 'addOrUpdate',
      formData: {},
      loading: false
    }
  },
  components: {
    addOrUpdate,
    assignRole
  },
  methods: {
    onCreate () {
      this.dialogTitle = '添加用户'
      this.dialogType = 'addOrUpdate'
      this.dialogVisible = true
      this.formData = {
        id: '',
        userName: '',
        realName: '',
        password: '',
        email: ''
      }
    },
    onEdit () {
      var row = this.$refs.userTable.getSelectRow()
      if (row) {
        this.formData = {...row}
        this.dialogTitle = '修改用户'
        this.dialogTye = 'addOrUpdate'
        this.dialogVisible = true
      } else {
        this.$message({
          message: '请选择要修改的数据',
          type: 'warning'
        })
      }
    },
    onDelete () {
      var row = this.$refs.userTable.getSelectRow()
      if (row) {
        this.$confirm('确定要删除用户 ' + row.userName + ' ?', '提示').then(() => {
          this.deleteInfo(row.id)
        })
      } else {
        this.$message({
          message: '请选择要删除的数据',
          type: 'warning'
        })
      }
    },
    async deleteInfo (uId) {
      let res = await deleteUser(uId)
      console.log(res)
      if (res && res.state === 1) {
        this.$refs.userTable.search()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } else {
        this.$message({
          type: 'error',
          message: '删除失败!'
        })
      }
    },
    onAssignRole () {
      let row = this.$refs.userTable.getSelectRow()
      if (row) {
        this.dialogTitle = '为用户【' + row.userName + '】分配角色'
        this.dialogType = 'assignRole'
        this.formData = {
          id: row.id,
          roleId: row.roleId
        }
        this.dialogVisible = true
      } else {
        this.$message({
          message: '请选择要分配角色的用户',
          type: 'warning'
        })
      }
    },
    onCloseDialog (res) {
      this.loading = false
      this.dialogVisible = false
      if (res) {
        this.$refs.userTable.search()
      }
    }
  }
}
</script>

<style>

</style>
