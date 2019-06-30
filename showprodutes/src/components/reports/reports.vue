<template>
  <el-card>
    <!-- 面包导航组件 -->
    <breadcrumb oneName="数据统计" twoName="数据报表"></breadcrumb>
    <div id="main"></div>
  </el-card>
</template>

<script>
import breadcrumb from "../layout/breadcrumb";
// 引入echart模块
import Echarts from "echarts";
// 基于准备好的dom，初始化echarts实例
export default {
  components: {
    breadcrumb: breadcrumb
  },
  mounted() {
    var myChart = Echarts.init(document.getElementById("main"));
    this.$http({
      method: "get",
      url: "reports/type/1"
    }).then(res => {
      console.log(res.data.data);
      res.data.data.xAxis[0].boundaryGap = false;
      var Option = res.data.data;
      myChart.setOption(Option);
    });
  }
};
</script>

<style>
#main {
  width: 60%;
  height: 400px;
}
#mymap {
  width: 100%;
  height: 600px;
}
</style>
