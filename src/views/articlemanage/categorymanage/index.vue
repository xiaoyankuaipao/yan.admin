<template>
  <div>
    <el-card  style="margin:10px;">
      <div slot="header" class="clearfix" v-text="title"></div>
      <el-row>
        <el-button-group style="margin-bottom:10px;">
          <el-button type="primary" icon="el-icon-first-aid-kit" >创建</el-button>
          <el-button type="primary" icon="el-icon-edit" >修改</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </el-button-group>
      </el-row>
      <el-row>
        <y-table ref='tableCategory' :search-api='searchApi' :pagination='false' >
          <template slot="columns">
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column label="分类名称" prop="category"></el-table-column>
          </template>
        </y-table>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getCategoryList, deleteCategory } from '@/api/getData.js'
export default {
  data () {
    return {
      title: '文章分类管理',
      searchApi: getCategoryList
    }
  }
}
</script>

<style>
</style>
