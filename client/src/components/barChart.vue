<template>
  <div>
    <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>
    
  </div>
</template>

<script>
import Highcharts from "highcharts";
import DataResource from '../connectFB';

export default {
  name: "barChart",
  data() {
    return {
       confirmedCases:Promise,
       currentStatus:Promise,
       dataArr:[{
                name: "维多利亚州",
                y: 5
              },
              {
                name: "新南威尔士州",
                y: 1029
              },
              {
                name: "塔斯马尼亚",
                y: 34
              },
              {
                name: "昆士兰州",
                y: 443
              },
              {
                name: "南澳大利亚",
                y: 197
              },
              {
                name: "西澳大利亚州",
                y: 205
              },
              {
                name: "北领地",
                y: 5
              },
              {
                name: "首都地区",
                y: 44
              }]
    };
  },
  props: [""],
  methods: {
    updateChart() {},
    init() {
      // Highcharts.chart("container", {
       let chart = Highcharts.chart("container", {
        chart: {
          type: "column",
          inverted: true,
        },
        title: {
          text: `Confirmted cases of each state`
        },
        subtitle: {
          text: "update once an hour"
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          title: {
            text: "number of confirmed cases"
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: "{point.y}"
            }
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat:
            '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        },
        series: [
          {
            name: "confirmed cases",
            colorByPoint: true,
            data: [
              
            ]
          }
        ]
      });
      chart.series[0].setData(this.dataArr)
    }
  },
  mounted: function() {
    this.updateChart();
    
  }, 
  async created(){
      try{
        //1.获取后台数据
       // this.confirmedCases = await DataResource.getConfirmedCases();
        this.currentStatus = await DataResource.getCurrentStatus();
        // console.log(this.dataArr)
        // console.log(this.dataArr[0].y)   成功

         console.log(this.dataArr)
        // console.log(this.confirmedCases.data)
        //  console.log(this.confirmedCases.data[0].state_name);
        //  console.log(this.confirmedCases.data[0].confirmed_cases);
         console.log(this.currentStatus.data[0].location);
         console.log(this.currentStatus.data[0].confirmed_cases);
       // console.log(this.currentStatus.data.length);

        //  for(let i =0;i<8;i++){
        //    this.dataArr[i].name = this.confirmedCases.data[i].state_name;
        //    this.dataArr[i].y = this.confirmedCases.data[i].confirmed_cases;

        //  }
         for(let i =0;i<this.currentStatus.data.length-1;i++){
           this.dataArr[i].name = this.currentStatus.data[i].location;
           this.dataArr[i].y = parseInt( this.currentStatus.data[i].confirmed_cases);

         }

        this.init();
      }catch(error){
        this.error  = error.message;
      }
    }
};
</script>

<style scoped>
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}
#colorPicker {
  border: 0;
  padding: 0;
  margin: 0;
  width: 30px;
  height: 30px;
}
.numberInput {
  width: 30px;
}
</style>