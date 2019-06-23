<template>
  <el-card class="rolelist">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:15px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button>添加角色</el-button>
    <el-table :data="tableData" style="width: 100%;margin-top:15px;" :default-expand-all="true">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="(item,index) in scope.row.children" :key="index">
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-tag closable>{{item.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </div>
            </el-col>
            <el-col :span="4">
              <div
                class="grid-content bg-purple-light"
                v-for="(tag,each) in scope.row.children[index].children"
                :key="each"
              >
                <el-tag closable type="success">{{tag.authName}}</el-tag>
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
        <template>
          <el-button size="mini" plain type="primary" icon="el-icon-edit"></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete"></el-button>
          <el-button size="mini" plain type="warning" icon="el-icon-check"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>


<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
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
