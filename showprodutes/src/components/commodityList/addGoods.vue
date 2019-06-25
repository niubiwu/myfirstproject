<template>
  <el-card>
    <!-- breadcrumb导航 -->
    <breadcrumb oneName="商品管理" twoName="商品列表"></breadcrumb>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-tabs tab-position="left" style="height: 200px;" @tab-click="tabClick">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
    <!-- 新增弹框按钮 -->
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
      active: 0
    };
  },
  methods: {
    tabClick() {}
  }
};
</script>

<style>
</style>
