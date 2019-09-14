<template>
  <div class="attributes-box">
    <inputnum lable="最大血量" :min="0" :max="1000000" defaultValue="maxHp"></inputnum>
    <inputnum lable="攻击力" :min="0" :max="10000" defaultValue="atk"></inputnum>
    <inputnum lable="攻击间隔" :min="0.1" :max="10000" defaultValue="baseAttackTime"></inputnum>
    <inputnum lable="攻击次数" :min="0" :max="10" defaultValue="atkTimes"></inputnum>
    <inputnum lable="防御" :min="0" :max="10000" defaultValue="def"></inputnum>
    <inputnum lable="法抗" :min="0" :max="10000" defaultValue="magicResistance"></inputnum>
    <inputnum lable="移动速度" :min="0" :max="10" defaultValue="moveSpeed"></inputnum>
    <inputnum lable="每秒回血" :min="0" :max="10000" defaultValue="hpRecoveryPerSec"></inputnum>
    <div style="margin-top:5px;height:60px">
      <switchC lable="法术攻击" defaultValue="magicAtk"></switchC>
      <switchC lable="眩晕免疫" defaultValue="stunImmune"></switchC>
      <switchC lable="沉默免疫" defaultValue="silenceImmune"></switchC>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import inputNum from "@/components/part/inputNum";
import switchC from "@/components/part/switchC";

export default {
  data() {
    return {
      enemyData: this.$store.getters.getEnemyData
    };
  },
  components: { inputnum: inputNum, switchC: switchC },
  methods: {}
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