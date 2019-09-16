<template>
  <div>
    <el-button @click="test">默认按钮</el-button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      e1: this.$store.state.enemyBaseData.maxHp,
      e2: this.$store.state.temporaryED.maxHp
    };
  },
  methods: {
    test() {
      console.log(this.e1, this.e2);
      this.$store.state.enemyBaseData.maxHp += 1;
      console.log(
        this.$store.state.enemyBaseData.maxHp,
        this.$store.state.temporaryED.maxHp
      );
    }
  }
};
</script>

<style>
</style>