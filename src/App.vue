<template>
  <div id="app">
    <div class="content">
      <v-header :seller="seller"></v-header>
      <div class="tab">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评论</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
      </div>
      <router-view :seller="seller"/>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" scoped>
import header from 'components/header/header'

const ERR_OK = 0

export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this.$http.get('/api/seller').then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = response.data
      }
    })
  },
  components: {
    vHeader: header
  }
}
</script>

<style lang="scss" scoped>
@import 'style/style.scss';
</style>
