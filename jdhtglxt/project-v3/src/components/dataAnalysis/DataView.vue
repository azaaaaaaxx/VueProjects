<template>
  <div class="data-view">
    <el-card>
      <div id="main1"></div>
    </el-card>
    <el-card>
      <div id="main2"></div>
    </el-card>
  </div>
</template>
<script setup>
import echarts from 'echarts'

  let draw = (legend,xAxis,series) => {
  let myChart1 = echarts.init(document.getElementById('main2'))
  let option = {
    title:{
      text: '会话量'
    },
    tooltip:{
      trigger:'axis'
    },
    legend:{
      data:legend
    },
    xAxis:{
      type:'category',
      data:xAxis
    },
    yAxis:{
      type:'value'
    },
    series:series
  }
  myChart1.setOption(option)
}
dataView().then(res=>{
  if (res.data.status === 200){
    let {legend,xAxis,series} = res.data.data
    draw(legend,xAxis,series)
  }
}).catch(err=>{
  throw err
})
</script>
<script>
import {dataView} from "@/api/api";
export default {
  mounted() {
    let myChart = echarts.init(document.getElementById('main1'))
    myChart.setOption({
      title:{
        text:'大佬进阶班'
      },
      tooltip:{},
      xAxis:{
        data:['一班','二班','三班','四班','五班','六班',]
      },
      yAxis:{},
      series:[{
        name:'人数',
        type:'bar',
        data:[45,42,46,48,52,47]
      }]
    })
  },
}
</script>

<style lang="less" >
.data-view{
  width: 100%;
  display: flex;
  justify-content: space-between;
  .el-card{
    width: 50%;
    #main1,#main2{
      height: 500px;
    }
  }
}
</style>
