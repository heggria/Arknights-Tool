<template>
  <div class="inputBox">
    <div class="inputBoxLable">{{lable}}</div>
    <div style="width:178px">
      <el-input-number
        size="mini"
        v-model="value"
        :min="min"
        :max="max"
        :label="lable"
        @change="setSpecificED"
      ></el-input-number>
    </div>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  //标签，最小值，最大值，绑定值
  props: ["lable", "min", "max", "defaultValue"],
  data() {
    return {
      enemyData: this.$store.getters.getEnemyData,
      value: 0
    };
  },
  created() {
    //console.log(this.defaultValue);
    this.value = this.getSpecificEnemyData();
  },
  methods: {
    getSpecificEnemyData() {
      let value = -1;
      for (let index in this.enemyData) {
        if (this.defaultValue === index) {
          value = this.enemyData[this.defaultValue];
        }
      }
      return value;
    },
    setSpecificED() {
      for (let index in this.enemyData) {
        if (this.defaultValue === index) {
          this.enemyData[this.defaultValue] = this.value;
        }
      }
      this.$store.dispatch("setNewEnemyData", this.enemyData);
      //console.log(this.$store.getters.getEnemyData.atk);
    }
  }
};
</script>

<style>
.inputBox {
  width: 178px;
  height: 60px;
  margin:0 auto;
}
.inputBoxLable {
  float: left;
  line-height: 28px;
  width: 178px;
  font-size: 14px;
  font-weight: bold;
}
</style>