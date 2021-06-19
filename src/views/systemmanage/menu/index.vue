<template>
  <div>
    <el-card style="margin:10px">
      <div slot="header"  v-text="title"></div>
        <el-row>
          <el-button-group style="margin-bottom:10px;">
            <el-button type="primary" icon="el-icon-plus" @click="getSelectedIds">创建</el-button>
            <el-button type="primary" icon="el-icon-edit">修改</el-button>
            <el-button type="danger" icon="el-icon-delete">删除</el-button>
          </el-button-group>
        </el-row>
        <el-row>
          <el-table :data="tableData" style="width:100%" row-key="id" border ref="treeTable" highlight-current-row childrenProp='children'
           @selection-change="onSelectionChange"
           @current-change="onCurrentRowChange">
            <el-table-column prop="name" label="菜单名称">
              <template slot-scope="scope" >
                <el-checkbox v-model="scope.row.checked" :key="scope.row.id" v-if="isHaveCheckBox"  @change="handleCheckChange(scope.row)"></el-checkbox>
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
  props: {
    childrenProp: {
      type: String,
      default: 'children',
      required: false
    },
    idProp: {
      type: String,
      default: 'id',
      required: false
    },
    parnetIdProp: {
      type: String,
      default: 'parentId',
      required: false
    }
  },
  data () {
    return {
      loading: false,
      title: '菜单管理',
      isHaveCheckBox: true,
      tableData: [],
      checkedIds: [],
      selectRow: null
    }
  },
  created () {
    this.getMenus()
  },
  methods: {
    async getMenus () {
      var result = await getMenuTree()
      if (result.state === 1) {
        if (this.isHaveCheckBox) {
          result.data.forEach(item => {
            this.addCheckProp(item)
          })
        }
        this.tableData = result.data
      }
    },
    addCheckProp (item) {
      item.checked = false
      if (this.childrenProp in item && item[this.childrenProp].length > 0) {
        item.children.forEach(row => {
          this.addCheckProp(row)
        })
      }
    },
    formatterToMenuType (row, column) {
      return row.menuType === 3 ? '是' : '-'
    },
    handleCheckChange (row) {
      this.changeChildrenState(row)
      this.changeParentState(row)
    },
    changeChildrenState  (row) {
      if (this.childrenProp in row && row[this.childrenProp].length > 0) {
        row[this.childrenProp].forEach(item => {
          item.checked = row.checked
          this.changeChildrenState(item)
        })
      }
    },
    changeParentState (row) {
      var parent
      if (row.checked) {
        if (row.parentId !== 0) {
          parent = this.getParent(row.parentId)
          if (parent != null) {
            parent.checked = true
            this.changeParentState(parent)
          }
        }
      } else {
        if (row.parentId !== 0) {
          parent = this.getParent(row.parentId)
          if (parent != null) {
            let count = 0
            parent[this.childrenProp].forEach(c => {
              if (!c.checked) {
                count++
              }
            })
            if (count === parent[this.childrenProp].length) {
              parent.checked = false
              this.changeParentState(parent)
            }
          }
        }
      }
    },
    getParent (parentId) {
      for (let index = 0; index < this.tableData.length; index++) {
        let temp = this.tableData[index]
        if (temp.id === parentId) {
          return temp
        } else {
          var p = this.getParnetInter(temp, parentId)
          if (p != null) {
            return p
          }
        }
      }
    },
    getParnetInter (item, parentId) {
      if (this.childrenProp in item && item[this.childrenProp].length > 0) {
        for (let index = 0; index < item[this.childrenProp].length; index++) {
          if (item[this.childrenProp][index].id === parentId) {
            return item[this.childrenProp][index]
          } else {
            var p = this.getParnetInter(item[this.childrenProp][index], parentId)
            if (p != null) {
              return p
            }
          }
        }
      }
    },
    getSelectedIds () {
      this.checkedIds.splice(0, this.checkedIds.length)
      this.tableData.forEach(row => {
        if (row.checked) {
          this.checkedIds.push(row.id)
        }
        this.getSelectedIdsInter(row)
      })
      console.log(this.checkedIds)
    },
    getSelectedIdsInter (row) {
      if (this.childrenProp in row && row[this.childrenProp].length > 0) {
        row[this.childrenProp].forEach(item => {
          if (item.checked) {
            this.checkedIds.push(item.id)
          }
          this.getSelectedIdsInter(item)
        })
      }
    },
    onSelectionChange (selection) {
      this.selectRow = selection
    },
    onCurrentRowChange (selection) {
      this.selectRow = selection
    },
    getSelectRow () {
      return this.selectRow
    },
    getTableData () {
      return this.tableData
    }
  }
}
</script>

<style>

</style>
