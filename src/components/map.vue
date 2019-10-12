<template>
  <div>
    <div class="main" id="main">
      <!--
      <div v-for="(item,key1) in mapDiv.map" :key="key1" class="row">
        <div v-for="(i,key2) in item" :key="key2" class="row">
          <div
            v-if="mapDiv.tiles[i].tileKey==='tile_forbidden'"
            class="mapdiv forbidden"
          >{{mapDiv.tiles[i].blackboard}}</div>
          <div v-if="mapDiv.tiles[i].tileKey==='tile_start'" class="mapdiv start"></div>
          <div v-else-if="mapDiv.tiles[i].tileKey==='tile_road'" class="mapdiv road"></div>
          <div v-else-if="mapDiv.tiles[i].tileKey==='tile_end'" class="mapdiv end"></div>
          <div
            v-else-if="mapDiv.tiles[i].tileKey==='tile_wall'"
            class="mapdiv wall"
          >{{mapDiv.tiles[i].blackboard}}</div>
          <div v-else-if="mapDiv.tiles[i].tileKey==='tile_floor'" class="mapdiv floor"></div>
          <div v-else-if="mapDiv.tiles[i].tileKey==='tile_telin'" class="mapdiv telin"></div>
          <div v-else-if="mapDiv.tiles[i].tileKey==='tile_telout'" class="mapdiv telout"></div>
          <div v-else-if="mapDiv.tiles[i].tileKey==='tile_healing'" class="mapdiv healing"></div>
          <div v-else-if="mapDiv.tiles[i].tileKey==='tile_hole'" class="mapdiv hole"></div>
          <div v-else class="mapdiv"></div>
        </div>
      </div>
      -->
      <!--
      <div style="position:absolute;" id="3d" class="second">
        <div v-for="(item,key1) in mapDiv.map" :key="key1" class="row">
          <div v-for="(i,key2) in item" :key="key2" class="row">
            <div v-if="mapDiv.tiles[i].tileKey==='tile_forbidden'" class="mapdiv sp2"></div>
            <div v-else-if="mapDiv.tiles[i].tileKey==='tile_wall'" class="mapdiv sp"></div>
            <div v-else-if="mapDiv.tiles[i].tileKey==='tile_flystart'" class="mapdiv sp3"></div>
            <div v-else class="mapdiv"></div>
          </div>
        </div>
      </div>
      -->
      <div style="clear:both;width:0px;"></div>
    </div>
    <div class="container">
      <div class="box">
        <div class="content">
          <div class="bottom">
            <div class="main" id="3d">
              <div v-for="(item,key1) in mapDiv.map" :key="key1" class="row">
                <div v-for="(i,key2) in item" :key="key2" class="row">
                  <div v-if="mapDiv.tiles[i].tileKey==='tile_start'" class="mapdiv start"></div>
                  <div v-else-if="mapDiv.tiles[i].tileKey==='tile_road'" class="mapdiv road"></div>
                  <div v-else-if="mapDiv.tiles[i].tileKey==='tile_end'" class="mapdiv end"></div>
                  <div v-else-if="mapDiv.tiles[i].tileKey==='tile_floor'" class="mapdiv floor"></div>
                  <div v-else-if="mapDiv.tiles[i].tileKey==='tile_telin'" class="mapdiv telin"></div>
                  <div v-else-if="mapDiv.tiles[i].tileKey==='tile_telout'" class="mapdiv telout"></div>
                  <div v-else-if="mapDiv.tiles[i].tileKey==='tile_healing'" class="mapdiv healing"></div>
                  <div v-else-if="mapDiv.tiles[i].tileKey==='tile_hole'" class="mapdiv hole"></div>
                  <div v-else class="mapdiv"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import level from "@/assets/levels/obt/campaign/level_camp_02.json";
export default {
  /* eslint-disable */
  data() {
    return {
      mapDiv: level.mapData
    };
  },
  created() {
    this.$nextTick(function() {
      document.getElementById("main").style.width =
        64 * this.mapDiv.map[0].length + "px";
      document.getElementById("3d").style.width =
        64 * this.mapDiv.map[0].length + "px";
    });
  }
};
</script>

<style>
.row {
  float: left;
}
.mapdiv {
  text-align: center;
  line-height: 60px;
  height: 60px;
  width: 60px;
  float: left;
  margin: 1px;
}
.forbidden {
  background-color: rgb(155, 155, 155);
}
.start {
  background-color: rgb(184, 0, 0);
}
.road {
  background-color: rgb(0, 201, 17);
}
.end {
  background-color: rgb(0, 119, 255);
}
.wall {
  background-color: rgb(0, 148, 141);
}
.floor {
  background-color: rgb(141, 151, 0);
}
.telin {
  background-color: rgb(218, 123, 0);
}
.telout {
  background-color: rgb(218, 123, 0);
}
.flystart {
  background-color: rgb(121, 24, 0);
}
.healing {
  background-color: rgb(0, 168, 76);
}
.hole {
  background-color: rgb(82, 83, 0);
}
.sp {
  background-color: rgb(0, 214, 203);
  border: 1px black solid;
  height: 58px;
  width: 58px;
}
.sp2 {
  background-color: rgb(143, 143, 143);
  border: 1px black solid;
  height: 58px;
  width: 58px;
}
.sp3 {
  background-color: rgb(121, 24, 0);
  border: 1px black solid;
  height: 58px;
  width: 58px;
}
.main {
  margin: 0 auto;
}
.second {
}/*
@keyframes second {
  0% {
    top: -20px;
  }
  40% {
    top: 0px;
  }
  100% {
    top: -20px;
  }
}
@keyframes myfirst {
  0% {
    transform: perspective(20em) rotateX(5deg) rotateY(0deg);
    transform-origin: 50% 100%;
  }
  40% {
    transform: perspective(20em) rotateX(0deg) rotateY(0deg);
    transform-origin: 50% 100%;
  }
  100% {
    transform: perspective(20em) rotateX(20deg) rotateY(0deg);
    transform-origin: 50% 100%;
  }
}*/
.container {
  width: 768px;
  height: 500px;
  margin: 300px auto;
}
.box {
  perspective: 5000px;
  position: relative;
}
.content {
  width: 768px;
  transform-style: preserve-3d;
  /*animation: run 10s infinite;*/
}
.content{
  width: 768px;
  position: absolute;
}
.front {
  transform: translateZ(100px);
  background-color: rgba(36, 85, 75, 0.5);
}
.back {
  transform: translateZ(-100px) rotateY(180deg);
  background-color: rgba(36, 255, 1, 0.5);
}
.left {
  left: -100px;
  transform: rotateY(-90deg);
  background-color: rgba(25, 62, 75, 0.5);
}
.right {
  left: 100px;
  transform: rotateY(90deg);
  background-color: rgba(25, 62, 75, 0.5);
}
.bottom {
  top: 500px;
  transform: rotateX(50deg);
  border: 1px black solid;
}
.top {
  top: 100px;
  transform: rotateX(90deg);
  border: 1px black solid;
}
@keyframes run {
  0% {
    transform: rotateY(0);
  }
  10% {
    transform: rotateY(180deg);
  }
  20% {
    transform: rotateX(180deg);
    transform: rotateY(180deg);
  }
}
</style>