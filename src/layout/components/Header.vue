<template>
  <div class="header-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"
        >homepage</el-breadcrumb-item
      >
      <el-breadcrumb-item
        >promotion management</el-breadcrumb-item
      >
      <el-breadcrumb-item
        >promotion list</el-breadcrumb-item
      >
      <el-breadcrumb-item
        >promotion detail</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
.header-container {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
