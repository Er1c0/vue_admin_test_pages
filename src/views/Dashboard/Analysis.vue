<template>
  <div>
    <Chart :option="chartOption" style="height:300px"></Chart>
  </div>
</template>

<script>
import request from "../../utils/request";
import Chart from "../../components/Charts.vue";
export default {
  data() {
    return {
      chartOption: {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [20, 40, 78, 10, 76, 48],
          },
        ],
      },
    };
  },
  mounted() {
    // this.getChartData();
    // this.interval = setInterval(() => {
    //   this.getChartData();
    //   // // 重新更新 chartOption
    //   // this.chartOption = { ...this.chartOption };
    // }, 3000);
  },
  methods: {
    getChartData() {
      this.chartOption = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [20, 40, 78, 10, 76, 48],
          },
        ],
      };

      // request({
      //   url: "/api/dashboard/chart",
      //   methods: "get",
      //   params: { ID: 12345 }
      // }).then(response => {
      //   this.chartOption = {
      //     title: {
      //       text: "ECharts 入门示例"
      //     },
      //     tooltip: {},
      //     legend: {
      //       data: ["销量"]
      //     },
      //     xAxis: {
      //       data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      //     },
      //     yAxis: {},
      //     series: [
      //       {
      //         name: "销量",
      //         type: "bar",
      //         data: response.data
      //       }
      //     ]
      //   };
      // });
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    Chart,
  },
};
</script>

<style></style>
