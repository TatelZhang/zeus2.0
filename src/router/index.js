import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Index from '@/pages/Index'
import Product from '@/pages/order/Product'
import Cart from '@/pages/order/Cart'
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
          component: (resolve) => require(['@/pages/order/Demandprice'], resolve),
          meta: {title: "需求报价", page: "宙斯报价"}
        },{
          path: '/order',
          name: 'order',
          component: (resolve) => require(['@/pages/order/Order'], resolve),
          meta: {title: '订单列表', page: '宙斯报价'}
        },{
          path: '/printconf',
          name: 'printconf',
          component: (resolve) => require(['@/pages/order/PrintConf'], resolve),
          meta: {title: '打印设置', page: '宙斯报价'}
        },{
          path: '/price',
          name: 'price',
          component: (resolve) => require(['@/pages/data/Price'], resolve),
          meta: {title: '价格表', page: '供应商录入'}
        },{
          path: '/supplier',
          name: 'supplier',
          component: Supplier,
          meta: {title: '供应商', page: '供应商录入'}
        },{
          path: '/inventory',
          name: 'inventory',
          component: (resolve) => require(['@/pages/data/Inventory'], resolve),
          meta: {title: '库存表', page: '供应商录入'}
        },{
          path: '/demand',
          name: 'demand',
          component: (resolve) => require(['@/pages/demand/Demand'], resolve),
          meta: {title: '带货直发', page: '需求管理'}
        },{
          path: '/demandup',
          name: 'demandup',
          component: (resolve) => require(['@/pages/demand/Demandup'], resolve),
          meta: {title: '需求上传', page: '需求管理'}
        },{
          path: '/demandch',
          name: 'demandch',
          component: (resolve) => require(['@/pages/demand/Demandch'], resolve),
          meta: {title: '需求更改', page: '需求管理'}
        },{
          path: '/verify',
          name: 'verify',
          component: (resolve) => require(['@/pages/manager/Verify'], resolve),
          meta: {title: '订单审核', page: '管理员后台'}
        },{
          path: '/member',
          name: 'member',
          component: (resolve) => require(['@/pages/manager/Member'], resolve),
          meta: {title: '成员管理', page: '管理员后台'}
        },{
          path: '/record',
          name: 'record',
          component: (resolve) => require(['@/pages/manager/Record'], resolve),
          meta: {title: '操作记录', page: '管理员后台'}
        },{
          path: '/message',
          name: 'message',
          component: (resolve) => require(['@/pages/manager/Message'], resolve),
          meta: {title: '消息管理', page: '管理员后台'}
        },{
          path: '/test',
          name: 'test',
          component: (resolve) => require(['@/pages/Test'], resolve)
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {title: '欢迎登陆奎鑫采销系统'}
    }
  ]
})
