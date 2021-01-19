<template>
  <el-container>
    <el-aside width="200px">
      <Aside />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Aside from './components/Aside.vue'

export default defineComponent({
  components: {
    Aside
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
}

.el-aside {
  background: rgb(84, 92, 100);
}

.el-header {
  background: #fff;
}

.el-main {
  background: #e9eef3;
}
</style>
