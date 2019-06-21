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
      <el-table-column prop="username" label="姓名" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态" width="80">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" plain type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete"></el-button>
          <el-button size="mini" plain type="warning" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分功能栏 -->
    <el-pagination
      :page-sizes="pagesizes"
      :page-size="reqdata.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          username: "",
          email: "",
          mobile: ""
        }
      ],
      reqdata: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      pagesizes: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100
      ]
    };
  },
  methods: {
    userData() {
      this.$http({
        method: "get",
        url: `http://localhost:8888/api/private/v1/users?query=${
          this.reqdata.query
        }&pagenum=${this.reqdata.pagenum}&pagesize=${this.reqdata.pagesize}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);

        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.tableData = data.users;
          this.total = data.total;
        }
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
