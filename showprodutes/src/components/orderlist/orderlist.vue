<template>
  <el-card class="userlist">
    <!-- 面包屑导航 -->
    <breadcrumb oneName="订单管理" twoName="订单列表"></breadcrumb>
    <!-- 订单数据表格 -->
    <el-table :data="ordersData" stripe border style="width: 100%;margin-top:15px">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="order_number" label="订单编号"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="90"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款" width="100">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.pay_status==='0'">未付款</el-tag>
          <el-tag type="success" v-if="scope.row.pay_status==='1'">已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">{{scope.row.create_time|myfilter}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini" plain type="primary" icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分功能栏 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-sizes="[1, 2, 3, 4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100]"
      :page-size="reqData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </el-card>
</template>

<script>
// 导入面包屑组件
import breadcrumb from "../layout/breadcrumb";
// 导入时间组件
import moment from "moment";
export default {
  components: {
    breadcrumb: breadcrumb
  },
  data() {
    return {
      ordersData: [],
      // 请求参数
      reqData: {
        query: "",
        pagenum: 1,
        pagesize: 10,
        is_sent: ""
      },
      total: 10
    };
  },
  filters: {
    myfilter: function(val) {
      let date = moment(val).format("YYYY-MM-DD hh:mm:ss");
      return date;
    }
  },
  methods: {
    getOrdersData() {
      this.$http({
        method: "get",
        url: `orders?query=${this.reqData.query}&pagenum=${
          this.reqData.pagenum
        }&pagesize=${this.reqData.pagesize}`
      }).then(res => {
        const { data, meta } = res.data;
        if (meta.status === 200) {
          if (data.goods.length === 0 && data.pagenum !== 1) {
            this.reqData.pagenum--;
            this.getOrdersData();
            return;
          }
          this.ordersData = data.goods;
          this.total = data.total;
        }
      });
    },
    // 页码翻页功能
    currentChange(currentPage) {
      this.reqData.pagenum = currentPage;
      this.getOrdersData();
    },
    // 自定义页容量功能
    sizeChange(pageSize) {
      this.reqData.pagesize = pageSize;
      this.getOrdersData();
    }
  },
  mounted() {
    this.getOrdersData();
  }
};
</script>

<style>
</style>
