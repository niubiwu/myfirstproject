<template>
  <el-card class="userlist">
    <!-- 面包屑导航 -->
    <breadcrumb oneName="用户管理" twoName="用户列表"></breadcrumb>
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
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="putStatus(scope.row.id,scope.row.mg_state)"
          ></el-switch>
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
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model.number="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户信息 -->
    <el-dialog title="修改用户" :visible.sync="formVisible" width="40%">
      <el-form :model="putdata" :rules="rules" ref="putdata">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="putdata.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="putdata.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model.number="putdata.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="putUser(putdata.id,'putdata')">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 修改权限列表 -->
    <el-dialog title="分配角色" :visible.sync="footFormVisible" width="40%">
      <el-form :model="putdata">
        <el-form-item label="当前用户" :label-width="formLabelWidth">{{putdata.username}}</el-form-item>
        <el-form-item label="请选择角色" :label-width="formLabelWidth">
          <el-select v-model="putdata.rid" placeholder="请选择角色">
            <el-option label="请选择角色" :value="-1"></el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
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
// 导入面包屑组件
import breadcrumb from "../layout/breadcrumb";
export default {
  components: {
    breadcrumb: breadcrumb
  },
  data() {
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        mobile: [
          {
            required: false,
            type: "number",
            message: "电话号码必须为数字",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: false,
            message: "请输入正确的邮箱地址",
            type: "email",
            trigger: "blur"
          }
        ]
      },
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
      footFormVisible: false,
      rolelist: []
    };
  },
  methods: {
    // 更新列表请求
    userData() {
      this.$http({
        method: "get",
        url: `users?query=${this.reqdata.query}&pagenum=${
          this.reqdata.pagenum
        }&pagesize=${this.reqdata.pagesize}`
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          if (data.users.length === 0 && data.pagenum !== 1) {
            this.reqdata.pagenum--;
            this.userData();
            return;
          }
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
    addUser(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "users/",
            data: this.form
          }).then(res => {
            const { meta } = res.data;
            if (meta.status === 201) {
              this.userData();
              this.dialogFormVisible = false;
              this.$message({
                type: "success",
                message: meta.msg
              });
            }
          });
        } else {
          this.$refs[form].resetFields();
        }
      });
    },
    // 删除用户信息功能
    deleteUser(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          method: "delete",
          url: "users/" + id,
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        }).then(res => {
          console.log(res);
          const meta = res.data.meta;
          if (meta.status === 200) {
            this.userData();
            this.$message({
              type: "success",
              message: meta.msg
            });
          }
        });
      });
    },
    // 打开弹窗获得数据
    getUser(id) {
      this.$http({
        method: "get",
        url: "users/" + id
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
    putUser(id, form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.$http({
            method: "put",
            url: "users/" + id,
            data: this.putdata
          }).then(res => {
            const { meta } = res.data;
            if (meta.status === 200) {
              this.formVisible = false;
              this.userData();
              this.$message({
                type: "success",
                message: meta.msg
              });
            }
          });
        } else {
          this.$refs[form].resetFields();
        }
      });
    },
    // 获得数据功能
    getUserFn(id) {
      this.$http({
        method: "get",
        url: "users/" + id
      }).then(res => {
        console.log(res);

        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.footFormVisible = true;
          this.putdata = data;
          this.id = data.id;
          // 动态获取角色功能
          this.$http({
            method: "get",
            url: `roles`
          }).then(res => {
            console.log(res);

            const { data, meta } = res.data;
            if (meta.status === 200) {
              this.rolelist = data;
            }
          });
        }
      });
    },

    // 修改权限功能
    putRoot(id) {
      this.$http({
        method: "put",
        url: "users/" + id + "/role",
        data: {
          rid: this.putdata.rid
        }
      }).then(res => {
        console.log(res);
        const { meta } = res.data;
        if (meta.status === 200) {
          this.footFormVisible = false;
          this.$message({
            type: "success",
            message: meta.msg
          });
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    // 状态显示功能
    putStatus(id, type) {
      this.$http({
        method: "put",
        url: `users/${id}/state/${type}`
      }).then(res => {
        const { meta } = res.data;
        if (meta.status === 200) {
          this.$message({
            type: "success",
            message: meta.msg
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
