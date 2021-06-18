<template>
  <div>
    <el-card style="margin:10px">
      <div slot="header" class="clearfix" v-text="title"></div>
        <el-row>
          <el-button-group style="margin-bottom:10px;">
            <el-button type="primary" icon="el-icon-first-aid-kit" >创建</el-button>
            <el-button type="primary" icon="el-icon-edit" >修改</el-button>
            <el-button type="danger" icon="el-icon-delete" >删除</el-button>
          </el-button-group>
        </el-row>
        <el-row>
          <el-table :data="tableData" style="width:100%" row-key="id" border>
            <el-table-column prop="name" label="菜单名称">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.checked" :key="scope.row.id" v-if="isHaveCheckBox" @change="handleCheckChange(scope.row)"></el-checkbox>
                {{scope.row.name}}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column prop="code" label="编码"></el-table-column>
            <el-table-column prop="menuType" label="是否按钮" :formatter="formatterToMenuType"></el-table-column>
          </el-table>
        </el-row>
    </el-card>
  </div>
</template>

<script>
import { getMenuTree, deleteMenu } from "@/api/getData"
export default {
  data () {
    return {
      loading: false,
      title: '菜单管理',
      isHaveCheckBox: true,
      tableData: []
    }
  },
  created () {
    this.getMenus()
  },
  methods: {
    async getMenus () {
      var result = await getMenuTree()
      if (result.state === 1) {
        this.tableData = result.data
      }
    },
    formatterToMenuType (row, column) {
      return row.menuType === 3 ? '是' : '-'
    },
    handleCheckChange (row) {
      this.changeState(row)
    },
    changeState (row) {
      if ('children' in row && row.children.length > 0) {
        row.children.forEach(item => {
          item.checked = row.checked
          this.changeState(item)
        })
      }
    }
  }
}
</script>

<style>

</style>
