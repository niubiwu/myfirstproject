<template>
  <el-card class="userlist">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框与新增按钮 -->
    <el-row style="margin-top:15px;margin-bottom:15px;">
      <el-col :span="6">
        <el-input :span="6" placeholder="请输入内容" class="input-with-select el-col">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>

      <el-col :span="2">
        <el-button type="success" plain>新增用户</el-button>
      </el-col>
    </el-row>
    <!-- 用户数据表格 -->
    <el-table :data="tableData" border style="width:1070px;">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="phones" label="电话"></el-table-column>
      <el-table-column prop="user" label="用户状态" width="80">
        <el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </el-table-column>
      <el-table-column prop="zip" label="操作">
        <el-button size="mini" plain type="primary" icon="el-icon-edit"></el-button>
        <el-button size="mini" plain type="danger" icon="el-icon-delete"></el-button>
        <el-button size="mini" plain type="warning" icon="el-icon-check"></el-button>
      </el-table-column>
    </el-table>
    <!-- 分功能栏 -->
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "admin",
          email: "2352343fdsgfs",
          phones: "1546415618964"
        }
      ],
      reqdata: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      Authorization: ""
    };
  },
  methods: {
    userData() {
      var token = window.localStorage.getItem("token");
      this.Authorization = token;
      this.$http({
        method: "get",
        url: "http://localhost:8888/api/private/v1/user",
        data: this.reqdata,
        header: this.Authorization
      }).then(res => {
        console.log(res);
      });
    }
  },
  mounted() {
    this.userData();
  }
};
</script>

<style>
</style>
