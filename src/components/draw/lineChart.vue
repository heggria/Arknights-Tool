<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main" style="width: 800px;height: 500px;"></div>
</template>
<script>
/* eslint-disable */
import echarts from "echarts";
import { clone } from "@/components/calculate/calculate.js";
export default {
  name: "",
  data() {
    return {
      charts: "",
      opinionData: [],
      valueX: "时间/ms",
      valueY: "血量",
      opinion: {
        tooltip: {
          trigger: "axis",
          formatter: "{b0}",
          padding: [2, 8, 2, 8],
          axisPointer: {
            type: "cross"
          },
          show: true
        },
        grid: {
          left: "5%",
          right: "20%",
          bottom: "0%",
          top: "20%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            restore: {},
            dataZoom: {}
          }
        },
        xAxis: {
          name: this.valueX,
          type: "value",
          boundaryGap: false,
          axisPointer: { show: true },
          max: function(value) {
            return value.max;
          },
          min: function(value) {
            return value.min;
          }
        },
        yAxis: {
          name: this.valueY,
          type: "value",
          axisPointer: { show: true },
          max: function(value) {
            return value.max;
          },
          min: function(value) {
            return value.min;
          }
        },
        series: [
          {
            name: "干员血量",
            type: "line",
            stack: "干员血量总量",
            data: [],
            silent: true,
            symbol: "none"
          },
          {
            name: "敌方血量",
            type: "line",
            stack: "敌方血量总量",
            data: [],
            silent: true,
            symbol: "none"
          }
        ]
      }
    };
  },
  props: ["cdata", "edata", "choose1", "choose2"],
  watch: {
    cdata: function(val) {
      this.opinion.series[0].data = val;
      this.charts.setOption(this.opinion);
    },
    edata: function(val) {
      console.log(val);
      this.opinion.series[1].data = val;
      this.charts.setOption(this.opinion);
    }
  },
  methods: {
    drawLine(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption(this.opinion);
    },/*
    cAtk() {
      // console.log(this.lastAtkSpeed);
      let changeAtkSpeed = this.lastAtkSpeed;
      //获取当前血量，计算当前攻击间隔并保存上一次攻击的攻击间隔
      if (this.nowBlood > this.baseData.c.blood * 0.3) {
        changeAtkSpeed =
          this.baseData.c.atkSpeed -
          (((this.baseData.c.blood - this.nowBlood) /
            (this.baseData.c.blood * 0.7)) *
            this.baseData.c.atkSpeed) /
            2;
      } else {
        changeAtkSpeed = this.baseData.c.atkSpeed / 2;
      }
      //获取当前攻击状态，如果上一次攻击结束，则进行攻击,并改变攻击间隔
      if (
        this.nowTime === 0 ||
        this.nowTime - this.lastAtkSpeed >= this.cLastAtkTime
      ) {
        //攻击回血
        if (
          this.nowBlood + this.baseData.c.treatment <=
          this.baseData.c.blood
        ) {
          this.nowBlood += this.baseData.c.treatment;
        } else {
          this.nowBlood = this.baseData.c.blood;
        }
        this.eNowBlood -= this.baseData.c.atk - 300;
        //置攻击时间和攻击间隔
        this.cLastAtkTime = this.nowTime;
        this.lastAtkSpeed = changeAtkSpeed;
      }
    },
    eAtk() {
      //console.log();
      //获取当前攻击状态，如果上一次攻击结束，则进行攻击,并改变攻击间隔
      if (
        this.nowTime === 0 ||
        this.nowTime - this.baseData.e.atkSpeed >= this.eLastAtkTime
      ) {
        //攻击
        this.nowBlood -= this.baseData.e.atk;
        //置攻击时间和攻击间隔
        this.eLastAtkTime = this.nowTime;
      }
    }*/
  },
  //调用
  mounted() {
    this.$nextTick(function() {
      this.drawLine("main");
    });
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>