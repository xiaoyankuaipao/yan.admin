<template>
  <div>
      <el-card style="margin:10px;">
          <div slot="header" class="clearfix" v-text="title"></div>
          <el-row>
              <el-col :span="10">
                  <el-form :inline="true" :model="searchParams">
                      <el-form-item label="">
                          <el-select v-model="searchParams.categoryId" placeholder="请选择文章分类">
                              <el-option
                                v-for="item in categoryList"
                                :key="item.id"
                                :label="item.category"
                                :value="item.id">
                              </el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item>
                          <el-button type="primary" @click.native="onSearch">查询</el-button>
                      </el-form-item>
                  </el-form>
              </el-col>
              <el-col :span="14" style="text-align:right;">
                <el-button-group style="margin-bottom:10px;">
                  <el-button type="primary" icon="el-icon-first-aid-kit" @click="onCreate">创建</el-button>
                  <el-button type="primary" icon="el-icon-edit" @click="onUpdate">修改</el-button>
                  <el-button type="danger" icon="el-icon-delete" @click="onDelete">删除</el-button>
                </el-button-group>
              </el-col>
          </el-row>

          <el-row>
              <y-table ref='tableArticle' :search-api='searchApi' :params="searchParams">
                <template slot="columns">
                   <el-table-column type="index"></el-table-column>
                        <el-table-column prop="title" label="文章名称" :show-overflow-tooltip='true' min-width="30%"></el-table-column>
                        <el-table-column prop="remark" label="摘要" :show-overflow-tooltip='true'  min-width="25%"></el-table-column>
                        <el-table-column prop="categoryName" label="分类" :show-overflow-tooltip='true'  min-width="5%"></el-table-column>
                        <el-table-column prop="readCount" label="阅读数" :show-overflow-tooltip='true'  min-width="5%"></el-table-column>
                        <el-table-column prop="likeCount" label="喜欢数"  :show-overflow-tooltip='true' min-width="5%"></el-table-column>
                        <el-table-column prop="createTime" label="最后更新时间"  :show-overflow-tooltip='true' min-width="15%"></el-table-column>
                        <el-table-column fixed="right" label="操作" min-width="15%" :show-overflow-tooltip='true'>
                            <template slot-scope="scope">
                                <el-button @click="handleShowClick(scope.row)" type="text" >查看</el-button>
                                <el-button @click="handleUpdateClick(scope.row)" type="text" >编辑</el-button>
                                <el-button @click="handleDeleteClick(scope.row)" type="text" >删除</el-button>
                            </template>
                        </el-table-column>
                </template>
              </y-table>
          </el-row>
      </el-card>

      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :close-on-click-modal="false" :size="dialogSize" :fullscreen="true">
          <component :is="dialogType" v-if="dialogVisible" :articleId="articleId" @submit-complete="onCloseDialog" />
      </el-dialog>
  </div>
</template>

<script>
import addOrUpdate from './addOrUpdate'
import { getCategoryList, getArticlePageByCategory, deleteArticle } from '@/api/getData'
export default {
  data () {
    return {
      title: '文章管理',
      searchApi: getArticlePageByCategory,
      searchParams: {
        categoryId: ''
      },
      categoryList: [],
      dialogVisible: false,
      dialogTitle: '',
      dialogType: 'addOrUpdate',
      dialogSize: 'small',
      articleId: ''
    }
  },
  components: {
    addOrUpdate
  },
  created () {
    this.onGetCategoryList()
  },
  methods: {
    async onGetCategoryList () {
      let res = await getCategoryList()
      if (res.state === 1) {
        this.categoryList = res.result.data
        this.categoryList.push({
          id: '',
          category: '全部'
        })
      }
    },
    onSearch () {
      this.$refs.tableArticle.search()
    },
    handleShowClick (row) {
      window.open('http://82.156.187.171:9898/Home/Article/' + row.id)
    },
    handleUpdateClick (row) {
      this.dialogTitle = '修改文章'
      this.dialogType = 'addOrUpdate'
      this.dialogSize = 'small'
      this.articleId = row.id
      this.dialogVisible = true
    },
    handleDeleteClick (row) {
      this.$confirm('确定要删除文章 ' + row.title + ' 吗?', '提示').then(() => {
        this.deleteInfo(row.id)
      })
    },
    onCreate () {
      this.dialogTitle = '新增文章'
      this.dialogType = 'addOrUpdate'
      this.dialogSize = 'small'
      this.articleId = ''
      this.dialogVisible = true
    },
    onUpdate () {
      var row = this.$refs.tableArticle.getSelectRow()
      if (row) {
        this.dialogTitle = '修改文章'
        this.dialogType = 'addOrUpdate'
        this.dialogSize = 'small'
        this.articleId = row.id
        this.dialogVisible = true
      } else {
        this.$message({message: '请选择要修改的数据', type: 'warning'})
      }
    },
    onDelete () {
      var row = this.$refs.tableArticle.getSelectRow()
      if (row) {
        this.$confirm('确定要删除文章 ' + row.title + ' 吗?', '提示').then(() => {
          this.deleteInfo(row.id)
        })
      } else {
        this.$message({message: '请选择要删除的数据', type: 'warning'})
      }
    },
    async deleteInfo (id) {
      let result = await deleteArticle(id)
      if (result && result.state === 1) {
        this.$refs.tableArticle.search()
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
    onCloseDialog (success) {
      this.dialogVisible = false
      if (success) {
        this.$refs.tableArticle.search()
      }
    }
  }

}
</script>

<style>

</style>