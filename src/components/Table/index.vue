<template>
  <div>
      <el-table ref="table" border fit="fit" :stripe="stripe" :data="tableData" :empty-text="emptyText" highlight-current-row style="width:100%">

      </el-table>
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
  }
}
</script>

<style>

</style>
