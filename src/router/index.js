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
          meta: {title: '现货查询', page: '宙斯报价'}
        },{
          path: '/cart',
          name: 'cart',
          component: Cart,
          meta: {title: '购物车', page: '宙斯报价'}
        },{
          path: '/demandprice',
          name: 'demandprice',
          component: (resolve) => require(['@/pages/order/demandprice'], resolve),
          meta: {title: "需求报价", page: "宙斯报价"}
        },{
          path: '/order',
          name: 'order',
          component: (resolve) => require(['@/pages/order/Order'], resolve),
          meta: {title: '订单列表', page: '宙斯报价'}
        },{
          path: '/price',
          name: 'price',
          component: (resolve) => require(['@/pages/data/Price'], resolve),
          meta: {title: '价格表', page: '供应商录入'}
        },{
          path: '/supplier',
          name: 'supplier',
          // component: (resolve) => require(['@/pages/data/Supplier'], resolve)
          component: Supplier,
          meta: {title: '供应商', page: '供应商录入'}
        },{
          path: '/inventory',
          name: 'inventory',
          meta: {title: '库存表', page: '供应商录入'},
          component: (resolve) => require(['@/pages/data/Inventory'], resolve)
        },{
          path: '/demand',
          name: 'demand',
          component: (resolve) => require(['@/pages/demand/Demand'], resolve),
          meta: {title: '带货直发', page: '需求管理'}
        },{
          path: '/test',
          name: 'Test',
          component: (resolve) => require(['@/pages/Test'], resolve)
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
