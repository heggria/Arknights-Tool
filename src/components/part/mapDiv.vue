<template>
  <div
    :class="['mapdiv',type,type==='tile_wall'||type==='tile_flystart'||type==='tile_hole'?'high':'',display===true?'':'block']"
    @click="onclick()"
    @mouseover="mouseover()"
    @mouseout="mouseout()"
    @mouseup="mouseup()"
  >
    <div
      :class="{
        heightdiv:height,
        sdiv:true,
        attack1:(this.$store.state.mapMeta.runData[this.index].attackPlace===1&&this.$store.state.mapMeta.attackDisplay===true),
        attack2:(this.$store.state.mapMeta.runData[this.index].attackPlace===2&&this.$store.state.mapMeta.attackDisplay===true),
        hoverall:hover,//hover:all
        clickall:click,
        }"
      @mouseover="mouseover()"
      @mouseout="mouseout()"
    ></div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ["type", "index"],
  data() {
    return {
      height: false,
      hover: false,
      click: false,
      display: true
    };
  },
  created() {
    //this.setAttackArea();
    if (
      this.type === "tile_wall" ||
      this.type === "tile_flystart" ||
      this.type === "tile_hole"
    ) {
      this.height = true;
    }
    if (this.type === "tile_forbidden") {
      this.display = false;
      console.log(1)
    }
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
      this.animationResart();
    },
    animationResart() {
      let flag1 = document.getElementsByClassName("attack1");
      if (flag1 != undefined && flag1.length > 0)
        for (let div = 0; div < flag1.length; div++) {
          let a = flag1[div];
          if (a != undefined) {
            a.classList.remove("attack1");
            void a.offsetWidth;
            a.classList.add("attack1");
          }
        }
      flag1 = document.getElementsByClassName("attack2");
      if (flag1 != undefined && flag1.length > 0)
        for (let div = 0; div < flag1.length; div++) {
          let a = flag1[div];
          if (a != undefined) {
            a.classList.remove("attack2");
            void a.offsetWidth;
            a.classList.add("attack2");
          }
        }
    },
    onclick() {
      this.$store.state.mapMeta.char.range.direction = 1;
      this.$store.state.mapMeta.char.position = this.index;
      this.click = true;
      if (this.$store.state.mapMeta.runData[this.index].type === 1)
        this.setAttackArea();
      //console.log(this.$store.state.mapMeta.attackDisplay);
    },
    mouseover() {
      this.hover = true;
    },
    mouseout() {
      this.hover = false;
      this.click = false;
    },
    mouseup() {
      this.click = false;
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
.block{
  background-color: white;
}
.heightdiv {
  position: absolute;
  left: -2px;
  top: -2px;
}
.mapdiv {
  position: relative;
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
div.high > div:hover {
  position: absolute;
  left: -3px;
  top: -3px;
}
.hoverall {
  position: absolute;
  left: -3px;
  top: -3px;
}
.clickall {
  position: absolute;
  left: -4px;
  top: -4px;
}
.attack1,
.attack2 {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
  height: 60px;
  width: 60px;
  overflow: hidden;
}
.tile_forbidden {
  background-color: rgb(100, 100, 100);
}
.tile_start {
  background-color: rgb(255, 100, 100);
}
.tile_road {
  background-color: rgb(140, 200, 140);
}
.tile_end {
  background-color: rgb(100, 100, 255);
}
.tile_wall {
  background-color: rgb(0, 200, 200);
}
.tile_floor {
  background-color: rgb(180, 180, 180);
}
.tile_telin {
  background-color: rgb(245, 228, 207);
}
.tile_telout {
  background-color: rgb(218, 123, 0);
}
.tile_flystart {
  background-color: rgb(200, 50, 50);
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