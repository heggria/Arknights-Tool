<template>
  <div id="skill">
    <div v-html="skillStr"></div>
    <div class="value">
      攻击倍率(乘算)
      <br />
      <span class="num">{{cBCorrection[0].value}}</span>
    </div>
    <div class="value">
      攻击次数
      <br />
      <span class="num">{{cBCorrection[1].value}}</span>
    </div>
    <div class="value">
      最终攻击倍率(乘算)
      <br />
      <span class="num">{{cBCorrection[2].value}}</span>
    </div>
    <div class="value">
      最终攻击次数
      <br />
      <span class="num">{{cBCorrection[3].value}}</span>
    </div>
    <div class="value">
      攻击间隔(加算)
      <br />
      <span class="num">{{cBCorrection[4].value}}</span>
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
      skillId: "skchr_angel_3",
      skillLevelMax: 7, //技能最大等级（预）
      skillLevel: 10, //技能当前等级
      skillInfo: {}, //技能所有信息
      skillStr: "", //技能描述
      skillBaseInfo: {
        //技能当前基本信息
        blackBoard: {}, //技能buff属性值
        bbKey: [] //技能buff key
      },
      cBCorrection: [
        { name: "atk_scale", value: 0 }, //攻击倍率
        { name: "times", value: 0 }, //攻击次数
        { name: "attack@atk_scale", value: 0 }, //最终攻击倍率
        { name: "attack@times", value: 0 }, //最终攻击次数
        { name: "base_attack_time", value: 0 } //攻击间隔
      ]
    };
  },
  created() {
    this.getSkillInfo();
    console.log(this.skillBaseInfo);
    this.setBuffCorrection();
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
    }
  }
};
</script>

<style>
.value {
  width: 50%;
  float: left;
  margin-top: 20px;
}
.num {
  font-size: 20px;
  color: #409eff;
}
#skill{
  width: 300px;
}
</style>