<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass, index) in itemClasses" class="star-item" :class="itemClass" :key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  computed: {
    starType() {
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(this.score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  },
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
@import '../../common/style/style.css';

.star {
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      width: 20px;
      height: 20px;
      margin-right: 22px;
      background-size: 20px 20px;
      &.on {
        @include bg-image('img/star48_on');
      }
      &.half {
        @include bg-image('img/star48_half');
      }
      &.off {
        @include bg-image('img/star48_off');
      }
    }
  }
  &.star-36 {
    .star-item {
      width: 15px;
      height: 15px;
      margin-right: 6px;
      background-size: 15px 15px;
      &.on {
        @include bg-image('img/star36_on');
      }
      &.half {
        @include bg-image('img/star36_half');
      }
      &.off {
        @include bg-image('img/star36_off');
      }
    }
  }
  &.star-24 {
    .star-item {
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &.on {
        @include bg-image('img/star24_on');
      }
      &.half {
        @include bg-image('img/star24_half');
      }
      &.off {
        @include bg-image('img/star24_off');
      }
    }
  }
}
</style>
