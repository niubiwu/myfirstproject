<template>
  <el-container>
    <!-- 导入header组件 -->
    <el-header>
      <Header></Header>
    </el-header>

    <el-container>
      <!-- 导入sidebar组件 -->
      <el-aside width="200px">
        <sideBar></sideBar>
      </el-aside>

      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入组件header
import Header from "../header/header";
// 引入组件header
import sideBar from "../sidebar/sidebar";
export default {
  components: {
    Header: Header,
    sideBar: sideBar
  },
  methods: {
    // 登录退出功能
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.el-header h1 {
  float: right;
}
.el-header a {
  color: rgb(255, 123, 0);
  float: right;
}
.el-header a:hover {
  color: #333;
  text-decoration: underline;
}
.el-aside {
  background-color: #fff;
  color: #333;
  height: 100%;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 100%;
  text-align: center;
  line-height: 160px;
}

.el-container {
  height: 100%;
}
</style>
