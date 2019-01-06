<template>
  <div class="cartcontrol">
    <transition name="moveScroll">
      <div v-show="food.count > 0" @click="decreaseCart" class="decrease icon-remove_circle_outline"></div>
    </transition>
    <transition name="moveCount">
      <div v-show="food.count > 0" class="count">{{food.count}}</div>
    </transition>
    <div @click="addCart" class="increase icon-add_circle"></div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import Vue from 'vue'

export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    // 加号
    addCart(e) {
      if (!e._constructed) return
      if (!this.food.count) {
        // 允许给food添加count属性
        Vue.set(this.food, 'count', 1)
        this.food.count = 1
      } else {
        this.food.count ++
      }
      this.$emit('drop', e.target)
    },
    // 减号
    decreaseCart(e) {
      if (!e._constructed) return
      if (this.food.count) {
        this.food.count --
      }
    }
  },
  props: {
    food: {
      type: Object
    }
  }
}
</script>

<style lang="scss">
.cartcontrol {
  font-size: 0;
  .decrease, .increase {
    display: inline-block;
    padding: 6px;
    font-size: 24px;
    line-height: 24px;
    color: rgb(0, 160, 220);
  }
  .count {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    width: 12px;
    height: 12px;
    line-height: 24px;
    padding-top: 6px;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
}

// 按钮动画
.moveScroll-enter-active {
  animation: moveScroll .3s ease;
}
.moveScroll-leave-active {
  animation: moveScroll .3s ease reverse;
}

@keyframes moveScroll {
  0% {
    opacity: 0;
    transform: translate3d(24px, 0, 0) rotate(180deg);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0);
  }
}

// 数字动画
.moveCount-enter, .moveCount-leave-to {
  opacity: 0;
  transform: translate3d(6px, 0, 0);
}
.moveCount-enter-active, .moveCount-leave-active {
  transition: all .3s ease;
}
</style>
