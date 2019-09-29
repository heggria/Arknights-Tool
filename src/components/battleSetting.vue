<template>
  <div class="attributes-box">
    <div style="margin-top:10px;margin-bottom:30px;height:25px">
      <span style="font-size:20px;font-weight:600;">控制面板</span>
    </div>
    <el-divider></el-divider>
    <div style="width:140px;margin:10px auto">
      <el-tooltip style="float:left" class="item" effect="dark" content="停止" placement="top">
        <el-button circle class="el-icon-switch-button" @click="this.$parent.stop"></el-button>
      </el-tooltip>
      <el-tooltip style="float:left" class="item" effect="dark" content="暂停/继续" placement="top">
        <el-button circle class="el-icon-video-pause"></el-button>
      </el-tooltip>
      <el-tooltip style="float:left" class="item" effect="dark" content="开始" placement="top">
        <el-button circle class="el-icon-video-play" @click="this.$parent.start"></el-button>
      </el-tooltip>
    </div>
    <div style="clear:both;height:10px"></div>
    <el-divider>
      <span style="font-size:14px;font-weight:600">通用设置</span>
    </el-divider>
    <inputNL
      lable="运行时间"
      defaultValue="runTime"
      :min="5000"
      :max="600000"
      :step="1"
      :display="true"
      remark="范围：5000ms~600000ms(即5s~600s)，必须为1的倍数，重新开始生效"
    ></inputNL>
    <selectV lable="干员变量" :options="this.options" :ctype="true"></selectV>
    <selectV lable="敌人变量" :options="this.options" :ctype="false"></selectV>
    <switchS lable="实时模拟" defaultValue="fullSimulation" :display="true" remark="实时运行对战，可调整速度，重新开始生效"></switchS>
    <switchS
      lable="手动技能自启"
      defaultValue="autoRelease"
      :state="!state"
      :display="true"
      remark="手动技能无缝衔接，可计算理论最大伤害"
    ></switchS>
    <inputNL
      lable="速度倍数"
      defaultValue="runSpeed"
      :state="!state"
      :min="0.1"
      :max="5.0"
      :step="0.1"
      :display="true"
      remark="范围：0.1~5.0，必须为0.1的倍数"
    ></inputNL>
    <switchS lable="某方死后中止" defaultValue="autoStop"></switchS>
    <el-divider>
      <span style="font-size:14px;font-weight:600">干员设置</span>
    </el-divider>
    <switchS lable="是否攻击" defaultValue="charAtk"></switchS>
    <el-divider>
      <span style="font-size:14px;font-weight:600">敌人设置</span>
    </el-divider>
    <switchS lable="是否攻击" defaultValue="enemyAtk"></switchS>
    <switchS lable="突袭难度" defaultValue="assault" :display="true" remark="自定义敌人属性增幅：1.2倍，重新开始生效"></switchS>
  </div>
</template>

<script>
/* eslint-disable */
/*
  本组件为战斗设置面板
  初始化战斗数据
  开始战斗
  显示图表与数据
  战斗时间
*/
import switchS from "@/components/part/switchS";
import inputNL from "@/components/part/inputNL";
import selectV from "@/components/part/selectV";
export default {
  data() {
    return {
      options: [
        {
          value: "maxHp",
          label: "血量"
        },
        {
          value: "atk",
          label: "攻击"
        },
        {
          value: "def",
          label: "防御"
        },
        {
          value: "magicResistance",
          label: "法抗"
        },
        {
          value: "baseAttackTime",
          label: "攻击间隔"
        },
        {
          value: "magicAtk",
          label: "魔法伤害"
        }
      ]
    };
  },
  computed: {
    state: {
      set(value) {
        this.$store.dispatch("setState", this.state);
      },
      get() {
        return this.$store.getters.getConfig.fullSimulation;
      }
    }
  },
  components: { switchS: switchS, inputNL: inputNL, selectV: selectV }
};
</script>

<style>
</style>