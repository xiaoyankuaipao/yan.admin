<template>
  <div style="padding:0 15px;"  @click="toggleClick">
      <i :class="{'el-icon-s-fold': isActive,'el-icon-s-unfold': !isActive}" class="shrink"></i>
  </div>
</template>

<script>
export default {
  name: 'Shrink',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.shrink {
  display: inline-block;
  vertical-align: middle;
  font-size: 25px;
}
</style>
