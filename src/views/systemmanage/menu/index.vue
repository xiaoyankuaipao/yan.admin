<template>
  <div>
    <el-card style="margin:10px">
      <div slot="header"  v-text="title"></div>
        <el-row>
          <el-button-group style="margin-bottom:10px;">
            <el-button type="primary" icon="el-icon-plus">创建</el-button>
            <el-button type="primary" icon="el-icon-edit">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="onDelete">删除</el-button>
          </el-button-group>
        </el-row>
        <el-row>
          <tree-table ref="menuTreeTable" :search-api="searchApi" :isHaveCheckBox='true' :tree-column="{prop:'name',label:'名称'}" children-field='children'>
            <template slot="columns">
              <el-table-column prop="address" label="地址"></el-table-column>
              <el-table-column prop="code" label="编码"></el-table-column>
              <el-table-column prop="menuType" label="是否按钮" :formatter="formatterToMenuType"></el-table-column>
            </template>
          </tree-table>
        </el-row>
    </el-card>
  </div>
</template>

<script>
import { getMenuTree, deleteMenu } from '@/api/getData'
import treeTable from '@/components/TreeTable/inde.vue'
export default {
  components: {
    treeTable
  },
  data () {
    return {
      loading: false,
      title: '菜单管理',
      searchApi: getMenuTree
    }
  },
  created () {
  },
  methods: {
    formatterToMenuType (row, column) {
      return row.menuType === 3 ? '是' : '-'
    },
    onDelete () {
      var row = this.$refs.menuTreeTable.getSelectRow()
      if (row) {
        this.$confirm('确定要删除菜单： ' + row.name + ' ?', '提示').then(() => {
          this.deleteInfo(row.id)
        })
      } else {
        this.$message({
          message: '请选择要删除的数据',
          type: 'warning'
        })
      }
    },
    async deleteInfo (id) {
      let res = await deleteMenu(id)
      console.log(res)
      if (res && res.state === 1) {
        this.$refs.menuTreeTable.search()
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
    }
  }
}
</script>

<style>

</style>
