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
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            @click="getUser(scope.row.id)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            @click="deleteUser(scope.row.id)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="warning"
            icon="el-icon-check"
            @click="getUserFn(scope.row.id)"
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
          <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
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
    <!-- 修改用户信息 -->
    <el-dialog title="新增用户" :visible.sync="formVisible" width="40%">
      <el-form :model="putdata">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="putdata.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="putdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="putdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="putUser(putdata.id)">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 修改权限列表 -->
    <el-dialog title="新增用户" :visible.sync="footFormVisible" width="40%">
      <el-form :model="putdata">
        <el-form-item label="当前用户" :label-width="formLabelWidth">{{putdata.username}}</el-form-item>
        <el-form-item label="请选择角色" :label-width="formLabelWidth">
          <el-select v-model="putdata.rold_name" placeholder="请选择角色">
            <el-option label="主管" value="zhuhuan"></el-option>
            <el-option label="测试角色" value="ceshi1"></el-option>
            <el-option label="测试角色2" value="ceshi2"></el-option>
            <el-option label="超级管理员" value="shperadmin"></el-option>
            <el-option label="test" value="test"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="footFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="putRoot(putdata.id)">修 改</el-button>
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
      putdata: {
        username: "",
        email: "",
        mobile: ""
      },
      total: 0,
      dialogFormVisible: false,
      formLabelWidth: "90px",
      formVisible: false,
      footFormVisible: false
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
    // 新增用户功能
    addUser() {
      this.$http({
        method: "post",
        url: "http://localhost:8888/api/private/v1/users/",
        data: this.form,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        const { meta } = res.data;
        if (meta.status === 201) {
          this.userData();
          this.dialogFormVisible = false;
          this.$message({
            type: "success",
            message: "创建成功!"
          });
        }
      });
    },
    // 删除用户信息功能
    deleteUser(id) {
      this.$http({
        method: "delete",
        url: "http://localhost:8888/api/private/v1/users/" + id,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        const meta = res.data.meta;
        if (meta.status === 200) {
          this.userData();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        }
      });
    },
    // 打开弹窗获得数据
    getUser(id) {
      this.$http({
        method: "get",
        url: "http://localhost:8888/api/private/v1/users/" + id,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);

        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.formVisible = true;
          this.putdata = data;
          this.id = data.id;
        }
      });
    },
    // 修改用户数据功能
    putUser(id) {
      this.$http({
        method: "put",
        url: "http://localhost:8888/api/private/v1/users/" + id,
        data: this.putdata,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        const { meta } = res.data;
        if (meta.status === 200) {
          this.formVisible = false;
          this.userData();
          this.$message({
            type: "success",
            message: "修改成功！"
          });
        }
      });
    },
    // 获得数据功能
    getUserFn(id) {
      this.$http({
        method: "get",
        url: "http://localhost:8888/api/private/v1/users/" + id,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);

        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.footFormVisible = true;
          this.putdata = data;
          this.id = data.id;
        }
      });
    },
    // 修改权限功能
    putRoot(id) {
      this.$http({
        method: "put",
        url: "http://localhost:8888/api/private/v1/users/" + id,
        data: {
          rid: this.putdata.rold_name
        },
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
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
