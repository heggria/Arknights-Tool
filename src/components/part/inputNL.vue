<template>
  <div class="switchBox2">
    <div class="switchTable2">{{lable}}</div>
    <el-tooltip style="float:left" class="item" effect="dark" :content="remark" placement="top">
      <el-button
        v-if="display"
        style="padding:0;color:#646464;line-height:38px"
        type="text"
        class="el-icon-question"
      ></el-button>
    </el-tooltip>
    <div style="float:right;line-height:40px">
      <el-input-number
        size="mini"
        v-model="value"
        :disabled="state"
        :min="min"
        :max="max"
        :label="lable"
        :step="step"
        @blur="setConfig"
        controls-position="right"
        style="width:75px;"
        :step-strictly="true"
        :controls="false"
      ></el-input-number>
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  //标签，最小值，最大值，绑定值
  props: ["lable","state", "min", "max", "defaultValue", "step", "display", "remark"],
  data() {
    return {
      config: this.$store.getters.getConfig,
      value: 0
    };
  },
  created() {
    this.value = this.getConfig();
  },
  methods: {
    getConfig() {
      let value = false;
      for (let index in this.config) {
        if (this.defaultValue === index) {
          value = this.config[this.defaultValue];
        }
      }
      return value;
    },
    setConfig() {
      for (let index in this.config) {
        if (this.defaultValue === index) {
          this.config[this.defaultValue] = this.value;
        }
      }
      this.$store.dispatch("setConfig", this.config);
      console.log(this.$store.getters.getConfig);
    }
  }
};
</script>

<style>
.switchTable2 {
  font-weight: bold;
  font-size: 12px;
  float: left;
  line-height: 40px;
}
.switchBox2 {
  width: 90%;
  line-height: 40px;
  height: 40px;
  margin: 0 5%;
}
</style>