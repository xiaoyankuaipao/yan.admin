<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
/* “+”是选择相邻兄弟bai,叫做“相邻兄弟选择器”选择器能够匹配指定元素后面相邻的兄弟元素。 */
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>
