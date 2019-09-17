<template>
  <div>
    <el-button @click="test2">测试对战</el-button>
    <lineChart :cdata="charData" :edata="enemyData"></lineChart>
  </div>
</template>
<script>
/* eslint-disable */
// 9.16  测试对战
import { atkAction, clone } from "@/components/calculate/calculate.js";
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
      charData: [],
      enemyData: [],
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
      this.charData = [];
      this.enemyData = [];
      this.countTimeM = 0;
      //初始化战斗数据
      this.$store.dispatch(
        "setTemporaryED",
        clone(this.$store.getters.getEnemyData)
      );
      this.$store.dispatch(
        "setTemporaryCD",
        clone(this.$store.getters.getCharData)
      );
      this.getBattleData();
    },
    test2() {
      window.clearTimeout(this.countTimeM);
      this.initBattle();
      this.initTime = new Date().valueOf();
      this.countTimeM = window.setInterval(this.test, 50);
    },
    test() {
      this.battle();
      this.charData.push([
        this.flowTime,
        this.cData.maxHp
      ]);
      this.enemyData.push([
        this.flowTime,
        this.eData.maxHp
      ]);
      //console.log(this.enemyData);
      if (this.flowTime >= 10000) {
        window.clearTimeout(this.countTimeM);
      }
    },
    battle() {
      this.countTime();
      //到达攻击时间
      if (
        this.cState.lastAckSpeed === 0 ||
        this.flowTime - this.cState.lastAckTime >=
          Math.floor(this.cState.lastAckSpeed * 1000)-5
      ) {
        //攻击
        let result = atkAction(clone(this.cData), clone(this.eData));
        this.afterAckSavaData(true, false, result);
      }/*
      if (
        this.eState.lastAckSpeed === 0 ||
        this.flowTime - this.eState.lastAckTime >=
          Math.floor(this.eState.lastAckSpeed * 1000)-5
      ) {
        console.log(this.flowTime - this.eState.lastAckTime);
        //攻击
        let result = atkAction(clone(this.eData), clone(this.cData));
        this.afterAckSavaData(false, true, result);
      }*/
      //提交
      this.setBattleData();
    },
    //获取当前战斗数据
    getBattleData() {
      this.cData = clone(this.$store.getters.getTemporaryCD);
      this.eData = clone(this.$store.getters.getTemporaryED);
      //console.log(this.$store.getters.getTemporaryCD,this.$store.getters.getTemporaryED);
    },
    setBattleData() {
      this.$store.dispatch("setTemporaryED", clone(this.eData));
      this.$store.dispatch("setTemporaryCD", clone(this.cData));
      //console.log(this.$store.getters.getTemporaryCD,this.$store.getters.getTemporaryED);
    },
    // 攻击后保存数据
    afterAckSavaData(c, e, result) {
      if (c === true) {
        this.cData = clone(result.atkP);
        this.eData = clone(result.defP);
        this.cState.lastAckTime = this.flowTime;
        this.cState.lastAckSpeed = this.cData.baseAttackTime;
      }
      if (e === true) {
        this.eData = clone(result.atkP);
        this.cData = clone(result.defP);
        this.eState.lastAckTime = this.flowTime;
        this.eState.lastAckSpeed = this.eData.baseAttackTime;
      }
    },
    countTime() {
      this.nowTime = new Date().valueOf();
      this.flowTime = this.nowTime - this.initTime;
    }
  },
  created() {
    //初始化战斗数据
    this.$store.dispatch(
      "setTemporaryED",
      clone(this.$store.getters.getCharData)
    );
    this.$store.dispatch(
      "setTemporaryCD",
      clone(this.$store.getters.getEnemyData)
    );
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