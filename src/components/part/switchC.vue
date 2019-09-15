<template>
  <div class="switchBox">
    <div class="switchTable">{{lable}}</div>
    <el-switch
      v-model="value"
      active-color="#13ce66"
      inactive-color="#ff4949"
      @change="setSpecificED"
      style="float:right"
    ></el-switch>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  //标签，最小值，最大值，绑定值
  props: ["lable", "defaultValue"],
  data() {
    return {
      enemyData: this.$store.getters.getEnemyData,
      value: false
    };
  },
  created() {
    //console.log(this.defaultValue);
    this.value = this.getSpecificEnemyData();
  },
  methods: {
    getSpecificEnemyData() {
      let value = false;
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
      //console.log(this.$store.getters.getEnemyData.silenceImmune)
    }
  }
};
</script>

<style>
.switchTable {
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  float: left;
}
.switchBox {
  width: 90%;
  height:30px;
  margin:5%;
}
</style>