<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import enemyDataF from "@/assets/enemy_database.json";
import characterDataF from "@/assets/character_table.json";
import character from "@/components/character.vue";
import enemy from "@/components/enemy.vue";
/* eslint-disable */
export default {
  name: "app",
  components: {character:character,enemy:enemy},
  data() {
    return {
      enemyDatas: enemyDataF.enemies,
      characterDatas: characterDataF,
      enemyLevel: 0,
      characterLevel: 0,
      enemyNum: 90,
      characterNum: "char_010_chen",
      enemyDescription: "",
      enemyAttributes: {
        maxHp: 0,
        atk: 0,
        def: 0,
        magicResistance: 0,
        cost: 0,
        blockCnt: 0,
        moveSpeed: 0,
        attackSpeed: 0,
        baseAttackTime: 0,
        respawnTime: 0,
        hpRecoveryPerSec: 0,
        spRecoveryPerSec: 0,
        maxDeployCount: 0,
        massLevel: 0,
        baseForceLevel: 0,
        stunImmune: false,
        silenceImmune: false
      },
    };
  },
  created: function() {/*
    this.enemyAttributes = this.getAttributes(
      this.enemyAttributes,
      this.enemyDatas,
      this.enemyNum,
      this.enemyLevel
    );
    this.characterAttributes = this.getCharacterAttributes(
      this.characterAttributes,
      this.characterDatas,
      this.characterLevel
    );
    this.enemyDescription = this.enemyDatas[this.enemyNum].Value[
      this.enemyLevel
    ].enemyData.description.m_value
      .replace("<@eb.key>", "")
      .replace("</>", "");
      */
  },
  methods: {/*
    getAttributes: function(enemy, data, num, level) {
      let attributes = data[num].Value[level].enemyData.attributes;
      enemy.maxHp = attributes.maxHp.m_value;
      enemy.atk = attributes.atk.m_value;
      enemy.def = attributes.def.m_value;
      enemy.magicResistance = attributes.magicResistance.m_value;
      enemy.cost = attributes.cost.m_value;
      enemy.blockCnt = attributes.blockCnt.m_value;
      enemy.moveSpeed = attributes.moveSpeed.m_value;
      enemy.attackSpeed = attributes.attackSpeed.m_value;
      enemy.baseAttackTime = attributes.baseAttackTime.m_value;
      enemy.respawnTime = attributes.respawnTime.m_value;

      enemy.hpRecoveryPerSec = attributes.hpRecoveryPerSec.m_value;
      enemy.spRecoveryPerSec = attributes.spRecoveryPerSec.m_value;
      enemy.maxDeployCount = attributes.maxDeployCount.m_value;
      enemy.massLevel = attributes.massLevel.m_value;
      enemy.baseForceLevel = attributes.baseForceLevel.m_value;
      enemy.stunImmune = attributes.stunImmune.m_value;
      enemy.silenceImmune = attributes.silenceImmune.m_value;
      return enemy;
    },
    changeLevel: function() {}*/
  }
};
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.box {
  margin: 10px;
  float: left;
}
.attributes-box {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  font-size: 15px;
  width: 200px;
  padding: 15px;
}
</style>
