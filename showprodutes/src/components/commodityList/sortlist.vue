<template>
  <el-card>
    <!-- 面包导航组件 -->
    <breadcrumb oneName="商品管理" twoName="商品分类"></breadcrumb>
    <!-- 添加按钮 -->
    <el-button type="success" style="margin-top:20px;" @click="getTwoData">添加分类</el-button>
    <!-- 表格区域 -->
    <template>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-tree-column
          file-icon="icon icon-file"
          folder-icon="icon icon-folder"
          prop="cat_name"
          treeKey="cat_id"
          parentKey="cat_pid"
          levelKey="cat_level"
          label="分类名称"
          width="300"
        ></el-table-tree-column>
        <el-table-column prop="cat_level" label="层级" width="150">
          <template
            slot-scope="scope"
          >{{scope.row.cat_level===0? "一级":scope.row.cat_level===1 ? "二级":"三级"}}</template>
        </el-table-column>
        <el-table-column prop="cat_deleted" label="是否有效" width="150">
          <template slot-scope="scope">{{scope.row.cat_deleted===false? "有效":"无效"}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" plain type="primary" icon="el-icon-edit"></el-button>
            <el-button
              size="mini"
              plain
              type="danger"
              icon="el-icon-delete"
              @click="deleteSort(scope.row.cat_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 分页栏 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 添加分类 -->
    <el-dialog title="添加商品分类" :visible.sync="dialogVisible" width="40%">
      <el-form :model="formData">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="formData.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        {{value}}
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-cascader
            v-model="value"
            :options="cascaderData"
            :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id',checkStrictly: true,children:'children' }"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSortData">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import breadcrumb from "../layout/breadcrumb";
export default {
  components: {
    breadcrumb: breadcrumb
  },
  data() {
    return {
      tableData: [],
      // 前端分页功能
      pagenum: 1,
      pagesize: 5,
      total: 10,
      // 节约性能保存一个变量
      srotData: [],
      dialogVisible: false,
      formLabelWidth: "80px",
      formData: {
        cat_pid: 0,
        cat_name: "",
        cat_level: 0
      },
      cascaderData: [],
      value: []
    };
  },
  methods: {
    getsortData() {
      this.$http({
        method: "get",
        url: "categories?type=3"
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.tableData = data;
          this.srotData = data;
          this.pagination();
        } else {
          this.$message.error(meta.msg);
        }
      });
    },
    pagination() {
      this.total = this.srotData.length;
      var a = (this.pagenum - 1) * this.pagesize;
      var b = this.pagenum * this.pagesize;
      this.tableData = this.srotData.slice(a, b);
    },
    sizeChange(pageSize) {
      this.pagesize = pageSize;
      this.pagination();
    },
    currentChange(pageNum) {
      this.pagenum = pageNum;
      this.pagination();
    },
    // 请求数据级联选择上
    getTwoData() {
      this.$http({
        method: "get",
        url: "categories?type=2"
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          this.cascaderData = data;
        } else {
          this.$message.error(meta.msg);
        }
      });
      this.dialogVisible = true;
    },
    addSortData() {
      let id = this.value.length === 0 ? 0 : this.value[this.value.length - 1];
      let level = this.value.length;
      console.log(id);

      this.$http({
        method: "post",
        url: "categories",
        data: {
          cat_pid: id,
          cat_name: this.formData.cat_name,
          cat_level: level
        }
      }).then(res => {
        console.log(res);

        const { meta } = res.data;
        if (meta.status === 201) {
          this.getsortData();
          this.$message({
            type: "success",
            message: meta.msg
          });
        } else {
          this.$message.error(meta.msg);
        }
      });
      this.dialogVisible = false;
    },
    // 删除分类
    deleteSort(id) {
      this.$confirm("此操作将删除此分类, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          method: "delete",
          url: "categories/" + id
        }).then(res => {
          console.log(res);
          const meta = res.data.meta;
          if (meta.status === 200) {
            this.getsortData();
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
    this.getsortData();
  }
};
</script>

<style>
</style>
