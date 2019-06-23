<template>
  <el-card class="rolelist">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="roleData" border style="width:640px;margin-top:15px">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="150"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="层级" :formatter="formatter"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      roleData: []
    }
  },
  methods: {
    getRolesData () {
      this.$http({
        method: 'get',
        url: `http://localhost:8888/api/private/v1/rights/list`,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)

        const { data, meta } = res.data
        if (meta.status === 200) {
          this.roleData = data
        }
      })
    },
    formatter (row) {
      switch (row.level) {
        case '0':
          row.level = '一级'
          break
        case '1':
          row.level = '二级'
          break
        case '2':
          row.level = '三级'
          break
      }
      return row.level
    }
  },
  mounted () {
    this.getRolesData()
  }
}
</script>

<style>
</style>
