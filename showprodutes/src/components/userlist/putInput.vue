<template>
  <el-dialog title="新增用户" :visible.sync="formVisible" width="40%">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" :label-width="formLabelWidth">
        <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false">取 消</el-button>
      <el-button type="primary" @click="putUser(putData.id)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      formLabelWidth: '90px',
      form: {
        username: '',
        email: '',
        mobile: ''
      },

      formVisible: false
    }
  },
  methods: {
    // 修改用户数据功能
    putUser (id) {
      this.$http({
        mounted: 'put',
        url: 'http://localhost:8888/api/private/v1/users/' + id,
        data: this.form,
        headers: {
          Authorization: window.localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
      })
    }
  },
  props: ['isshow', 'putData']
}
</script>

<style>
</style>
