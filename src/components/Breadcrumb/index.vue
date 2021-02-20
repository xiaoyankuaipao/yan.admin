<template>
    <el-breadcrumb class="app-breadcrumb"  separator="/">
        <el-breadcrumb-item :to="{path:'/Login'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
}
</style>
