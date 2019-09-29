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
    <div style="float:right;line-height:35px">
      <el-select
        v-model="value"
        placeholder="请选择"
        style="width:95px;"
        size="mini"
        @change="changeConfig"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  //标签，最小值，最大值，绑定值
  props: ["lable", "options", "display", "remark", "ctype"],
  data() {
    return {
      value: ""
    };
  },
  methods: {
    getValue() {
      if (this.ctype === true) {
        let x = this.$store.state.config.cV;
        this.value = x;
      } else {
        let x = this.$store.state.config.eV;
        this.value = x;
      }
    },
    // 暂时这样存
    changeConfig() {
      if (this.ctype === true) {
        this.$store.state.config.cV=this.value;
      } else {
        this.$store.state.config.eV=this.value;
      }
    }
  },
  created(){
    this.getValue();
  }
};
</script>
<style>
</style>