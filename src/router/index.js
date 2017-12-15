import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Index from '@/pages/Index'
import Product from '@/pages/order/Product'
import Cart from '@/pages/order/Cart'
// import Price from '@/pages/data/Price'
import Supplier from '@/pages/data/Supplier'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/product',
      children: [
        {
          path: '/product',
          name: 'product',
          component: Product,
        },{
          path: '/cart',
          name: 'cart',
          component: Cart,
        },{
          path: '/price',
          name: 'price',
          component: (resolve) => require(['@/pages/data/Price'], resolve)
        },{
          path: '/supplier',
          name: 'supplier',
          // component: (resolve) => require(['@/pages/data/Supplier'], resolve)
          component: Supplier
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
