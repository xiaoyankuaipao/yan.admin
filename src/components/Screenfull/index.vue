<template>
    <div style="padding:0 15px;" @click="fullscreenClick">
        <el-tooltip :content="this.isFullscreen ? '取消全屏' : '全屏'" placement="bottom" effect="light">
          <i class="el-icon-full-screen"></i>
        </el-tooltip>
    </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  data () {
    return {
      isFullscreen: false,
      iconTip: '全屏'
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.destroy()
  },
  methods: {
    change () {
      this.isFullscreen = screenfull.isFullscreen
    },
    init () {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    fullscreenClick () {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '不支持全屏',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    },
    destory () {
      if (screenfull.isEnabled) {
        screenfull.off('change')
      }
    }
  }
}
</script>

<style scoped>
i:hover {
  cursor: pointer;
  background-color: #d9d9d9;
  transition: background-color .28s;
}
i {
  display: inline-block;
  vertical-align: middle;
  font-size: 25px;
}

</style>
