<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <el-submenu index="1">
      <template #title>
        <i class="el-icon-location"></i>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/role">
        <i class="el-icon-setting"></i>
        <span>角色管理</span>
      </el-menu-item>
      <el-menu-item index="/menu">
        <i class="el-icon-setting"></i>
        <span>菜单管理</span>
      </el-menu-item>
      <el-menu-item index="/resource">
        <i class="el-icon-setting"></i>
        <span>资源管理</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="/course">
      <i class="el-icon-menu"></i>
      <span>课程管理</span>
    </el-menu-item>
    <el-menu-item index="/user">
      <i class="el-icon-document"></i>
      <span>用户管理</span>
    </el-menu-item>
    <el-submenu index="4">
      <template #title>
        <i class="el-icon-location"></i>
        <span>广告管理</span>
      </template>
      <el-menu-item index="/advert">
        <i class="el-icon-setting"></i>
        <span>广告列表</span>
      </el-menu-item>
      <el-menu-item index="/advet-space">
        <i class="el-icon-setting"></i>
        <span>广告位列表</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
