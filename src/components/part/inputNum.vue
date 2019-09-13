<template>
  <div class="inputBox">
    <div class="inputBoxLable">{{lable}}</div>
    <div style="width:178px">
      <el-input-number size="mini" v-model="value" :min="min" :max="max" :label="lable"></el-input-number>
    </div>
  </div>
</template>

<script>
export default {
  props: ["lable", "min", "max"],
  data() {
    return {
      value: 0
    };
  }
};
</script>

<style>
.inputBox {
  width: 178px;
  height: 60px;
}
.inputBoxLable {
  float: left;
  line-height: 28px;
  width: 178px;
  font-size:14px;
  font-weight: bold
}
</style>