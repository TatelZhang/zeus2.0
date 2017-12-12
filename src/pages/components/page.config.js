export default {
    0: { //分公司全权限
        'order': [
            {
                link: '/product',
                name: '现货查询'
            }, {
                link: '/cart',
                name: '购物车'
            }, {
                link: '/order',
                name: '订单列表'
            }, {
                link: '/demandprice',
                name: '需求报价'
            }
        ],
        'demand': [
            {
                link: '/demand',
                name: '带货直发'
            }
        ],
        'data': [
            {
                link: '/supplier',
                name: '供应商'
            }, {
                link: '/price',
                name: '价格表'
            }, {
                link: '/inventory',
                name: '库存表'
            }
        ],
        'manager': [
            {
                link: '/verify',
                name: '订单审核'
            }, {
                link: '/member',
                name: '成员管理'
            }, {
                link: '/record',
                name: '操作记录'
            }, {
                link: '/message',
                name: '消息管理'
            }
        ]
    },
    1: { //总公司全权限
        'order': [
            {
                link: '/product',
                name: '现货查询'
            }
        ],
        'demand': [],
        'data': [
            {
                link: '/setting',
                name: '供应商'
            }, {
                link: '/price',
                name: '价格表'
            }, {
                link: '/inventory',
                name: '库存表'
            }
        ],
        'manager': [
            {
                link: '/verify',
                name: '订单审核'
            }, {
                link: '/member',
                name: '成员管理'
            }, {
                link: '/record',
                name: '操作记录'
            }, {
                link: '/message',
                name: '消息管理'
            }
        ]
    },
    2: { //销售权限
        'order': [
            {
                link: '/product',
                name: '现货查询'
            }, {
                link: '/cart',
                name: '购物车'
            }, {
                link: '/order',
                name: '订单列表'
            }, {
                link: '/demandprice',
                name: '需求报价'
            }
        ],
        'demand': [
            {
                link: '/demand',
                name: '带货直发'
            }
        ],
        'data': [],
        'manager': [],
    },
    3: { //采购权限
        'order': [
            {
                link: '/product',
                name: '现货查询'
            }, {
                link: '/cart',
                name: '购物车'
            }, {
                link: '/order',
                name: '订单列表'
            }, {
                link: '/demandprice',
                name: '需求报价'
            }
        ],
        'demand': [],
        'data': [
            {
                link: '/supplier',
                name: '供应商'
            }, {
                link: '/price',
                name: '价格表'
            }, {
                link: '/inventory',
                name: '库存表'
            }
        ],
        'manager': [],
    }
}