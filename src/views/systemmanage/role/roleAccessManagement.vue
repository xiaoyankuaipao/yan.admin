<template>
  <div>
      <el-card class="box-card">
          <!-- <div slot="header" class="clearfix" v-text="title"></div> -->
          <el-row :gutter="10">
              <el-col :span="4">
                  <div>
                      <el-tree :data="roles" default-expand-all node-key="id" ref="tree" :current-node-key="currentCheckedId"
                        highlight-current :props="defaultProps" :expand-on-click-node="false" @node-click="changeRoleNode" style="height:100%"
                      ></el-tree>
                  </div>
              </el-col>
              <el-col :span="20" v-loading="loading">
                  <el-row style="margin-bottom:20px">
                      <el-button @click="onSave">保存</el-button>
                  </el-row>
                  <el-row>
                    <tree-table ref="menuTreeTable" :search-api="searchApi" :isHaveCheckBox='true' :tree-column="{prop:'name',label:'名称'}" children-field='children'>
                        <template slot="columns">
                        <el-table-column prop="address" label="地址"></el-table-column>
                        </template>
                    </tree-table>
                  </el-row>
              </el-col>
          </el-row>
      </el-card>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable/inde.vue'
import { getRolelist, getMenuTree, getMenuTreeByRoleId, saveMenuIdsByRoleId } from '@/api/getData'
export default {
  components: {
    treeTable
  },
  data () {
    return {
      loading: false,
      title: '角色权限管理',
      searchApi: getMenuTree,
      roles: [],
      defaultProps: {
        label: 'text',
        children: 'children'
      },
      currentCheckedMenuArr: [],
      currentCheckedId: ''
    }
  },
  created () {
    this.onGetRoles()
  },
  methods: {
    async onGetRoles () {
      let result = await getRolelist()
      if (result && result.state === 1) {
        let rolesArr = result.result.data
        for (let r in rolesArr) {
          this.roles.push({
            id: rolesArr[r].id,
            text: rolesArr[r].name,
            children: []
          })
        }
      }
    },
    changeRoleNode (data) {
      this.loading = true
      this.currentCheckedId = data.id
      this.getRolMenu(data.id)
      this.loading = false
    },
    async getRolMenu (roleId) {
      let result = await getMenuTreeByRoleId(roleId)
      if (result) {
        let data = result.data
        this.currentCheckedMenuArr = []
        for (var i in data) {
          this.currentCheckedMenuArr.push(data[i].id)
          if (data[i].children && data[i].children.length > 0) {
            let ids = this.getChildrenIds(data[i].children)
            this.currentCheckedMenuArr.push(...ids)
          }
        }
        this.$refs.menuTreeTable.clearAllChecked()
        this.$refs.menuTreeTable.setChecked(this.currentCheckedMenuArr)
      }
    },
    getChildrenIds (children) {
      let ids = []
      for (var i in children) {
        ids.push(children[i].id)
        if (children[i].children && children[i].children.length > 0) {
          let childIds = this.getChildrenIds(children[i].children)
          ids.push(...childIds)
        }
      }
      return ids
    },
    onSave () {
      var selectedIds = this.$refs.menuTreeTable.getSelectedIds()
      console.log(selectedIds)
      var submitData = {
        roleId: this.currentCheckedId,
        menuIds: selectedIds
      }
      saveMenuIdsByRoleId(submitData).then(res => {
        if (res && res.state === 1) {
          this.$message({message: '保存成功!', type: 'success'})
        //   this.$emit('submit-complete', true)
        } else {
          this.$message({message: '保存失败！', type: 'error'})
        }
      // eslint-disable-next-line handle-callback-err
      }).catch(err => {
        this.$message({message: '保存失败！', type: 'error'})
      })
    }
  }
}
</script>

<style>

</style>
