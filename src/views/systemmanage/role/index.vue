<template>
  <div>
      <el-card style="margin:10px">
          <div slot="header" class="clearfix" v-text="title"></div>
          <el-row>
              <el-button-group style="margin-bottom:10px;">
                <el-button type="primary" icon="el-icon-plus" @click="onCreate">创建</el-button>
                <el-button type="primary" icon="el-icon-edit" @click="onUpdate">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="onDelete">删除</el-button>
                <el-button type="default" icon="el-icon-edit-outline" @click="onRoleAccessManagement">角色权限管理</el-button>
              </el-button-group>
          </el-row>
          <el-row>
              <y-table ref="tableRole" :search-api="searchApi" :pagination="false">
                  <template slot="columns">
                      <el-table-column type="index" min-width="10%"></el-table-column>
                      <el-table-column prop="name" label="角色名称" min-width="20%"></el-table-column>
                      <el-table-column prop="displayName" label="角色显示名称"></el-table-column>
                  </template>
              </y-table>
          </el-row>
      </el-card>

      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" :size="dialogSize">
        <!-- 渲染一个“元组件”为动态组件。依 is 的值，来决定哪个组件被渲染 -->
        <component :is="dialogType" v-if="dialogVisible" :formData="formData" @submit-complete="onCloseDialog"></component>
      </el-dialog>

  </div>
</template>

<script>
import addOrUpdate from './addOrUpdate'
import roleAccessManagement from './roleAccessManagement.vue'
import {getRolelist, deleteRole} from '@/api/getData'
export default {
  data () {
    return {
      loading: false,
      title: '角色管理',
      searchApi: getRolelist,
      dialogVisible: false,
      dialogTitle: '',
      formData: {},
      dialogType: 'addOrUpdate',
      dialogSize: 'small'
    }
  },
  components: {
    addOrUpdate,
    roleAccessManagement
  },
  methods: {
    onCreate () {
      this.dialogTitle = '新增角色'
      this.dialogType = 'addOrUpdate'
      this.dialogSize = 'small'
      this.formData = {
        name: '',
        diaplayName: '',
        id: ''
      }
      this.dialogVisible = true
    },
    onUpdate () {
      var row = this.$refs.tableRole.getSelectRow()
      if (row) {
        this.dialogTitle = '修改角色'
        this.dialogType = 'addOrUpdate'
        this.dialogSize = 'small'
        this.formData = {...row}
        this.dialogVisible = true
      } else {
        this.$message({message: '请选择要修改的数据', type: 'warning'})
      }
    },
    onDelete () {
      var row = this.$refs.tableRole.getSelectRow()
      if (row) {
        this.$confirm('确定要删除角色：' + row.displayName + ' ?', '提示').then(() => {
          this.deleteInfo(row.id)
        })
      } else {
        this.$message({message: '请选择要删除的数据', type: 'warning'})
      }
    },
    async deleteInfo (id) {
      let result = await deleteRole(id)
      if (result && result.state === 1) {
        this.$refs.tableRole.search()
        this.$message({
          type: 'success',
          message: '删除成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: '删除失败'
        })
      }
    },
    onRoleAccessManagement () {
      this.dialogTitle = '角色权限管理'
      this.dialogType = 'roleAccessManagement'
      this.dialogSize = 'large'
      this.dialogVisible = true
    },
    onCloseDialog (success) {
      this.loading = false
      this.dialogVisible = false
      if (success) {
        this.$refs.tableRole.search()
      }
    }
  }
}
</script>

<style>

</style>
