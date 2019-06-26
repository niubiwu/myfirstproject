<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:15px;">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{oneName}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{twoName}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  props: ["oneName", "twoName"]
};
</script>

<style>
</style>
