<template>
  <div class="attributes-box">
    <div style="margin-top:10px;margin-bottom:30px;height:25px">
      <span style="font-size:20px;font-weight:600;">控制面板</span>
    </div>
    <el-divider>
    </el-divider>
    <div style="width:140px;margin:10px auto">
      <el-tooltip style="float:left" class="item" effect="dark" content="停止" placement="top">
        <el-button circle class="el-icon-switch-button"></el-button>
      </el-tooltip>
      <el-tooltip style="float:left" class="item" effect="dark" content="暂停/继续" placement="top">
        <el-button circle class="el-icon-video-pause"></el-button>
      </el-tooltip>
      <el-tooltip style="float:left" class="item" effect="dark" content="开始" placement="top">
        <el-button circle class="el-icon-video-play"></el-button>
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
      remark="范围：5000ms~600000ms(即5s~600s)，必须为1的倍数"
    ></inputNL>
    <switchS lable="实时模拟" defaultValue="fullSimulation" :display="true" remark="实时运行对战，可调整速度"></switchS>
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
    <switchS lable="突袭难度" defaultValue="assault" :display="true" remark="自定义敌人属性增幅：1.2倍"></switchS>
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
export default {
  data() {
    return {};
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
  components: { switchS: switchS, inputNL: inputNL }
};
</script>

<style>
</style>