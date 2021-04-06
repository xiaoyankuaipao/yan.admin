<template>
  <p>
    <template v-for="(item, index) in data">
      <el-menu-item :key="index" v-if="item.children==null ||  item.children.length==0" :index="item.address">
        <i :class="item.icon"></i>
        {{item.name}}
      </el-menu-item>
      <el-submenu :key="index" v-if="item.children && item.children.length" :index="item.id.toString()">
        <template slot="title">
          <i :class="item.icon"></i>
          <span v-text="item.name">导航一</span>
        </template>
        <submenu :data="item.children"></submenu>
      </el-submenu>
    </template>
   </p>
</template>

<script>
import Submenu from './subMenu.vue'
export default {
  name: 'Submenu',
  data () {
    return {
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Submenu
  },
  created () {
  },
  methods: {
  }
}
</script>

<style>

</style>