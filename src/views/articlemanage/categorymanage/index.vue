<template>
  <div>
    <el-card  style="margin:10px;">
      <div slot="header" class="clearfix" v-text="title"></div>
      <el-row>
        <el-button-group style="margin-bottom:20px;">
          <el-button type="primary" icon="el-icon-add" >创建</el-button>
          <el-button type="primary" icon="el-icon-edit" >修改</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
        </el-button-group>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getCategoryList,deleteCategory } from '@/api/getData.js'
export default {
  data () {
    return {
      title: '文章分类管理'
    }
  }
}
</script>

<style>
</style>
