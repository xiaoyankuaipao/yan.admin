// 全局组件
import yTtable from './Table/index.vue'

var plugin = {
  yTable: yTtable
}

export default {
  install (Vue) {
    for (var i in plugin) {
      Vue.component(i, plugin[i])
    }
  }
}
