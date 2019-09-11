<template>
  <div id="character">
    <div class="block">
      <div class="attributes-box">
        <div style="width:178px;float:left;">
          <el-cascader
            v-model="value"
            :options="options"
            :show-all-levels="false"
            filterable
            @change="cChange"
          ></el-cascader>
          <div style="width:178px;margin-top:5px;">
            <el-radio-group v-model="elite" size="mini" @change="eChange">
              <el-radio-button label="无"></el-radio-button>
              <el-radio-button label="精英一"></el-radio-button>
              <el-radio-button label="精英二"></el-radio-button>
            </el-radio-group>
          </div>
          <el-input-number
            size="small"
            v-model="level"
            :min="levelMin"
            :max="levelMax"
            style="width:178px;margin-top:5px;"
            :step="1"
            step-strictly
            @change="lChange"
          ></el-input-number>
          <div style="width:158px;margin-left:10px">
            <el-slider v-model="favor" :format-tooltip="formatTooltip" :step='0.1' @input="fChange"></el-slider>
          </div>
          <div style="margin-bottom:10px">{{character.itemUsage}}</div>
          <div>
            <div class="value">
              最大血量
              <br />
              <span class="num">{{Math.round(characterBD.maxHp)+Math.floor(characterFavor.maxHp)}}</span>
              <span
                class="snum"
              >{{Math.round(characterFavor.maxHp)===0||characterFavor.maxHp===undefined?'':'+'+Math.round(characterFavor.maxHp)}}</span>
            </div>
            <div class="value">
              攻击力
              <br />
              <span class="num">{{Math.round(characterBD.atk)+Math.floor(characterFavor.atk)}}</span>
              <span
                class="snum"
              >{{Math.round(characterFavor.atk)===0||characterFavor.atk===undefined?'':'+'+Math.round(characterFavor.atk)}}</span>
            </div>
            <div class="value">
              防御力
              <br />
              <span class="num">{{Math.round(characterBD.def)+Math.floor(characterFavor.def)}}</span>
              <span
                class="snum"
              >{{Math.round(characterFavor.def)===0||characterFavor.def===undefined?'':'+'+Math.round(characterFavor.def)}}</span>
            </div>
            <div class="value">
              法术抗性
              <br />
              <span class="num">{{characterBD.magicResistance*1}}</span>
            </div>
            <div class="value">
              攻击间隔(s)
              <br />
              <span class="num">{{characterBD.baseAttackTime*1}}</span>
            </div>
            <div class="value">
              真实dps
              <br />
              <span
                class="num"
              >{{Math.round((characterBD.atk+characterFavor.atk)/characterBD.baseAttackTime)}}</span>
            </div>
          </div>
          <div style="width:178px;float:left;">
            <el-collapse accordion>
              <el-collapse-item>
                <template slot="title">
                  <el-radio
                    v-model="radio"
                    label="1"
                  >{{skills[0]===undefined?'暂无数据':skills[0].levels[0].name}} {{cSkillsLevel(0)}}</el-radio>
                </template>
                <div style="width:158px;margin-left:10px">
                  <el-slider
                    v-model="skillsLevel[0]"
                    :step="1"
                    :min="1"
                    :max="skillLMax"
                    @input="getSkillStr(0)"
                  ></el-slider>
                  <div class="value x">
                    技力花费
                    <br />
                    <span
                      class="num"
                    >{{skills[0]===undefined?'NULL':skills[0].levels[skillsLevel[0]-1].spData.spCost}}</span>
                  </div>
                  <div class="value x">
                    初始技力
                    <br />
                    <span
                      class="num"
                    >{{skills[0]===undefined?'NULL':skills[0].levels[skillsLevel[0]-1].spData.initSp}}</span>
                  </div>
                  <div class="value"  style="width:100%">
                    <span
                      class="num" style="font-size:14px"
                    >{{skills[2]===undefined?'NULL':(skills[0].levels[skillsLevel[0]-1].spData.spType===1?'自动回复':(skills[0].levels[skillsLevel[0]-1].spData.spType===2?'攻击回复':(skills[0].levels[skillsLevel[0]-1].spData.spType===4?'受击回复':'被动技能')))}}</span>
                  </div>
                </div>
                <div>{{skillDes[0]}}</div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <el-radio
                    v-model="radio"
                    label="2"
                  >{{skills[1]===undefined?'暂无数据':skills[1].levels[0].name}} {{cSkillsLevel(1)}}</el-radio>
                </template>
                <div style="width:158px;margin-left:10px">
                  <el-slider
                    v-model="skillsLevel[1]"
                    :step="1"
                    :min="1"
                    :max="skillLMax"
                    @input="getSkillStr(1)"
                  ></el-slider>
                  <div class="value x">
                    技力花费
                    <br />
                    <span
                      class="num"
                    >{{skills[1]===undefined?'NULL':skills[1].levels[skillsLevel[1]-1].spData.spCost}}</span>
                  </div>
                  <div class="value x">
                    初始技力
                    <br />
                    <span
                      class="num"
                    >{{skills[1]===undefined?'NULL':skills[1].levels[skillsLevel[1]-1].spData.initSp}}</span>
                  </div>
                  <div class="value" style="width:100%">
                    <span
                      class="num" style="font-size:14px"
                    >{{skills[2]===undefined?'NULL':(skills[1].levels[skillsLevel[1]-1].spData.spType===1?'自动回复':(skills[1].levels[skillsLevel[1]-1].spData.spType===2?'攻击回复':(skills[1].levels[skillsLevel[1]-1].spData.spType===4?'受击回复':'被动技能')))}}</span>
                  </div>
                </div>
                <div>{{skillDes[1]}}</div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <el-radio
                    v-model="radio"
                    label="3"
                  >{{skills[2]===undefined?'暂无数据':skills[2].levels[0].name}} {{cSkillsLevel(2)}}</el-radio>
                </template>
                <div style="width:158px;margin-left:10px">
                  <el-slider
                    v-model="skillsLevel[2]"
                    :step="1"
                    :min="1"
                    :max="skillLMax"
                    @input="getSkillStr(2)"
                  ></el-slider>
                  <div class="value x">
                    技力花费
                    <br />
                    <span
                      class="num"
                    >{{skills[2]===undefined?'NULL':skills[2].levels[skillsLevel[2]-1].spData.spCost}}</span>
                  </div>
                  <div class="value x">
                    初始技力
                    <br />
                    <span
                      class="num"
                    >{{skills[2]===undefined?'NULL':skills[2].levels[skillsLevel[2]-1].spData.initSp}}</span>
                  </div>
                  <div class="value" style="width:100%">
                    <span
                      class="num" style="font-size:14px"
                    >{{skills[2]===undefined?'NULL':(skills[2].levels[skillsLevel[2]-1].spData.spType===1?'自动回复':(skills[2].levels[skillsLevel[2]-1].spData.spType===2?'攻击回复':(skills[2].levels[skillsLevel[2]-1].spData.spType===4?'受击回复':'被动技能')))}}</span>
                  </div>
                  <div>{{skillDes[2]}}</div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
        <div style="clear:both;"></div>
      </div>
      <div class="attributes-box"><skill></skill></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import characterDF from "@/assets/character_table.json";
import skill_table from "@/assets/skill_table.json";
import skill from "@/components/skill.vue"
export default {
  name: "character",
  data() {
    return {
      radio: "1",
      elite: "无",
      level: 50,
      favor: 0,
      levelMin: 1,
      levelMax: 50,
      skillLMax: 7,
      value: [],
      skills: [],
      skillsLevel: [1, 1, 1],
      skillDes: ["", "", ""],
      options: [],
      characterBD: {},
      characterFavor: {},
      character: {},
      profession: [
        "PIONEER",
        "WARRIOR",
        "SNIPER",
        "SUPPORT",
        "MEDIC",
        "TANK",
        "CASTER",
        "SPECIAL",
        "ALL"
      ]
    };
  },
  components:{'skill':skill},
  created: function() {
    //console.log(this.getCList("SUPPORT",5));
    this.setCMenu();
  },
  methods: {
    getSkillStr(flag) {
      if (this.skills[flag] != null) {
        let des = this.skills[flag].levels[
          this.skillsLevel[flag] - 1
        ].description
          .replace(/\<(.*?)\>/g, "")
          .replace(/[\<\>]/g, "")
          .replace("\\n", ",");
        this.skillDes[flag] = des;
        console.log(this.skills[flag].skillId);
        let k;
        let r = /\{(.*?)\}/g;
        k = des.match(r);
        for (let t in k) {
          k[t] = k[t]
            .replace("{", "")
            .replace("}", "")
            .replace(":0.0", "")
            .replace(":0%", "");
          //console.log(k[t]);
          for (let i in this.skills[flag].levels[this.skillsLevel[flag] - 1]
            .blackboard) {
            // console.log(this.skills[flag].levels[this.skillsLevel[flag] - 1].blackboard);
            if (
              this.skills[flag].levels[this.skillsLevel[flag] - 1].blackboard[i]
                .key === k[t]
            ) {
              //console.log(k[t]);
              //console.log(this.skills[flag].levels[this.skillsLevel[flag] - 1].blackboard[i].value);
              let reg = new RegExp(k[t]);
              //console.log(des.match("{cost}"));
              if (
                des.match(
                  "{" +
                    this.skills[flag].levels[this.skillsLevel[flag] - 1]
                      .blackboard[i].key +
                    "}"
                ) !== null
              ) {
                //console.log(k[t]);
                des = des
                  .replace(
                    reg,
                    Math.round(
                      this.skills[flag].levels[this.skillsLevel[flag] - 1]
                        .blackboard[i].value
                    )
                  )
                  .replace("{", "")
                  .replace("}", "");
              } else if (
                des.match(
                  "{" +
                    this.skills[flag].levels[this.skillsLevel[flag] - 1]
                      .blackboard[i].key +
                    ":0%}"
                ) !== null
              ) {
                des = des
                  .replace(
                    reg,
                    Math.round(
                      this.skills[flag].levels[this.skillsLevel[flag] - 1]
                        .blackboard[i].value * 100
                    )
                  )
                  .replace("{", "")
                  .replace("}", "")
                  .replace(":0%", "%");
              } else if (
                des.match(
                  "{" +
                    this.skills[flag].levels[this.skillsLevel[flag] - 1]
                      .blackboard[i].key +
                    ":0.0}"
                ) !== null
              ) {
                des = des
                  .replace(
                    reg,
                    Math.round(
                      this.skills[flag].levels[this.skillsLevel[flag] - 1]
                        .blackboard[i].value
                    )
                  )
                  .replace("{", "")
                  .replace("}", "")
                  .replace(":0.0", "");
              }
            }
          }
        }
        //console.log(des);
        this.skillDes[flag] = des;
      }
    },
    cSkillsLevel: function(flag) {
      let str = "";
      if (this.skillsLevel[flag] < 8) {
        str = this.skillsLevel[flag] + "级";
      } else if (this.skillsLevel[flag] === 8) str = "专一";
      else if (this.skillsLevel[flag] === 9) str = "专二";
      else if (this.skillsLevel[flag] === 10) str = "专三";
      return str;
    },
    getCList(profession, rarity) {
      let CList = [];
      let flag1 = 0;
      let flag2 = 0;
      let blackList = [
        "医疗探机",
        "触手",
        "幻影",
        "机械水獭",
        "障碍物",
        "震撼装置",
        "闸门",
        "侦测器",
        "干扰装置",
        "弩炮"
      ];
      let writeIntoL = function(CList, i) {
        let c = { name: "", flag: 0 };
        if (characterDF[i].rarity === rarity) {
          c.name = characterDF[i].name;
          c.flag = flag2;
          CList[flag1] = c;
          flag1++;
        }
      };
      for (var i in characterDF) {
        for (var j = 0; j < blackList.length; j++) {
          if (characterDF[i].name === blackList[j]) break;
          else if (j === blackList.length - 1)
            if (
              profession === "ALL" ||
              characterDF[i].profession === profession
            )
              writeIntoL(CList, i);
        }
        flag2++;
      }
      return CList;
    },
    setCMenu() {
      let label = [
        "先锋",
        "近卫",
        "狙击",
        "辅助",
        "医疗",
        "重装",
        "术师",
        "特种"
      ];

      for (let k = 0; k < 8; k++) {
        let nodes = [
          {
            value: "0",
            label: "★★★★★★",
            children: []
          },
          {
            value: "0",
            label: "★★★★★",
            children: []
          },
          {
            value: "0",
            label: "★★★★",
            children: []
          },
          {
            value: "0",
            label: "★★★",
            children: []
          },
          {
            value: "0",
            label: "★★",
            children: []
          },
          {
            value: "0",
            label: "★",
            children: []
          }
        ];
        let node = {
          value: "",
          label: "",
          children: nodes
        };
        node.value = this.profession[k];
        node.label = label[k];
        for (let x = 0; x < 6; x++) {
          let cs = this.getCList(node.value, Math.abs(x - 5));
          for (var y in cs) {
            let nodex = {
              value: "",
              label: ""
            };
            nodex.value = cs[y].flag;
            nodex.label = cs[y].name;
            node.children[x].children.push(nodex);
          }
          // console.log(cs);
        }
        //console.log(node);
        this.options[k] = node;
      }
      //console.log(this.options);
    },
    getCAttributes: function(data) {
      let attributes = data.phases[0].attributesKeyFrames[0].data;
      this.character = data;
    },
    cChange() {
      let flag = 0;
      for (let i in characterDF) {
        if (flag === this.value[2]) {
          this.getCAttributes(characterDF[i]);
          break;
        }
        flag++;
      }
      this.lChange();
      this.getCSkill();
      //console.log(this.character);
    },
    eChange() {
      if (this.elite == "无") {
        this.levelMax = this.character.phases[0].attributesKeyFrames[1].level;
      } else if (this.elite == "精英一") {
        this.levelMax = this.character.phases[1].attributesKeyFrames[1].level;
      } else if (this.elite == "精英二") {
        this.levelMax = this.character.phases[2].attributesKeyFrames[1].level;
      }
      //console.log(this.levelMax)
      this.lChange();
    },
    lChange() {
      let char = {
        maxHp: 0,
        atk: 0,
        def: 0,
        magicResistance: 0,
        attackSpeed: 0,
        baseAttackTime: 0
      };
      let flag = 0;
      if (this.elite === "无") flag = 0;
      else if (this.elite === "精英一") flag = 1;
      else if (this.elite === "精英二") flag = 2;
      char.maxHp =
        this.character.phases[flag].attributesKeyFrames[0].data.maxHp +
        ((this.character.phases[flag].attributesKeyFrames[1].data.maxHp -
          this.character.phases[flag].attributesKeyFrames[0].data.maxHp) /
          (this.character.phases[flag].attributesKeyFrames[1].level - 1)) *
          (this.level - 1);
      char.def =
        this.character.phases[flag].attributesKeyFrames[0].data.def +
        ((this.character.phases[flag].attributesKeyFrames[1].data.def -
          this.character.phases[flag].attributesKeyFrames[0].data.def) /
          (this.character.phases[flag].attributesKeyFrames[1].level - 1)) *
          (this.level - 1);
      char.atk =
        this.character.phases[flag].attributesKeyFrames[0].data.atk +
        ((this.character.phases[flag].attributesKeyFrames[1].data.atk -
          this.character.phases[flag].attributesKeyFrames[0].data.atk) /
          (this.character.phases[flag].attributesKeyFrames[1].level - 1)) *
          (this.level - 1);
      char.magicResistance = this.character.phases[
        flag
      ].attributesKeyFrames[0].data.magicResistance;
      char.baseAttackTime = this.character.phases[
        flag
      ].attributesKeyFrames[0].data.baseAttackTime;
      this.characterBD = char;
      this.fChange();
    },
    fChange() {
      if (this.character.favorKeyFrames != null) {
        let char = {
          maxHp: 0,
          atk: 0,
          def: 0
        };
        char.maxHp =
          this.character.favorKeyFrames[1].data.maxHp * (this.favor / 100);
        char.atk =
          this.character.favorKeyFrames[1].data.atk * (this.favor / 100);
        char.def =
          this.character.favorKeyFrames[1].data.def * (this.favor / 100);
        this.characterFavor = char;
      }
    },
    formatTooltip(val) {
      return "信赖:" + val + "%";
    },
    getCSkill() {
      this.skills = [];
      for (let i in this.character.skills) {
        for (let j in skill_table)
          if (j === this.character.skills[i].skillId)
            this.skills.push(skill_table[j]);
      }
      this.skillLMax = this.skills[0].levels.length;
      this.getSkillStr(0);
      this.getSkillStr(1);
      this.getSkillStr(2);
      //console.log(this.skillLMax);
    }
  }
};
</script>

<style>
.attributes-box {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  font-size: 12px;
  width: 178px;
  padding: 15px;
  float: left;
  margin: 10px;
}
.attributes-box:after {
  content: "";
  display: block;
  clear: both;
}
.x{
  margin-bottom:5px;
}
</style>