<template>
  <div></div>
</template>

<script>
/* eslint-disable */
export default {
  data: () => ({
    total: [],
    a: [1236, 0, 0, 0],
    bit: [1, 2, 3, 6]
  }),
  created() {
    this.loops();
    console.log(this.a);
  },
  methods: {
    loops() {
      for (let i = 1; i <= 3; i++) {
        this.loops2(i);
      }
    },
    loops2(n) {
      this.bit = [1, 2, 3, 6];
      for (let i = 0; i <= 3; i++) {
        for (let j = i === 0 ? 1 : this.bit[i - 1] + 1; j <= 7; j++) {
          if (j <= 5 && this.findNum(j) < 2) {
            this.bit[i] = j;
            break;
          } else if (j <= 5 && this.findNum(j) === 2) {
            continue;
          } else if (j >= 5 && this.findNum(j) <= 2) {
            this.bit[i] = j;
            break;
          }
        }
      }
      this.a[n] = parseInt(
        this.bit[0] + "" + this.bit[1] + this.bit[2] + this.bit[3]
      );
    },
    findNum(n) {
      let sum = 0;
      for (let i in this.a) {
        if (this.check(Math.floor(this.a[i]), n)) sum += 1;
      }
      return sum;
    },
    check(x, b) {
      while (x > 0) {
        if (x % 10 === b) return true;
        x /= 10;
      }
      return false;
    }
  }
};
</script>