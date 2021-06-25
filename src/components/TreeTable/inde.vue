<template>
    <div >
        <el-table ref="treeTable" border highlight-current-row :data="tableData" :empty-text="emptyText" row-key="id" default-expand-all
          @selection-change="onSelectionChange"
          @current-change="onCurrentRowChange">
            <el-table-column :prop="treeColumn.prop" :label="treeColumn.label">
              <template slot-scope="scope" >
                <el-checkbox v-model="scope.row.checked" :key="scope.row.id" v-if="isHaveCheckBox"  @change="handleCheckChange(scope.row)"></el-checkbox>
                {{scope.row.name}}
              </template>
            </el-table-column>
            <slot name="columns"></slot>
        </el-table>
    </div>
</template>

<script>
export default {
  props: {
    // 是否有复选框
    isHaveCheckBox: {
      type: Boolean,
      default: false,
      required: false
    },
    // 树形列信息
    treeColumn: {
      type: Object,
      required: true,
      default () {
        return {
          prop: '1',
          label: '2'
        }
      }
    },
    // 子节点标识
    childrenField: {
      type: String,
      required: false,
      default: 'children'
    },
    // 查询API，方法
    searchApi: {
      type: Function,
      required: true
    },
    // 查询参数
    params: {
      type: Object,
      default () {
        return {}
      },
      required: false
    }
  },
  data () {
    return {
      reload: true,
      tableData: [],
      checkedIds: [],
      selectRow: null,
      emptyText: 'Sorry,暂无数据'
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async getApiData () {
      var params = this.params
      this.emptyText = '加载中……'
      this.tableData = []
      this.reload = false
      const result = await this.searchApi(params)
      if (result.state === 1) {
        if (this.isHaveCheckBox) {
          result.data.forEach(item => {
            item.p = null
            this.addCheckProp(item)
          })
        }
        this.tableData = result.data
      } else {
        this.$message.error('获取数据失败！')
      }
    },
    addCheckProp (item) {
      item.checked = false
      if (this.childrenField in item && item[this.childrenField].length > 0) {
        item[this.childrenField].forEach(row => {
          this.addCheckProp(row)
          row.p = item
        })
      }
    },
    async initData () {
      try {
        this.getApiData()
      } catch (err) {
        this.$message.error('获取数据失败！')
      }
    },
    handleCheckChange (row) {
      this.changeChildrenState(row)
      this.changeParentState(row)
    },
    changeChildrenState (row) {
      if (this.childrenField in row && row[this.childrenField].length > 0) {
        row[this.childrenField].forEach(item => {
          item.checked = row.checked
          this.changeChildrenState(item)
        })
      }
    },
    changeParentState (row) {
      var parent
      if (row.checked) {
        if (row.p != null) {
          parent = row.p
          parent.checked = true
          if (parent.p != null) {
            this.changeParentState(parent)
          }
        }
      } else {
        if (row.p != null) {
          parent = row.p
          if (parent != null) {
            let count = 0
            parent[this.childrenField].forEach(c => {
              if (!c.checked) {
                count++
              }
            })
            if (count === parent[this.childrenField].length) {
              parent.checked = false
              this.changeParentState(parent)
            }
          }
        }
      }
    },
    // 获取选中的标识 数组 外部调用
    getSelectedIds () {
      this.checkedIds.splice(0, this.checkedIds.length)
      this.tableData.forEach(row => {
        if (row.checked) {
          this.checkedIds.push(row.id)
        }
        this.getSelectedIdsInter(row)
      })
      return this.checkedIds
    },
    getSelectedIdsInter (row) {
      if (this.childrenField in row && row[this.childrenField].length > 0) {
        row[this.childrenField].forEach(item => {
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
    // 获取选择的行，外部调用
    getSelectRow () {
      return this.selectRow
    },
    // 获取表格数据，外部调用
    getTableData () {
      return this.tableData
    },
    // 数据加载，外部调用
    search (parmas) {
      for (var i in parmas) {
        this.params[i] = parmas[i]
      }
      this.getApiData()
    },
    // 清除选中，外部调用
    clearSelection () {
      this.$refs.treeTable.clearSelection()
    },
    // 根据ids 数组，选中行，外部调用
    setChecked (ids) {
      this.tableData.forEach(row => {
        if (ids.indexOf(row.id) > -1) {
          row.checked = true
        }
        this.setCheckedInter(row, ids)
      })
    },
    setCheckedInter (row, ids) {
      if (this.childrenField in row && row[this.childrenField].length > 0) {
        row[this.childrenField].forEach(item => {
          if (ids.indexOf(item.id) > -1) {
            item.checked = true
          }
          this.setCheckedInter(item, ids)
        })
      }
    },
    // 清除所有选中，外部调用
    clearAllChecked () {
      this.tableData.forEach(row => {
        row.checked = false
        this.clearAllCheckedInter(row)
      })
    },
    clearAllCheckedInter (row) {
      if (this.childrenField in row && row[this.childrenField].length > 0) {
        row[this.childrenField].forEach(item => {
          item.checked = false
          this.clearAllCheckedInter(item)
        })
      }
    }
  }
}
</script>

<style>

</style>
