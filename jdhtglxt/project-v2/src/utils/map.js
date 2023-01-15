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
    {
      //配置地图相关参数,绘制地图,这个对象是关于地图图表的相关设置
      type: "map",
      label: {
        normal: {
          show: true,
          textStyle: {
            color: "#1de986",
          },
        },
        emphasis: {
          textStyle: {
            color: "rgb(183,185,14)",
          },
        },
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
          shadowColor: "rgb(58,115,192)",
          shadowOffsetX: 10,
          shadowOffsetY: 10,
        },
        emphasis: {
          areaColor: "rgb(46,229,206)",
          borderWidth: 0.1,
        },
      },
    },
  ],
};
export default option;
