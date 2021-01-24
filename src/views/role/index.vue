<template>
  <el-form inline ref="form" :model="roleFilter">
    <el-form-item label="角色名称">
      <el-input v-model="roleFilter.name"></el-input>
    </el-form-item>
    <el-form-item label="角色编号">
      <el-input v-model="roleFilter.code"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit"
        >查询</el-button
      >
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
  <el-button
    style="margin-bottom: 20px"
    type="primary"
    icon="el-icon-plus"
    @click="show = true"
  >
    添加角色
  </el-button>
  <el-table :data="records">
    <el-table-column
      align="center"
      label="编号"
      prop="code"
      min-width="180"
    />
    <el-table-column
      align="center"
      label="角色名称"
      prop="name"
      min-width="180"
    />
    <el-table-column
      align="center"
      label="描述"
      prop="description"
      min-width="180"
    />
    <el-table-column
      align="center"
      label="添加时间"
      prop="createdTime"
      min-width="180"
    >
    </el-table-column>
    <el-table-column
      align="center"
      label="操作"
      min-width="180"
    >
      <template #default="scope">
        <el-button
          size="mini"
          @click="handleAssigningMenus(scope.row)"
        >
          分配菜单
        </el-button>
        <el-button
          size="mini"
          @click="handleAssigningResources(scope.row)"
        >
          分配资源
        </el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.row)"
        >
          编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="Tips" v-model="show">
    <el-form
      ref="roleForm"
      :rules="rules"
      :model="roleForm"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="roleForm.name"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色编号" prop="code">
        <el-input
          v-model="roleForm.code"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input
          v-model="roleForm.description"
          type="textarea"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="onCancel">Cancel</el-button>
      <el-button
        type="primary"
        @click="onSaveOrUpdateSubmit"
      >
        Confirm
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import { getRolePages, saveOrUpdate } from '@/services/role'

const role = {
  get filter() {
    return {
      name: '',
      code: '',
      current: 1,
      size: 10
    }
  },
  get form() {
    return {
      name: '',
      code: '',
      description: ''
    }
  }
}

export default {
  name: 'role',
  data: () => ({
    roleFilter: role.filter,
    records: [],
    total: 0,
    show: false,
    roleForm: role.form
  }),
  methods: {
    handleDelete() {
      console.log('delete')
    },
    handleEdit() {
      console.log('edit')
    },
    handleAssigningResources() {
      console.log('resource')
    },
    handleAssigningMenus({ id }) {
      this.$router.push({
        name: 'roleMenu',
        params: { id }
      })
    },
    async loadRolePages() {
      const { records, total } = await getRolePages(
        this.roleFilter
      )
      this.total = total
      this.records = records
    },
    onSubmit() {
      this.loadRolePages()
      this.roleFilter = role.filter
    },
    resetForm() {
      // TODO: 无效
      // this.$refs.form.resetFields()
      this.roleFilter = role.filter
    },
    onCancel() {
      this.show = false
      this.roleForm = role.form
    },
    async onSaveOrUpdateSubmit() {
      try {
        await saveOrUpdate(this.roleForm)
        this.$message.success('添加成功')
        this.onCancel()
      } catch (e) {
        this.$message.error(e)
      }
    }
  },
  created() {
    this.loadRolePages()
  }
}
</script>
