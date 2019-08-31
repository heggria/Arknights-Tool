<template>
  <div id="skill">
    <div v-html="skillStr"></div>
    <div class="value">
      攻击buff(加算)
      <br />
    </div>
    <div class="value">
      攻击倍率(乘算)
      <br />
      <span class="num">{{skillBaseInfo.blackBoard[0].value}}</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import skill_table from "@/assets/skill_table.json";
export default {
  name: "skill",
  data() {
    return {
      skillId: "skchr_chen_1",
      skillLevelMax: 7, //技能最大等级
      skillLevel: 7, //技能当前等级
      skillInfo: {}, //技能所有信息
      skillStr: "", //技能描述
      skillBaseInfo: {
        //技能当前基本信息
        blackBoard: {}, //技能buff属性值
        bbKey: [] //技能buff key
      }
    };
  },
  created() {
    this.getSkillInfo();
    console.log(this.skillBaseInfo);
  },
  methods: {
    getSkillInfo() {
      this.skillInfo = {};
      for (let j in skill_table)
        if (j === this.skillId) {
          this.skillInfo = skill_table[j];
          this.skillLevelMax = this.skillInfo.levels.length;
        }
      //console.log(this.skillInfo);
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
      //console.log(this.skillBaseInfo.bbKey);
    },
    setBuffCorrection() {
        let buff={
            'atk':0,//自身攻击buff
            'atk_scale':0,//自身攻击倍率
            "atk_scale[drone]":0,//无人机
            "atk_scale[normal]":0,//普通对象
            'def':0,//自身防御buff
            'stun':0,//眩晕时间
            'times':1,//攻击次数
            'max_target':1,//攻击范围内最大攻击数
            "move_speed":0,//命中目标移动速度
            "duration":0,//buff持续时间
            "base_attack_time":0,//攻击间隔
            "talent@prob":0,//天赋概率
            "attack_speed":0,//攻击速度
            "attack@times":0,//最终攻击次数
            "attack@atk_scale":1,//最终攻击倍率
            "burn.atk_scale":0,//燃烧倍率
            "attack@stun":0,//普攻眩晕时间
            "attack@atk_to_hp_recovery_ratio":0,//普攻回血
            'attack@max_target':1,//普攻最大攻击数
            'force':0,//推力
        }
    }
  }
};
</script>

<style>
.value {
  width: 50%;
  float: left;
  margin-bottom: 10px;
}
.num {
  font-size: 20px;
  color: #409eff;
}
</style>