<template>
    <div style="padding:0 30px;" @click="fullscreenClick">
        <el-tooltip :content="iconTip" placement="bottom" effect="light">
          <i class="el-icon-full-screen"></i>
        </el-tooltip>
    </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  data () {
    return {
      isFullscreen: false
    }
  },
  methods: {
    fullscreenClick () {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '不支持全屏',
          type: 'warning'
        })
        return false
      }
      screenfull.toggle()
    }
  },
  computed: {
    iconTip () {
      console.log(screenfull.isFullscreen)
      return (screenfull.isFullscreen ? '取消全屏' : '全屏')
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
