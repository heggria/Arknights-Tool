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