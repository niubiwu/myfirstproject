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
        <el-input
          :span="6"
          placeholder="请输入内容"
          class="input-with-select el-col"
          v-model="reqdata.query"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
        </el-input>
      </el-col>

      <el-col :span="2">
        <el-button type="success" plain @click="dialogFormVisible = true">新增用户</el-button>
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
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" v-model="scope.row.id"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" v-model="scope.row.id"></el-button>
          <el-button
            size="mini"
            plain
            type="warning"
            icon="el-icon-check"
            v-model="scope.row.role_name"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分功能栏 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-sizes="[1, 2, 3, 4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100]"
      :page-size="reqdata.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增弹框按钮 -->
    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
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
      dialogFormVisible: false,
      formLabelWidth: "90px"
    };
  },
  methods: {
    // 更新列表请求
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
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.tableData = data.users;
          this.total = data.total;
        }
      });
    },
    // 搜索功能完成
    searchUsers() {
      this.userData();
    },
    // 页码翻页功能
    currentChange(currentPage) {
      this.reqdata.pagenum = currentPage;
      this.userData();
    },
    // 自定义页容量功能
    sizeChange(pageSize) {
      this.reqdata.pagesize = pageSize;
      this.userData();
    },
    //新增用户功能
    addUser() {
      this.$http({
        method: "post",
        url: "http://localhost:8888/api/private/v1/users",
        data: this.form,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 201) {
          this.userData();
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "创建成功!"
          });
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
