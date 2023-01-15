<template>
  <div class="travelMap">
    <div id="main"></div>
  </div>
</template>

<script setup>
import geoJson from "@/assets/data.json";
import { travel } from "@/api/api";
import map from "@/utils/map";
import { onMounted } from "vue";

const drawMap = function (points, linesData)  {
  let myChart = this.$echarts.init(document.getElementById("main"));
  //注册可用的地图，必须包括geo组件或者map图表类型的时候才可以使用
  this.$echarts.registerMap("china", geoJson);
  let pointsObj = {
    type: "effectScatter", //散点图
    coordinateSystem: "geo",
    showEffectOn: "render",
    symbolSize: 10, //三点大小
    zlevel: 1,
    data: points,
    //涟漪图相关配置
    rippleEffect: {
      period: 15,
      scale: 4,
      brushType: "fill",
    },
  };
  let linesObj = {
    type: "lines",
    zlevel: 2,
    effect: {
      show: true,
      period: 4,
      symbol: "arrow",
      symbolSize: 7,
      trailLength: 0.4,
    },
    lineStyle: {
      normal: {
        color: "#1de9b6",
        width: 1,
        opacity: 0.1,
        curveness: 0.6,
      },
    },
    data: linesData,
  };
  map.series[1] = pointsObj
  map.series[2] = linesObj
  let option = map
  myChart.setOption(option);
};
onMounted(()=>{
  travel().then((res) => {
    if (res.data.status === 200) {
      let { points, linesData } = res.data.data;
      drawMap(points, linesData);
    }
  });
})

</script>

<style lang="less" scoped>
.travelMap {
  width: 100%;

  #main {
    width: 100%;
    height: 600px;
  }
}
</style>
