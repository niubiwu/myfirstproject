<template>
  <el-card>
    <!-- 面包导航组件 -->
    <breadcrumb oneName="数据统计" twoName="数据报表"></breadcrumb>
  </el-card>
</template>

<script>
import breadcrumb from "../layout/breadcrumb";
export default {
  components: {
    breadcrumb: breadcrumb
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
