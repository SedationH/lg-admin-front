<template>
  <div class="header-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        homepage
      </el-breadcrumb-item>
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

    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          size="large"
          :src="
            (userInfo && userInfo.portrait) ||
              require('@/assets/images/default-avatar.png')
          "
        />
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            SedationH
          </el-dropdown-item>
          <el-dropdown-item @click="onExit">
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default defineComponent({
  computed: {
    ...mapGetters('user', ['userInfo', 'userLoginInfo'])
  },
  methods: {
    ...mapActions('user', ['getInfo']),
    ...mapMutations('user', ['setUserLoginInfo']),
    onExit() {
      this.setUserLoginInfo(null)
      this.$router.push('/login')
    }
  },
  created() {
    this.getInfo()
    this.getInfo()
    this.getInfo()
  }
})
</script>

<style lang="scss" scoped>
.header-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30px;

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
