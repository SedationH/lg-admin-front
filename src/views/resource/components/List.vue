<template>
  <el-form
    ref="form"
    :model="resourceFilter"
    label-width="120px"
  >
    <el-form-item label="资源名称">
      <el-input v-model="resourceFilter.name"></el-input>
    </el-form-item>
    <el-form-item label="资源路径">
      <el-input v-model="resourceFilter.url"></el-input>
    </el-form-item>
    <el-form-item label="资源分类">
      <el-select
        v-model="resourceFilter.categoryId"
        placeholder="全部"
        clearable
      >
        <el-option
          v-for="category in categoryList"
          :key="category.id"
          :label="category.name"
          :value="category.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item class="form-button">
      <el-button
        :disabled="isLoading"
        type="primary"
        @click="onSubmit"
      >
        查询
      </el-button>
      <el-button @click="onReset">重置</el-button>
    </el-form-item>
  </el-form>
  <el-card>
    <el-table :data="resources" v-loading="isLoading">
      <el-table-column
        align="center"
        label="编号"
        type="index"
      />
      <el-table-column
        align="center"
        label="资源名称"
        prop="name"
        min-width="180"
      />
      <el-table-column
        align="center"
        label="资源路径"
        prop="url"
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
            @click="handleEdit(scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :currentPage="resourceFilter.current"
    :page-sizes="[5, 10, 15, 20]"
    :page-size="resourceFilter.size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    :disabled="isLoading"
  >
  </el-pagination>
</template>

<script>
import {
  getCategoryAll,
  getResourcePages
} from '@/services/resource'

export default {
  data: () => ({
    resourceFilter: {
      current: 1,
      size: 5,
      name: '',
      url: '',
      categoryId: ''
    },
    categoryList: [],
    resources: [],
    total: 0,
    isLoading: true
  }),
  methods: {
    onReset() {
      // 无效 dont know why
      this.$refs.form.resetFields()
    },
    onSubmit() {
      this.loadResourcePages()
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    async loadResourcePages() {
      this.isLoading = true
      const { records, total } = await getResourcePages(
        this.resourceFilter
      )
      this.resources = records
      this.total = total
      this.isLoading = false
    },
    handleSizeChange(size) {
      this.resourceFilter.current = 1
      this.resourceFilter.size = size
      this.loadResourcePages()
    },
    handleCurrentChange(current) {
      this.resourceFilter.current = current
      this.loadResourcePages()
    }
  },
  async created() {
    this.categoryList = await getCategoryAll()
    this.loadResourcePages()
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  margin-top: 26px;
  display: flex;
  justify-content: center;
}
</style>
