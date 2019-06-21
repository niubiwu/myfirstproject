<template>
  <el-row>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <h1>
          <img src="../../assets/logo.png">
        </h1>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="grid-content bg-purple-light">
        <h2>黑马电商后台管理系统</h2>
      </div>
    </el-col>
    <el-col :span="4">
      <div class="grid-content bg-purple">
        <a href="#" @click.prevent="goLogin">退出</a>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    // 登录退出功能
    // 回到登录界面需要一个提示框
    goLogin () {
      this.$confirm('此操作将会回到登录界面， 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('token')
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      })
    }
  }
}
</script>

<style>
</style>
