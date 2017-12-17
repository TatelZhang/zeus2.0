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
          meta: {title: '现货查询'}
        },{
          path: '/cart',
          name: 'cart',
          component: Cart,
          meta: {title: '购物车'}
        },{
          path: '/price',
          name: 'price',
          component: (resolve) => require(['@/pages/data/Price'], resolve),
          meta: {title: '价格表'}
        },{
          path: '/supplier',
          name: 'supplier',
          // component: (resolve) => require(['@/pages/data/Supplier'], resolve)
          component: Supplier,
          meta: {title: '供应商'}
        },{
          path: '/test',
          name: 'Test',
          component: (resolve) => require(['@/pages/Test'], resolve)
        },{
          path: '/inventory',
          name: 'Inventory',
          meta: {title: '库存表'},
          component: (resolve) => require(['@/pages/data/Inventory'], resolve)
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
