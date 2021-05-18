<template>
  <div>
      <el-table ref="table" border fit="fit" :stripe="stripe" :data="tableData" :empty-text="emptyText" highlight-current-row style="width:100%"
        @selection-change="onSelectionChange" @current-change="onCurrentRowChange">
        <slot name="columns"></slot>
      </el-table>
      <div v-if="pagination" class="Pagination" style="text-align: left;margion-top: 10px;">
        <el-pagination v-if="reload" @size-change="handleSizeChanged" @current-change="handleCurrentPageChanged" :current-page="currentPage"
          :page-sizes="pageSize" :page-size="limit" layout="total, -> ,sizes, -> , prev, pager, next" :total="count">
        </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    // 列宽是否自撑开
    fit: {
      type: Boolean,
      default: true,
      required: false
    },
    // 是否显示斑马纹
    stripe: {
      type: Boolean,
      default: true,
      required: false
    },
    // 表格高度
    tableHeight: {
      type: Number,
      default: 0,
      required: false
    },
    // 是否分页
    pagination: {
      type: Boolean,
      default: true,
      required: false
    },
    // 分页数量选项
    pageSize: {
      type: Array,
      default: function () {
        return [5, 10, 20, 50, 100]
      },
      required: false
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
      // 偏移数，(currentpage-1)*limit
      offset: 0,
      // 每页数量
      limit: 20,
      // 总数
      count: 0,
      // 当前页码数
      currentPage: 1,
      emptyText: 'Sorry,暂无数据',
      // 选中行
      selectRow: null
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async getApiData () {
      var params = this.params
      if (this.pagination) {
        params.page = this.currentPage
        params.rows = this.limit
      }
      this.emptyText = '加载中……'
      this.tableData = []
      this.reload = false
      const result = await this.searchApi(params)
      if (result.state === 1) {
        this.tableData = result.result.data
        this.count = result.result.totalCount
        if (this.count.length === 0) {
          this.emptyText = '暂无数据……'
        }
        this.reload = true
      } else {
        this.$message.error('获取数据失败！')
      }
    },
    async initData () {
      try {
        this.getApiData()
      } catch (err) {
        this.$message.error('获取数据失败！')
      }
    },
    handleSizeChanged (val) {
      this.limit = val
      this.getApiData()
    },
    handleCurrentPageChanged (val) {
      this.currentPage = val
      this.offset = (val - 1) * this.limit
      this.getApiData()
    },
    onCurrentRowChange (selection) {
      this.selectRow = selection
    },
    onSelectionChange (selection) {
      this.selectRow = selection
    },
    getSelectRow () {
      return this.selectRow
    },
    getTableData () {
      return this.tableData
    },
    search (parmas) {
      for (var i in parmas) {
        this.params[i] = parmas[i]
      }
      this.getApiData()
    },
    clearSelection () {
      this.$refs.table.clearSelection()
    }
  }
}
</script>

<style>

</style>
