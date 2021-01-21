<template>
  <div class="login-container">
    <el-form
      ref="formRef"
      :model="model"
      :rules="rules"
      label-position="top"
      label-width="100px"
      status-icon
    >
      <el-form-item label="Phone" prop="phone">
        <el-input
          placeholder="Plaase input phone"
          v-model="model.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          show-password
          placeholder="Plaase input password"
          v-model="model.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="submitLoading"
          type="primary"
          @click="handleSubmit"
          autocomplete="off"
        >
          Login
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'login',
  data() {
    const checkPhone = (
      rule: object,
      value: string,
      callback: Function
    ) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      if (!value.match(/^[0-9]{11}$/)) {
        callback(new Error('请输入正确手机号'))
      } else {
        callback()
      }
    }
    const checkPassword = (
      rule: object,
      value: string,
      callback: Function
    ) => {
      if (value === '' || value.length < 6) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }

    return {
      model: {
        password: '111111',
        phone: '15510792995'
      },
      rules: {
        password: [
          {
            required: true,
            validator: checkPassword,
            trigger: ['change', 'blur']
          }
        ],
        phone: [
          {
            required: true,
            validator: checkPhone,
            trigger: ['change', 'blur']
          }
        ]
      },
      submitLoading: false
    }
  },
  methods: {
    handleSubmit() {
      console.log('hi')
    }
  }
})
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    min-width: 300px;
  }

  .el-button {
    width: 100%;
  }
}
</style>
