<template>
  <div class="attributes-box">
    <div style="font-size:20px;margin-top:15px;font-weight:600">
      <span>干员数据面板</span>
    </div>
    <div style="width:180px;margin:0 auto">
      <value title="最大血量" :value="this.cInfo.maxHp"></value>
      <value title="攻击力" :value="this.cInfo.atk"></value>
      <value title="攻击间隔" :value="this.cInfo.baseAttackTime"></value>
      <value title="攻击次数" :value="this.cInfo.atkTimes"></value>
      <value title="防御" :value="this.cInfo.def"></value>
      <value title="法抗" :value="this.cInfo.magicResistance"></value>
      <value title="法术攻击" :value="this.cInfo.magicAtk"></value>
    </div>
    <div style="clear:both;"></div>
    <el-divider></el-divider>
    <div style="font-size:20px;margin-top:15px;font-weight:600">
      <span>敌人数据面板</span>
    </div>
    <div style="width:180px;margin:0 auto">
      <value title="最大血量" :value="this.eInfo.maxHp"></value>
      <value title="攻击力" :value="this.eInfo.atk"></value>
      <value title="攻击间隔" :value="this.eInfo.baseAttackTime"></value>
      <value title="攻击次数" :value="this.eInfo.atkTimes"></value>
      <value title="防御" :value="this.eInfo.def"></value>
      <value title="法抗" :value="this.eInfo.magicResistance"></value>
      <value title="每秒回血" :value="this.eInfo.hpRecoveryPerSec"></value>
      <value title="法术攻击" :value="this.eInfo.magicAtk"></value>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
/*
  本组件为显示信息组件
  获取vuex中的基础信息
  进行转换
  显示
*/
import skill_table from "@/assets/skill_table.json";
import value from "@/components/part/value";
export default {
  name: "skill",
  data() {
    return {
      cInfo: this.$store.getters.getCharData,
      eInfo: this.$store.getters.getEnemyData
    };
  },
  components: { value: value },
  created() {},
  methods: {}
};
</script>

<style>
#skill {
  width: 100%;
}
</style>