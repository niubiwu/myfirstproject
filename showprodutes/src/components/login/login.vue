<template>
  <div class="login">
    <div class="mybox">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :label-position="labelPosition"
        status-icon
        label-width="100px"
        class="demo-ruleForm"
      >
        <h2>用户登录</h2>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" auto-complete="off" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" auto-complete="off" v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click.prevent="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 18, message: "长度在 3 到 18 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: "http://localhost:8888/api/private/v1/login",
            data: this.ruleForm
          }).then(res => {
            console.log(res);
            const { meta, data } = res.data;
            if (meta.status === 200) {
              this.$router.push("/");
              window.localStorage.setItem("token", data.token);
              this.$message({
                message: "欢迎来到黑马电商管理平台",
                type: "success"
              });
            } else {
              this.$message.error("错了哦,您输入的用户名或密码有误");
            }
          });
        } else {
          this.$refs[formName].resetFields();
        }
      });
    }
  }
};
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  background-color: rgb(50, 65, 82);
  position: relative;
}
.mybox {
  width: 580px;
  height: 440px;
  padding: 40px;
  box-sizing: border-box;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}
.mybox .el-from {
  margin-left: 40px;
}
.mybox h2 {
  margin-bottom: 20px;
}
.mybox .el-from .el-form-item__label {
  display: block;
}
.mybox .el-button {
  width: 100%;
}
</style>
