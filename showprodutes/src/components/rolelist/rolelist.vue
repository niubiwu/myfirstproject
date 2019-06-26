<template>
  <el-card class="rolelist">
    <!-- 面包屑导航 -->
    <breadcrumb oneName="权限管理" twoName="权限列表"></breadcrumb>
    <el-table :data="roleData" border style="width:640px;margin-top:15px">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="150"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="level" label="层级" :formatter="formatter"></el-table-column>
    </el-table>
  </el-card>
</template>

<script>
// 导入面包屑组件
import breadcrumb from "../layout/breadcrumb";
export default {
  components: {
    breadcrumb: breadcrumb
  },
  data() {
    return {
      roleData: []
    };
  },
  methods: {
    getRolesData() {
      this.$http({
        method: "get",
        url: `rights/list`
      }).then(res => {
        console.log(res);

        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.roleData = data;
        }
      });
    },
    formatter(row) {
      switch (row.level) {
        case "0":
          row.level = "一级";
          break;
        case "1":
          row.level = "二级";
          break;
        case "2":
          row.level = "三级";
          break;
      }
      return row.level;
    }
  },
  mounted() {
    this.getRolesData();
  }
};
</script>

<style>
</style>
