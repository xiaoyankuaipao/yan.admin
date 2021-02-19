<template>
    <div class="navbar">
        <shink :is-active="sidebar.opened" class="shink-container" @toggleClick="toggleSideBar" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Shink from '@/components/Shrink/index'
export default {
  components: {
    Shink
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('sidebarModule/toggleSidebar')
    }
  }
}
</script>

<style scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
.shink-container {
  line-height: 50px;
  height: 100%;
  float: left;
  cursor: pointer;
}
</style>
