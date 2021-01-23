<template>
  <el-button type="primary" icon="el-icon-plus">
    添加菜单
  </el-button>

  <el-table :data="menus" style="width: 100%">
    <el-table-column align="center" type="index" />
    <el-table-column
      align="center"
      label="菜单名称"
      prop="name"
      min-width="120"
    />
    <el-table-column
      align="center"
      label="菜单级数"
      prop="level"
      min-width="120"
    />
    <el-table-column
      align="center"
      label="前端图标"
      prop="icon"
      min-width="120"
    />
    <el-table-column
      align="center"
      label="排序"
      prop="orderNum"
      min-width="120"
    />
    <el-table-column
      align="center"
      label="操作"
      min-width="120"
    >
      <template #default="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Menu } from '@/types'
import { getAll } from '@/services/menu'

export default defineComponent({
  data: (): {
    menus: Menu[]
  } => ({
    menus: []
  }),
  methods: {
    handleEdit(row: any) {
      console.log(row)
    },
    handleDelete(row: any) {
      console.log(row)
    },
    async loadMenus() {
      this.menus = await getAll()
    }
  },
  created() {
    this.loadMenus()
  }
})
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 20px;
}
</style>
