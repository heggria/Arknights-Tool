<template>
  <div id="skill">
    <span style="font-size:25px">{{skillInfo.levels[skillLevel-1].name}}</span>
    <span style="font-size:12px">{{skillLevel}}级</span>
    <el-divider></el-divider>
    <div v-html="skillStr"></div>
    <el-divider></el-divider>
    <div>
      <value
        title="回复类型"
        :value="this.skillBaseInfo.spData.spType===1?'自动回复':this.skillBaseInfo.spData.spType"
      ></value>
      <value title="初始技力" :value="this.skillBaseInfo.spData.initSp"></value>
      <value title="释放技力" :value="this.skillBaseInfo.spData.spCost"></value>
      <value title="技力增量" :value="this.skillBaseInfo.spData.increment"></value>
      <value title="充能次数" :value="this.skillBaseInfo.spData.maxChargeTime"></value>
      <value title="攻击倍率/加" :value="this.cBCorrection[0].value"></value>
      <value title="攻击次数" :value="this.cBCorrection[1].value"></value>
      <value title="最终攻击倍率/乘" :value="this.cBCorrection[2].value"></value>
      <value title="最终攻击次数" :value="this.cBCorrection[3].value"></value>
      <value title="攻击间隔/加" :value="this.cBCorrection[4].value"></value>
      <value title="最终攻击力" :value="this.finalAttck.toFixed(2)"></value>
      <value title="最终攻击间隔" :value="this.finalAttckTime.toFixed(3)"></value>
      <value title="最终防御" :value="this.finalDef.toFixed(2)"></value>
      <value title="最终法抗" :value="this.finalSpellR.toFixed(2)"></value>
      <value title="单次攻击伤害" :value="this.hrut.toFixed(2)"></value>
      <value title="单攻击过程伤害" :value="(this.hrut*this.testInfo.c.atkTimes).toFixed(2)"></value>
      <value
        title="技能期间均总伤"
        :value="((this.hrut*this.testInfo.c.atkTimes)*(15/this.finalAttckTime)).toFixed(1)"
      ></value>
      <el-button @click="test()">默认按钮</el-button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import skill_table from "@/assets/skill_table.json";
import value from "@/components/part/value";
import {
  countAtk,
  countAtkInterval,
  countDef,
  countHurt,
  countSpellR
} from "@/components/calculate/calculate.js";
export default {
  name: "skill",
  data() {
    return {
      skillId: "skchr_angel_2",
      skillLevelMax: 7, //技能最大等级（预）
      skillLevel: 10, //技能当前等级
      skillInfo: {}, //技能所有信息
      skillStr: "", //技能描述
      skillBaseInfo: {
        //技能当前基本信息
        duration: 0,
        blackBoard: {}, //技能buff属性值
        bbKey: [], //技能buff key
        spData: {}
      },
      cBCorrection: [
        { name: "atk_scale", value: 0 }, //攻击倍率
        { name: "times", value: 0 }, //攻击次数
        { name: "attack@atk_scale", value: 0 }, //最终攻击倍率
        { name: "attack@times", value: 0 }, //最终攻击次数
        { name: "base_attack_time", value: 0 } //攻击间隔
      ],
      skillOpenDPS: 0,
      finalAttck: 0,
      finalAttckTime: 0,
      finalSpellR: 0,
      attackTimes: 0,
      finalDef: 0,
      hrut: 0,
      testInfo: {
        c: {
          type: 0, //伤害类型
          atk: 1013, //攻击
          fArmyAtk: 0,
          atkPlus: [0.16, 1.7],
          atkMultiply: 1,
          atkFinallyMultiply: 1,
          atkInterval: 1.5, //攻击速度
          atkSpeedPlus: [],
          atkIntervalPlus: [],
          atkTimes: 2, //攻击次数
          def: 100, //防御
          defPlus: [],
          defPlusPer: [],
          spellR: 40, //法抗
          spellRPlus: [],
          spellRPlusPer: [],
          phySuscep: [], //物理易伤
          spellSuscep: [] //法术易伤
        },
        e: {
          type: 0,
          atk: 700,
          fArmyAtk: 300,
          atkPlus: [],
          atkMultiply: 1,
          atkFinallyMultiply: 1,
          atkInterval: 1,
          atkSpeedPlus: [],
          atkIntervalPlus: [],
          atkTimes: 1,
          def: 100, //物理
          defPlus: [],
          defPlusPer: [],
          spellResistance: 0, //法术
          spellResistancePlus: [],
          spellResistancePlusPer: []
        }
      }
    };
  },
  components: { value: value },
  created() {
    this.getSkillInfo();
    console.log(this.skillBaseInfo);
    this.setBuffCorrection();
    this.countDPS();
  },
  methods: {
    cAtk(base_atk, friend_atk, atk_plus, atk_multiply, atk_f_multiply) {
      return countAtk(
        base_atk,
        friend_atk,
        atk_plus,
        atk_multiply,
        atk_f_multiply
      );
    },
    cAtkInterval(base_atk_interval, atk_speed_plus, attack_i_plus) {
      return countAtkInterval(base_atk_interval, atk_speed_plus, attack_i_plus);
    },
    cDef(base_def, def_plus, def_plus_per) {
      return countDef(base_def, def_plus, def_plus_per);
    },
    cSpellR(spellR, spellRPlus, spellRPlusPer) {
      return countSpellR(spellR, spellRPlus, spellRPlusPer);
    },
    cHurt(type, atk, def, spellR, phySuscep, spellSuscep) {
      return countHurt(type, atk, def, spellR, phySuscep, spellSuscep);
    },
    getSkillInfo() {
      this.skillInfo = {};
      for (let j in skill_table)
        if (j === this.skillId) {
          this.skillInfo = skill_table[j];
          this.skillLevelMax = this.skillInfo.levels.length;
        }
      console.log(this.skillInfo);
      this.findSkillBlackBoard();
      this.getSkillStr();
    },
    getSkillStr() {
      if (this.skillInfo != null) {
        this.skillStr = this.skillInfo.levels[this.skillLevel - 1].description
          .toLowerCase()
          .replace(/\<(.*?)\>/g, "")
          .replace(/[\<\>]/g, "")
          .replace(/\\n/g, "</br>\n");
        //console.log(this.skillStr);
        for (let i in this.skillBaseInfo.bbKey) this.replaceAStr(i);
        //for (let i in this.skillBaseInfo.bbKey) this.replaceAStr(i);
        this.skillStr = this.skillStr.replace(/\-\{\-/g, "").replace(/\{/g, "");
        //console.log(this.skillStr);
      }
    },
    replaceAStr(flag) {
      let strs = [];
      let str = strs[0] + "\\" + strs[1];
      if (this.skillBaseInfo.bbKey[flag].match("\\[") !== null) {
        strs[0] = this.skillBaseInfo.bbKey[flag].substring(
          0,
          this.skillBaseInfo.bbKey[flag].match("\\[").index
        );
        strs[1] = this.skillBaseInfo.bbKey[flag].substring(
          this.skillBaseInfo.bbKey[flag].match("\\[").index,
          this.skillBaseInfo.bbKey[flag].length
        );
        str = strs[0] + "\\" + strs[1];
      } else str = this.skillBaseInfo.bbKey[flag];
      let reg1 = new RegExp(str + ":0%}");
      let reg2 = new RegExp(str + ":0.0%}");
      let reg3 = new RegExp(str + "}");
      let reg4 = new RegExp(str + ":0.0}");
      this.skillStr = this.skillStr
        .replace(
          reg1,
          Math.round(this.skillBaseInfo.blackBoard[flag].value * 100) + "%"
        )
        .replace(
          reg2,
          Math.round(this.skillBaseInfo.blackBoard[flag].value * 100) + "%"
        )
        .replace(reg3, this.skillBaseInfo.blackBoard[flag].value)
        .replace(reg4, this.skillBaseInfo.blackBoard[flag].value);
      //console.log(this.skillStr);
    },
    findSkillBlackBoard() {
      this.skillBaseInfo.blackBoard = this.skillInfo.levels[
        this.skillLevel - 1
      ].blackboard;
      for (let i in this.skillBaseInfo.blackBoard) {
        this.skillBaseInfo.bbKey[i] = this.skillBaseInfo.blackBoard[i].key;
      }
      this.skillBaseInfo.spData = this.skillInfo.levels[
        this.skillLevel - 1
      ].spData;
      this.skillBaseInfo.duration = this.skillInfo.levels[
        this.skillLevel - 1
      ].duration;
      //console.log(this.skillBaseInfo.bbKey);
    },
    setBuffCorrection() {
      let keys = this.skillBaseInfo.bbKey;
      // 第一个技能组，特征为atk+def+*，所有属性为自身增益
      if (keys[0] != undefined && keys[1] != undefined) {
        for (let i in keys) {
          for (let j in this.cBCorrection)
            if (
              this.cBCorrection[j].name === this.skillBaseInfo.blackBoard[i].key
            ) {
              this.cBCorrection[j].value = this.skillBaseInfo.blackBoard[
                i
              ].value;
            }
        }
      }
      console.log(this.cBCorrection);
      console.log(this.skillBaseInfo.bbKey);
    },
    countDPS() {
      this.finalAttck = this.cAtk(
        this.testInfo.c.atk,
        this.testInfo.c.fArmyAtk,
        this.testInfo.c.atkPlus,
        this.testInfo.c.atkMultiply,
        this.testInfo.c.atkFinallyMultiply
      );
      this.finalAttckTime = this.cAtkInterval(
        this.testInfo.c.atkInterval,
        this.testInfo.c.atkSpeedPlus,
        this.testInfo.c.atkIntervalPlus
      );
      this.finalDef = this.cDef(
        this.testInfo.c.def,
        this.testInfo.c.defPlus,
        this.testInfo.c.defPlusPer
      );
      this.finalSpellR = this.cSpellR(
        this.testInfo.c.spellR,
        this.testInfo.c.spellRPlus,
        this.testInfo.c.spellRPlusPer
      );
      this.hrut = this.cHurt(
        this.testInfo.c.type,
        this.finalAttck,
        this.finalDef,
        this.finalSpellR,
        this.testInfo.c.phySuscep,
        this.testInfo.c.spellSuscep
      );
    },
    test() {
      this.$store.commit("newNum", 1);
      console.log(this.$store.getters.getChangedNum);
    }
  }
};
</script>

<style>
#skill {
  width: 100%;
}
</style>