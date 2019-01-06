import Vue from 'vue'
import Router from 'vue-router'
import resource from 'vue-resource'
// import header from 'components/header/header'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

Vue.use(Router)
Vue.use(resource)

const router = new Router({
  routes: [
    {
      path: '/goods',
      name: 'goods',
      push: '/goods',
      component: goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: seller
    }
  ],
  linkActiveClass: 'active'
})

router.push('/goods')

export default router
