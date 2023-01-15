<template>
  <div class="travelMap">
    <div id="main"></div>
  </div>
</template>

<script>
import geoJson from "@/assets/data.json";
import {travel} from "@/api/api";

export default {
  data() {
    return {};
  },
  created() {
    travel().then(res=>{
      if (res.data.status === 200){
        let {points,linesData} = res.data.data
        this.draw(points,linesData)
      }
    })
  },
 methods:{
    draw(points,linesData){
      let myChart = this.$echarts.init(document.getElementById("main"));
      //注册可用的地图，必须包括geo组件或者map图表类型的时候才可以使用
      this.$echarts.registerMap("china", geoJson);
      let option = {
        backgroundColor: "rgb(121,145,209)",
        geo: {
          map: "china",
          //地图长宽比
          aspectScale: 0.75,
          zoom: 1.1,
          itemStyle: {
            normal: {
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "#09132c",
                  },
                  {
                    offset: 1,
                    color: "#274d68",
                  },
                ],
                globalCoord: true,
              },
            },
          },
          regions: [
            {
              name: "南海诸岛",
            },
          ],
        },
        series: [
          //配置地图相关参数,绘制地图,这个对象是关于地图图表的相关设置
          {
            type: "map",
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#1de986'
                }
              },
              emphasis: {
                textStyle: {
                  color: 'rgb(183,185,14)'
                }
              }
            },
            zoom: 1.1,
            map: "china",
            itemStyle: {
              normal: {
                backgroundColor: "rgb(147,235,248)",
                borderWidth: 1,
                areaColor: {
                  type: "radial",
                  x: 0.5,
                  y: 0.5,
                  r: 0.8,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgb(31,54,150)",
                    },
                    {
                      offset: 1,
                      color: "rgb(89,128,142)",
                    },
                  ],
                  globalCoord: true,
                },
                shadowColor: 'rgb(58,115,192)',
                shadowOffsetX: 10,
                shadowOffsetY: 10,
              },
              emphasis: {
                areaColor: 'rgb(46,229,206)',
                borderWidth: 0.1
              }
            },
          },
          //关于地图中散点图的配置
          {
            type:'effectScatter',//散点图
            coordinateSystem:'geo',
            showEffectOn:'render',
            symbolSize:10, //三点大小
            zlevel:1,
            data:points,
            //涟漪图相关配置
            rippleEffect:{
              period:15,
              scale:4,
              brushType:'fill'
            }
          },
          //关于地图中线路动画效果设置
          {
            type:'lines',
            zlevel: 2,
            effect:{
              show:true,
              period:4,
              symbol:'arrow',
              symbolSize:7,
              trailLength:0.4
            },
            lineStyle:{
              normal:{
                color:'#1de9b6',
                width:1,
                opacity:0.1,
                curveness:0.6
              }
            },
            data:linesData
          }
        ],
      };
      myChart.setOption(option);
    }
  }
}
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
