<template>
  <div class="value">
    <div class="title">
      <span>{{title}}</span>
    </div>
    <div class="num">{{value}}</div>
  </div>
</template>

<script>
export default {
  props: ["title", "value"]
};
</script>

<style>
.value {
  margin-top: 20px;
}
.num {
  font-size: 14px;
  line-height: 20px;
  float: left;
  height: 20px;
  -webkit-font-smoothing: antialiased;
  font-weight: 600;
  padding: 3px;
  width: 60px;
  color: rgb(50, 50, 50);
  border: 1px solid rgb(200, 200, 200);
}
.title {
  padding: 4px;
  width: 100px;
  margin-bottom: 6px;
  float: left;
  font-size: 12px;
  line-height: 20px;
  height: 20px;
  background-color: rgb(100, 100, 100);
  color: white;
  -webkit-font-smoothing: antialiased;
  font-weight: 400;
}
</style>