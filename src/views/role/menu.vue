<template>
  <el-card class="box-card">
    <el-tree
      ref="tree"
      :data="menus"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="selected"
      :props="defaultProps"
    >
    </el-tree>
    <div class="assigning-menus-button">
      <el-button type="primary" @click="onSave">
        保存
      </el-button>
      <el-button @click="onClear">清空</el-button>
    </div>
  </el-card>
</template>

<script>
import {
  getRoleMenus,
  allocateRoleMenus
} from '@/services/menu'

export default {
  name: 'roleMenu',
  props: {
    id: {
      required: true
    }
  },
  data: () => ({
    menus: [],
    defaultProps: {
      children: 'subMenuList',
      label: 'name'
    },
    selected: []
  }),
  methods: {
    async getRoleMenus() {
      this.menus = await getRoleMenus({
        roleId: this.id
      })
      this.getSelectedMenus(this.menus)
    },
    onClear() {
      console.log('clear')
    },
    onSave() {
      this.$confirm('是否确认分配菜单？')
        .then(async () => {
          try {
            await allocateRoleMenus({
              roleId: this.id,
              menuIdList: this.$refs.tree.getCheckedKeys()
            })
            this.$message.success('分配成功')
          } catch (error) {
            this.$message.danger('分配失败')
          }
        })
        .catch(() => this.$message.warning('取消成功'))
    },
    getSelectedMenus(menus) {
      // dfs
      menus.forEach(menu => {
        if (menu.selected) {
          console.log(menu.id)
          this.selected.push(menu.id)
        }
        if (menu.subMenuList) {
          this.getSelectedMenus(menu.subMenuList)
        }
      })
    }
  },
  created() {
    this.getRoleMenus()
  }
}
</script>

<style lang="scss" scoped>
.assigning-menus-button {
  text-align: center;
}
</style>
