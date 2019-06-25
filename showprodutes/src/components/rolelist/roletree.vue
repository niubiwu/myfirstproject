<template>
  <el-card class="rolelist">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:15px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="dialogFormVisible = true">添加角色</el-button>
    <el-table :data="tableData" style="width: 100%;margin-top:15px;">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item,index) in scope.row.children" :key="index">
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-tag closable @close="removePower(scope.row.id,item.id,scope)">{{item.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </div>
            </el-col>
            <el-col :span="4">
              <div
                class="grid-content bg-purple-light"
                v-for="(tag,each) in scope.row.children[index].children"
                :key="each"
              >
                <el-tag
                  closable
                  type="success"
                  @close="removePower(scope.row.id,tag.id,scope)"
                >{{tag.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </div>
            </el-col>
            <el-col :span="16">
              <div
                class="grid-content bg-purple"
                v-for="(tag,each) in scope.row.children[index].children"
                :key="each"
              >
                <el-tag
                  closable
                  type="warning"
                  v-for="(list,num) in scope.row.children[index].children[each].children"
                  :key="num"
                  @close="removePower(scope.row.id,list.id,scope)"
                >{{list.authName}}</el-tag>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit"></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            @click="deleteRole(scope.row.id)"
          ></el-button>
          <el-button
            size="mini"
            plain
            type="warning"
            icon="el-icon-check"
            @click="openRoleData(scope.row.id,scope.row.children)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增弹框按钮 -->
    <el-dialog title="新增角色" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="formData" :rules="rules" ref="formData">
        <el-form-item label="角色名称" :label-width="formLabelWidth" prop="roleName">
          <el-input v-model="formData.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" :label-width="formLabelWidth" prop="roleDesc">
          <el-input v-model="formData.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole('formData')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 角色分配权限弹框 -->
    <el-dialog title="分配角色" :visible.sync="dialogVisible" width="40%" @close="roleNodes=[]">
      <el-tree
        :data="powerData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-expand-all="true"
        :default-checked-keys="roleNodes"
        ref="tree"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotPower(roleId)" v-model="roleId">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      formData: {
        roleName: "",
        roleDesc: ""
      },
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "角色描述不能为空", trigger: "blur" }
        ]
      },
      // 树状图数据源
      powerData: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      roleNodes: [],
      dialogFormVisible: false,
      formLabelWidth: "90px",
      dialogVisible: false,
      roleId: 0
    };
  },
  methods: {
    // 获取角色权限数据
    getTreeData() {
      this.$http({
        method: "get",
        url: `http://localhost:8888/api/private/v1/roles`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);

        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.tableData = data;
        }
      });
    },
    // 增加角色
    addRole(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http({
            method: "post",
            url: `http://localhost:8888/api/private/v1/roles`,
            data: this.formData,
            headers: {
              Authorization: window.localStorage.getItem("token")
            }
          }).then(res => {
            const { meta } = res.data;
            if (meta.status === 201) {
              this.dialogFormVisible = false;
              this.getTreeData();
              this.$message({
                type: "success",
                message: meta.msg
              });
            } else {
              this.$message.error(meta.msg);
            }
          });
        } else {
          this.$refs[formName].resetFields();
        }
      });
    },
    // 移除角色权限操作
    removePower(roleId, powerId, scope) {
      this.$http({
        method: "delete",
        url: `http://localhost:8888/api/private/v1/roles/${roleId}/rights/${powerId}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        console.log(res);

        const { data, meta } = res.data;
        if (meta.status === 200) {
          scope.row.children = data;
          this.$message({
            type: "success",
            message: meta.msg
          });
        }
      });
    },
    // 渲染角色已经拥有的权限
    openRoleData(id, rloepower) {
      this.$http({
        method: "get",
        url: `http://localhost:8888/api/private/v1/rights/tree`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.powerData = data;
          rloepower.forEach(element => {
            element.children.forEach(item => {
              item.children.forEach(list => {
                this.roleNodes.push(list.id);
              });
            });
          });
        }
      });
      this.dialogVisible = true;
      this.roleId = id;
    },
    // 给角色分配权限功能
    allotPower(roleId) {
      //获取到被选中的数组，并将数组转化为用逗号隔开的字符串
      // let halfarr = this.$refs.tree.getHalfCheckedKeys();
      // let checkedarr = this.$refs.tree.getCheckedKeys(true);
      let nodearr = this.$refs.tree.getCheckedNodes(false, true);
      let checkedarr = [];
      nodearr.forEach(item => {
        checkedarr.push(item.id);
      });
      // console.log(checkedarr);
      // let newStr = halfarr.concat(checkedarr).join(",");
      // console.log(newStr);
      let newStr = checkedarr.join(",");
      this.$http({
        method: "post",
        url: `http://localhost:8888/api/private/v1/roles/${roleId}/rights`,
        data: {
          rids: newStr
        },
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        const { meta } = res.data;
        if (meta.status === 200) {
          this.getTreeData();
          this.$message({
            type: "success",
            message: meta.msg
          });
          checkedarr = [];
        }
      });
      this.dialogVisible = false;
    },
    // 删除角色
    deleteRole(id) {
      this.$confirm("此操作将删除当前角色, 是否继续?", "删除角色提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          method: "delete",
          url: "http://localhost:8888/api/private/v1/roles/" + id,
          headers: {
            Authorization: window.localStorage.getItem("token")
          }
        }).then(res => {
          console.log(res);
          const meta = res.data.meta;
          if (meta.status === 200) {
            this.getTreeData();
            this.$message({
              type: "success",
              message: meta.msg
            });
          }
        });
      });
    }
  },
  mounted() {
    this.getTreeData();
  }
};
</script>

<style>
.el-tag {
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 5px;
}
.el-row {
  margin-bottom: 10px;
}
</style>
