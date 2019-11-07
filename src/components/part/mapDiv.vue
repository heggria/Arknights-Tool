<template>
  <div
    :class="['mapdiv',type,type==='tile_wall'||type==='tile_flystart'||type==='tile_hole'?'high':'']"
    @click="onclick()"
  >
    <div
      :class="{
        sdiv:true,
        attack1:(this.$store.state.mapMeta.runData[this.index].attackPlace===1),
        attack2:(this.$store.state.mapMeta.runData[this.index].attackPlace===2)
        }"
    >{{this.$store.state.mapMeta.runData[index].type}}</div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ["type", "index"],
  data() {
    return {};
  },
  created() {
    //this.setAttackArea();
  },
  methods: {
    initMap() {
      for (let i in this.$store.state.mapMeta.runData) {
        this.$set(this.$store.state.mapMeta.runData, i, {
          attackPlace: 0,
          type: this.$store.state.mapMeta.runData[i].type
        });
      }
    },
    setAttackArea() {
      this.initMap();
      let t = this.$store.state.mapMeta.char;
      let position = t.position;
      let direction = t.range.direction;
      let grids = t.range.grids;
      let col = this.$store.state.mapMeta.mapData.map.length;
      let row = this.$store.state.mapMeta.mapData.map[0].length;
      let p = position - (position % row);
      // console.log(((t.position - (t.position % row)) / row + 1) * row);
      for (let x in this.$store.state.mapMeta.runData) {
        for (let i in grids) {
          x = parseInt(x);
          if (
            (direction === 1 &&
              x === position + grids[i].col + row * grids[i].row &&
              x < p + (grids[i].row + 1) * row &&
              x >= p + grids[i].row * row) ||
            (direction === 2 &&
              x === position - grids[i].col * row + grids[i].row &&
              x < p - (grids[i].col - 1) * row &&
              x >= p + grids[i].col * row) ||
            (direction === 3 &&
              x === position - grids[i].col - row * grids[i].row &&
              x < p - (grids[i].row - 1) * row &&
              x >= p - grids[i].row * row) ||
            (direction === 4 &&
              x === position + grids[i].col * row - grids[i].row &&
              x < p + (grids[i].col + 1) * row &&
              x >= p + grids[i].col * row)
          ) {
            this.$store.state.mapMeta.runData[x].attackPlace = 2;
            break;
          }
        }
      }
      this.$store.state.mapMeta.runData[this.index].attackPlace = 1;
    },
    onclick() {
      this.$store.state.mapMeta.char.range.direction = 1;
      this.$store.state.mapMeta.char.position = this.index;
      if (this.$store.state.mapMeta.runData[this.index].type === 2)
        this.setAttackArea();
      //console.log(this.$store.state.mapMeta.runData);
    }
  }
}; /*
document.oncontextmenu = function() {
  return false;
};*/
</script>

<style>
:root {
  --stripe-size: 30.5px;
  --color0: rgba(194, 78, 0, 0.466);
  --color1: rgba(194, 0, 0, 0.466);
  --color2: #00000000;
  --duration: 1s;
}
.mapdiv {
  text-align: center;
  line-height: 60px;
  height: 60px;
  width: 60px;
  float: left;
  margin: 0.5px;
  overflow: hidden;
}
.mapdiv:hover {
  border: 3px black solid;
  height: 54px;
  width: 54px;
  line-height: 54px;
}
.mapdiv:active {
  border: 4px black solid;
  height: 52px;
  width: 52px;
  line-height: 52px;
  background-color: rgb(211, 197, 0);
}
.attack1,
.attack2 {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.attack1::before,
.attack2::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% + var(--stripe-size));
  height: 100%;
  -webkit-animation: stripeTransform var(--duration) linear infinite;
  animation: stripeTransform var(--duration) linear infinite;
}
.attack1::before {
  background: repeating-linear-gradient(
    135deg,
    var(--color2) 25%,
    var(--color2) 50%,
    var(--color1) 50%,
    var(--color1) 75%
  );
  background-size: var(--stripe-size) var(--stripe-size);
}
.attack2::before {
  background: repeating-linear-gradient(
    135deg,
    var(--color2) 25%,
    var(--color2) 50%,
    var(--color0) 50%,
    var(--color0) 75%
  );
  background-size: var(--stripe-size) var(--stripe-size);
}
@-webkit-keyframes stripeTransform {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(calc(var(--stripe-size) * -1));
    transform: translateX(calc(var(--stripe-size) * -1));
  }
}
@keyframes stripeTransform {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(calc(var(--stripe-size) * -1));
    transform: translateX(calc(var(--stripe-size) * -1));
  }
}
.sdiv {
  height: 100%;
  width: 100%;
}
.tile_forbidden {
  background-color: rgb(155, 155, 155);
}
.tile_start {
  background-color: rgb(209, 0, 0);
}
.tile_road {
  background-color: rgb(152, 206, 157);
}
.tile_end {
  background-color: rgb(0, 119, 255);
}
.tile_wall {
  background-color: rgb(21, 199, 190);
}
.tile_floor {
  background-color: rgb(154, 158, 89);
}
.tile_telin {
  background-color: rgb(218, 123, 0);
}
.tile_telout {
  background-color: rgb(218, 123, 0);
}
.tile_flystart {
  background-color: rgb(177, 86, 63);
}
.tile_healing {
  background-color: rgb(0, 168, 76);
}
.high {
  border: 2px black solid;
  height: 56px;
  width: 56px;
  line-height: 56px;
}
.tile_hole {
}
</style>