<template>
  <div class="attributes-box">
    <inputnum lable="最大血量" :min="0" :max="1000000"></inputnum>
    <inputnum lable="攻击力" :min="0" :max="10000"></inputnum>
    <inputnum lable="攻击间隔" :min="0.1" :max="10000"></inputnum>
    <inputnum lable="攻击次数" :min="0" :max="10"></inputnum>
    <inputnum lable="防御" :min="0" :max="10000"></inputnum>
    <inputnum lable="法抗" :min="0" :max="10000"></inputnum>
    <inputnum lable="移动速度" :min="0" :max="10"></inputnum>
    <inputnum lable="每秒回血" :min="0" :max="10000"></inputnum>
    <div style="margin-top:5px;height:60px">
      <div class="switchBox">
        <div class="switchTable">法术攻击</div>
        <el-switch v-model="magicAtk" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <div class="switchBox">
        <div class="switchTable">眩晕免疫</div>
        <el-switch v-model="stunImmune" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <div class="switchBox">
        <div class="switchTable">沉默免疫</div>
        <el-switch v-model="silenceImmune" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
    </div>
    <el-button @click="test()">默认按钮</el-button>
  </div>
</template>

<script>
/* eslint-disable */
import inputNum from "@/components/part/inputNum";
export default {
  data() {
    return {
      maxHp: 10000,
      atk: 1000,
      atkTimes: 1,
      def: 200,
      magicResistance: 40,
      baseAttackTime: 2,
      hpRecoveryPerSec: 0,
      massLevel: 0,
      stunImmune: false,
      silenceImmune: false,
      moveSpeed: 1,
      magicAtk: false
    };
  },
  components: { inputnum: inputNum },
  methods: {
    test() {
      this.$store.commit("newNum", 1);
      console.log(this.$store.getters.getChangedNum);
    }
  }
};
</script>

<style>
.switchTable {
  margin: 5px;
  font-weight: bold;
}
.switchBox {
  width: 33%;
  float: left;
}
</style>