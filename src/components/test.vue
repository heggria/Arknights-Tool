<template>
  <div>
    <el-button @click="test2">测试对战</el-button>
    <lineChart :data="lineData"></lineChart>
  </div>
</template>
<script>
/* eslint-disable */
// 9.16  测试对战
import { atkAction } from "@/components/calculate/calculate.js";
import lineChart from "@/components/draw/lineChart";
export default {
  name: "",
  data() {
    return {
      cData: {},
      eData: {},
      initTime: 0,
      nowTime: 0,
      flowTime: 0,
      cState: {
        lastAckTime: 0,
        lastAckSpeed: 0
      },
      eState: {
        lastAckTime: 0,
        lastAckSpeed: 0
      },
      lineData: [],
      countTimeM: 0
    };
  },
  components: {
    lineChart: lineChart
  },
  methods: {
    initBattle() {
      this.cData = {};
      this.eData = {};
      this.initTime = 0;
      this.nowTime = 0;
      this.flowTime = 0;
      this.cState = {
        lastAckTime: 0,
        lastAckSpeed: 0
      };
      this.eState = {
        lastAckTime: 0,
        lastAckSpeed: 0
      };
      this.lineData = [];
      this.countTimeM = 0;
      // console.log(this.$store.getters.getTemporaryCD, this.$store.getters.getTemporaryED);
      this.getBattleData();
    },
    test2() {
      window.clearTimeout(this.countTimeM);
      this.initBattle();
      this.initTime = new Date().valueOf();
      this.test();
      this.countTimeM = window.setInterval(this.test, 100);
    },
    test() {
      this.battle();
      this.lineData.push([
        new Date().valueOf() - this.initTime,
        this.eData.maxHp
      ]);
      if (this.flowTime >= 5000) {
        window.clearTimeout(this.countTimeM);
      }
    },
    battle() {
      console.log(this.$store.state.enemyBaseData);
      this.countTime();
      let result;
      //到达攻击时间
      if (
        this.cState.lastAckSpeed === 0 ||
        this.flowTime - this.cState.lastAckTime >=
          Math.floor(this.cState.lastAckSpeed * 1000)
      ) {
        //干员攻击
        result = atkAction(this.cData, this.eData);
        if (result.state === 0) {
          console.log("敌方死亡");
        } else if (result.state === 1) {
          console.log("敌方存活");
        }
        //保存
        this.afterAckSavaData(true, false, result);
      }
      //提交
      // this.setBattleData();
    },
    //获取当前战斗数据
    getBattleData() {
      this.cData = this.$store.getters.getCharData;
      this.eData = this.$store.getters.getEnemyData;
      //console.log(this.$store.getters.getTemporaryCD,this.$store.getters.getTemporaryED);
    },
    setBattleData() {
      this.$store.dispatch("setTemporaryED", this.eData);
      this.$store.dispatch("setTemporaryCD", this.cData);
      //console.log(this.$store.getters.getTemporaryCD,this.$store.getters.getTemporaryED);
    },
    // 攻击后保存数据
    afterAckSavaData(c, e, result) {
      this.cData = result.atkP;
      this.eData = result.defP;
      if (c === true) {
        this.cState.lastAckTime = this.flowTime;
        this.cState.lastAckSpeed = this.cData.baseAttackTime;
      }
      if (e === true) {
        this.eState.lastAckTime = this.flowTime;
        this.cState.lastAckSpeed = this.cData.baseAttackTime;
      }
    },
    countTime() {
      this.nowTime = new Date().valueOf();
      this.flowTime = this.nowTime - this.initTime;
    }
  },
  created() {
    //初始化战斗数据
    //this.$store.dispatch("setTemporaryED", data1);
    //this.$store.dispatch("setTemporaryCD", data2);
    this.initBattle();
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