<template>
  <div class="CreateOrEdit">
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
    >
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径" prop="href">
        <el-input v-model="form.href"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId">
        <el-select
          v-model="form.parentId"
          placeholder="请选择上级菜单"
        >
          <el-option
            label="无上级菜单"
            :value="-1"
          ></el-option>
          <template v-if="parentMenuList.length > 0">
            <el-option
              v-for="item in parentMenuList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="前端图标" prop="icon">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="shown">
        <el-switch v-model="form.shown"></el-switch>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input v-model="form.orderNum"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit"
          >提交</el-button
        >
        <el-button v-if="!edit" @click="resetForm">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
interface Data {
  parentMenuList: []
  menuInfo: {
    name: string
    href: string
    parentId: number
    description: string
    icon: string
    shown: false
    orderNum: number
  }
}
import { defineComponent } from 'vue'
import {
  getEditMenuInfo,
  saveOrUpdate
} from '@/services/menu'
import { ElForm } from 'element-plus'
export default defineComponent({
  name: 'CreateOrEdit',
  props: {
    edit: Boolean
  },
  data: () => ({
    parentMenuList: [],
    form: {
      name: '',
      href: '',
      parentId: -1,
      description: '',
      icon: '',
      shown: false,
      orderNum: 0
    },
    rules: {
      name: [
        {
          required: true,
          message: '请输入菜单名称',
          trigger: 'blur'
        }
      ],
      href: [
        {
          required: true,
          message: '请输入菜单路径',
          trigger: 'blur'
        }
      ]
    },
    data: {}
  }),
  methods: {
    onSubmit() {
      ;(this.$refs.form as typeof ElForm).validate(
        (valid: boolean) => {
          if (valid) {
            saveOrUpdate(this.form).then(() => {
              this.$message.success(
                this.edit ? '修改成功' : '添加成功'
              )
              this.$router.go(-1)
            })
          }
        }
      )
    },
    resetForm() {
      console.log(this.$refs.form as typeof ElForm)
      ;(this.$refs.form as typeof ElForm).resetFields()
    }
  },
  async created() {
    const { id } = this.$route.params
    const {
      parentMenuList,
      menuInfo: form
    } = ((await getEditMenuInfo(
      (id as string) || '-1'
    )) as unknown) as Data
    this.parentMenuList = parentMenuList
    form && (this.form = form)
  }
})
</script>
