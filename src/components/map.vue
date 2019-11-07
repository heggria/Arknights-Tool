<template>
  <div>
    <div class="main" id="main">
      <div style="position:absolute;" id="3d" class="second">
        <div v-for="(item,key1) in mapDiv.map" :key="key1" class="row">
          <div v-for="(i,key2) in item" :key="key2" class="row">
            <mapD :type="mapDiv.tiles[i].tileKey" :index="i"></mapD>
          </div>
        </div>
      </div>
      <div style="clear:both;width:0px;"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import mapD from "@/components/part/mapDiv";
export default {
  data() {
    return {
      mapDiv: this.$store.state.mapMeta.mapData
    };
  },
  components: { mapD: mapD },
  created() {
    this.init();
    this.$nextTick(function() {
      document.getElementById("3d").style.width =
        64 * this.mapDiv.map[0].length + "px";
    });
  },
  methods: {
    init() {
      for (let i = 0; i < this.mapDiv.map.length; i++) {
        for (let j in this.mapDiv.map[i]) {
          let k = { attackPlace: 0, type: 0 };
          let index = parseInt(
            parseInt(i) * parseInt(this.mapDiv.map[0].length) + parseInt(j)
          );
          if (
            this.$store.state.mapMeta.mapData.tiles[index].tileKey ===
            "tile_wall"
          ) {
            k.type = 2;
          } else if (
            this.$store.state.mapMeta.mapData.tiles[index].tileKey ===
            "tile_road"
          ) {
            k.type = 1;
          }
          this.$store.state.mapMeta.runData[index] = k;
        }
      }
      console.log(this.$store.state.mapMeta.runData);
    }
  }
};
</script>

<style>
.row {
  float: left;
}
.main {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.second {
} /*
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