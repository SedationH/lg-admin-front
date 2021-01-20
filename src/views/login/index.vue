<template>
  <div class="login-container">
    <el-form label-position="top" label-width="100px">
      <el-form-item label="Phone">
        <el-input
          placeholder="Plaase input phone"
          v-model="formData.phone"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input
          show-password
          placeholder="Plaase input password"
          v-model="formData.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin"
          >Login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { login } from '@/services/user'

export default defineComponent({
  name: 'login',
  data: () => ({
    formData: {
      password: '111111',
      phone: '15510792995'
    }
  }),
  methods: {
    async handleLogin() {
      const { data } = await login(this.formData)
      if (data.state != 1 && data.state != 200) {
        this.$message({
          message: 'Fail Login',
          type: 'error'
        })
      } else {
        this.$message({
          message: 'Success Login',
          type: 'success'
        })
      }
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
