<template>
  <div class="switchBox">
    <div class="switchTable">{{lable}}</div>
    <el-tooltip style="float:left" class="item" effect="dark" :content="remark" placement="top">
      <el-button
        v-if="display"
        style="padding:0;color:#646464;line-height:38px"
        type="text"
        class="el-icon-question"
      ></el-button>
    </el-tooltip>
    <el-switch
      id="a"
      v-model="value"
      active-color="#13ce66"
      inactive-color="#ff4949"
      style="float:right;height:40px;line-height:40px"
      @change="setConfig"
      :disabled="state"
    ></el-switch>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  //标签，最小值，最大值，绑定值
  props: ["lable", "defaultValue","state", "display", "remark"],
  data() {
    return {
      config: this.$store.getters.getConfig,
      value: false
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
      //console.log(this.$store.getters.getConfig);
    }
  }
};
</script>

<style>
.switchTable {
  font-weight: bold;
  font-size: 12px;
  line-height: 40px;
  float: left;
}
.switchBox {
  width: 90%;
  height: 40px;
  line-height: 40px;
  margin: 0 5%;
}
</style>