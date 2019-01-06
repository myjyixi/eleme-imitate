<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'heighLight': totalPrice}">
            <i class="icon-shopping_cart" :class="{'heighLight': totalPrice}"></i>
          </div>
          <div v-show="totalCount > 0" class="num">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'heighLight': totalPrice}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="[totalPrice < minPrice ? 'not-enough' : 'enough']">
          {{payDesc}}
        </div>
      </div>
      <div class="ball-wrapper">
        <transition-group
          @before-enter="beforeEnter"
          @enter="enter"
          @after-enter="afterEnter"
          :css="false"
        >
          <div v-for="(ball, index) in balls" :key="index" v-show="ball.show" class="ball"></div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
export default {
  data() {
    return {
      balls: [
        {
          show: true
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }, {
          show: false
        }
      ],
      dropBalls: []
    }
  },
  computed: {
    // 下单总价
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    // 下单总数
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    // 价格差
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}起送`
      } else {
        return '去结算'
      }
    }
  },
  methods: {
    // 抛入小球（父组件调用）
    drop(el) {
      // 需要return 只能for
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show && ball.el) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.transition = 'all 3.3s linear'
          el.style.webkitTransform = `translate3d(0, ${y}px, 0) translate3d(${x}px, 0, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0) translate3d(${x}px, 0, 0)`
          console.log(x, y)
        }
      }
    },
    enter(el, done) {
      /* eslint-disable no-unused-vars */
      // 重绘
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
      })
    },
    afterEnter(el) {
      let dropBall = this.dropBalls.shift()
      dropBall.show = false
      el.style.display = 'none'
    }
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 20;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          text-align: center;
          border-radius: 50%;
          background: #2b343c;
          &.heighLight {
            background: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.heighLight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: bold;
          color: #fff;
          background-color: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .price {
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        padding-right: 12px;
        line-height: 24px;
        border-right: 1px solid rgba(255, 255, 255, 0.4);
        font-size: 16px;
        font-weight: bold;
        &.heighLight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: bold;
        &.not-enough {
          background: #2b343c;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
    .ball-wrapper {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
      }
    }
  }
}
</style>
