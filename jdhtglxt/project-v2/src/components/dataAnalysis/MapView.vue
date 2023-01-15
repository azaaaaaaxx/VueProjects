<template>
  <div class="mapView">
    <div id="main"></div>
  </div>
</template>

<script setup>
import geoJson from "@/assets/data.json";
import map from "@/utils/map";
import {onMounted} from "vue";

onMounted(()=>{
  let myChart = this.$echarts.init(document.getElementById("main"));
  //注册可用的地图，必须包括geo组件或者map图表类型的时候才可以使用
  this.$echarts.registerMap("china", geoJson);
  let option = map
  myChart.setOption(option);
})



</script>

<style lang="less" scoped>
.mapView {
  width: 100%;
  #main {
    width: 100%;
    height: 600px;
  }
}
</style>
