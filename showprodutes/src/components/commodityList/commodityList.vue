<template>
  <el-card class="userlist">
    <!-- 面包屑导航 -->
    <breadcrumb oneName="商品管理" twoName="商品列表"></breadcrumb>
    <!-- 搜索框与新增按钮 -->
    <el-row style="margin-top:15px;margin-bottom:15px;">
      <el-col :span="6">
        <el-input
          :span="6"
          placeholder="请输入内容"
          class="input-with-select el-col"
          v-model="reqData.query"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
        </el-input>
      </el-col>

      <el-col :span="2">
        <el-button type="success" plain @click="addGood">新增用户</el-button>
      </el-col>
    </el-row>
    <!-- 用户数据表格 -->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="120"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>
      <el-table-column prop="add_time" label="创建时间" width="200">
        <template slot-scope="scope">{{scope.row.add_time|wefilter}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit"></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            @click="deleteGoods(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分功能栏 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[1, 2, 3, 4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 修改用户信息 -->

    <!-- 修改权限列表 -->
  </el-card>
</template>

<script>
// 导入面包屑组件
import breadcrumb from "../layout/breadcrumb";
import moment from "moment";
export default {
  components: {
    breadcrumb: breadcrumb
  },
  data() {
    return {
      tableData: [],
      reqData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      total: 0
    };
  },
  filters: {
    wefilter: function(val) {
      let date = moment(val).format("YYYY-MM-DD hh:mm:ss");
      return date;
    }
  },
  methods: {
    // 获取商品列表数据
    getGoodsData() {
      this.$http({
        method: "get",
        url: `http://localhost:8888/api/private/v1/goods?query=${
          this.reqData.query
        }&pagenum=${this.reqData.pagenum}&pagesize=${this.reqData.pagesize}`,
        headers: {
          Authorization: window.localStorage.getItem("token")
        }
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          if (data.goods.length === 0 && data.pagenum !== 1) {
            this.pagenum--;
            this.getGoodsData();
            return;
          }
          this.tableData = data.goods;
          this.total = data.total;
        }
      });
    },
    // 调整页码显示的数量
    handleSizeChange(pageSize) {
      this.reqData.pagesize = pageSize;
      this.getGoodsData();
    },
    // 改变页面的页码改变内容
    handleCurrentChange(current) {
      this.reqData.pagenum = current;
      this.getGoodsData();
    },
    // 关键字搜索商品
    searchGoods() {
      this.getGoodsData();
    },
    // 新增列表
    addGood() {
      this.$router.push({ name: "addgoods" });
    },
    // 删除商品数据
    deleteGoods(id) {
      this.$confirm("此操作将删除该商品信息, 是否继续?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          method: "delete",
          url: "goods/" + id
        }).then(res => {
          console.log(res);
          const meta = res.data.meta;
          if (meta.status === 200) {
            this.getGoodsData();
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
    this.getGoodsData();
  }
};
</script>

<style>
</style>
