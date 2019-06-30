<template>
  <div id="mymap"></div>
</template>

<script>
// 引入地图模块
import BMap from "BMap";
export default {
  mounted() {
    var map = new BMap.Map("mymap");
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("北京");
    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 14);
    var driving = new BMap.DrivingRoute(map, {
      renderOptions: {
        map: map,
        autoViewport: true
      }
    });
    var start = new BMap.Point(116.310791, 40.003419);
    var end = new BMap.Point(116.486419, 39.877282);
    driving.search(start, end);
  }
};
</script>

<style>
#mymap {
  width: 100%;
  height: 600px;
}
</style>
