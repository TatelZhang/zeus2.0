//未报价需求  /zues/api/demand/list?demandUser=&createTime=&endTime=&customName=&state=0&page=1

// 待反馈需求 /zues/api/demand/list?demandUser=&createTime=&endTime=&customName=&state=1&page=1

// 已反馈报价 /zues/api/demand/list?demandUser=&createTime=&endTime=&customName=&state=2&page=1

// 未成交需求 /zues/api/demand/list?demandUser=&createTime=&endTime=&customName=&state=3&page=1


// 成交需求   /zues/api/demand/list?demandUser=&createTime=&endTime=&customName=&state=4&page=1


headers: {
    noPriceDemand: [
      {
      title: '#',
      width: 60,
      align: 'center',
      render: (h, p) =>{
        let {row:{_index}} = p
        return _index+1
      }
    },
    {
      title: '销售',
      key: 'userId'
    },{
      title: '客户名称',
      key: 'customerName',
    },{
      title: '提交时间',
      width: 200,
      key: 'createTime',
      render: (h, p)=>{
        return this.getTime(p, 'createTime')
      }
    },{
      title: '报价时间',
      key: 'priceTime',
      width: 200,
      render: (h, p) => {
        return this.getTime(p, 'priceTime')
      }
    },{
      title: '反馈时间',
      key: 'feedbackTime',
      width: 200,

    },{
      title: '报价时长'
    },{
      title: '电话',
      key: 'customerPhone'
    },{
      title: '需求明细',
      render: (h, p) =>{
        return h('Button',{
          props:{
            type: 'info'
            }, 
            on: {
              click: () =>{
                this.$Message.info("hello")
              }
            }
          }, 
        '点击查看')
      }
    },{
      title: '采购',
      key: 'priceUser'
    },{
      title: '成交结果',
      state: 'state'
    },{
      title: '原因',
      key: 'dealReason'
    },{
      title: '操作'
    }],
  repeatingDemand: [
    {title: '#'},
    {title: '销售', key: 'userId'},
    {title: '客户名称', key: 'customerName'},
    {title: '提交时间', key: 'createTime'},
    {title: '报价时间', key: 'priceTime'},
    {title: '反馈时间', key: 'feedbackTime'},
    {title: '报价时长', key: ''},
    {title: '电话', key: 'customerPhone'},
    {title: '需求明细', key: ''},
    {title: '采购', key: 'priceUser'},
    {title: '成交结果', key: 'state'},
    {title: '原因', key: 'dealReason'},
    {title: '交易反馈', key: ''},
  ],
  repeatedDemand: [
    {title: '#'},
    {title: '销售', key: 'userId'},
    {title: '客户名称', key: 'customerName'},
    {title: '提交时间', key: 'createTime'},
    {title: '报价时间', key: 'priceTime'},
    {title: '反馈时间', key: 'feedbackTime'},
    {title: '报价时长', key: ''},
    {title: '电话', key: 'customerPhone'},
    {title: '需求明细', key: ''},
    {title: '采购', key: 'priceUser'},
    {title: '成交结果', key: 'state'},
    {title: '原因', key: 'dealReason'},
    {title: '交易反馈', key: ''},
  ],
  canceledDemand: [
    {title: '#'},
    {title: '销售', key: 'userId'},
    {title: '客户名称', key: 'customerName'},
    {title: '提交时间', key: 'createTime'},
    {title: '报价时间', key: 'priceTime'},
    {title: '反馈时间', key: 'feedbackTime'},
    {title: '报价时长', key: ''},
    {title: '电话', key: 'customerPhone'},
    {title: '需求明细', key: ''},
    {title: '采购', key: 'priceUser'},
    {title: '成交结果', key: 'state'},
    {title: '原因', key: 'dealReason'},
  ],
  dealedDemand: [
    {title: '#'},
    {title: '销售', key: 'userId'},
    {title: '客户名称', key: 'customerName'},
    {title: '提交时间', key: 'createTime'},
    {title: '报价时间', key: 'priceTime'},
    {title: '反馈时间', key: 'feedbackTime'},
    {title: '报价时长', key: ''},
    {title: '电话', key: 'customerPhone'},
    {title: '需求明细', key: ''},
    {title: '采购', key: 'priceUser'},
    {title: '成交结果', key: 'state'},
    {title: '原因', key: 'dealReason'},
  ]
  }


  //

  [
    {
    title: '#',
    width: 60,
    align: 'center',
    render: (h, p) =>{
      let {row:{_index}} = p
      return _index+1
    }
  },
  {
    title: '销售',
    key: 'userId'
  },{
    title: '客户名称',
    key: 'customerName',
  },{
    title: '提交时间',
    width: 200,
    key: 'createTime',
    render: (h, p)=>{
      return this.getTime(p, 'createTime')
    }
  },{
    title: '报价时间',
    key: 'priceTime',
    width: 200,
    render: (h, p) => {
      return this.getTime(p, 'priceTime')
    }
  },{
    title: '反馈时间',
    key: 'feedbackTime',
    width: 200,

  },{
    title: '报价时长'
  },{
    title: '电话',
    key: 'customerPhone'
  },{
    title: '需求明细',
    render: (h, p) =>{
      return h('Button',{
        props:{
          type: 'info'
          }, 
          on: {
            click: () =>{
              this.$Message.info("hello")
            }
          }
        }, 
      '点击查看')
    }
  },{
    title: '采购',
    key: 'priceUser'
  },{
    title: '成交结果',
    state: 'state'
  },{
    title: '原因',
    key: 'dealReason'
  }]

// product column
  column: [
    {
      title: '规格',
      key: 'spec',
    }, {
      title: '长度',
      key: 'long',
      width: 80
    }, {
      title: '更新时间',
      key: 'lastUpdateTime',
    }, {
      title: '类别',
      key: 'type',
      width: 80
    }, {
      title: '供应商',
      key: 'supplierName',
    }, {
      title: '开单价',
      key: 'purePrice',
      sortable: true
    }, {
      title: '到岸价',
      key: 'value',
      sortable: true
    }, {
      title: '库存',
      key: 'inventoryAmount',
      sortable: true
    }, {
      title: '包装',
      key: 'perAmount',
      width: 80
    }, {
      title: '支重',
      render (h, {row}) {//计算单支重量
        var specArr = row.spec.split("*");
        var height = Number(specArr[0]);
        var width = Number(specArr[1]);
        var land = Number(specArr[2]);
        var long = Number(row.long);
        var perimeter = height * 2 + width * 2;
        return ((perimeter / 3.14 - land) * land * long * 0.02466).toFixed(2) + 'kg';
      }
    }, {
      title: '总重',
      render (h, {row}) {//计算总吨位
        var specArr = row.spec.split("*");
        var height = Number(specArr[0]);
        var width = Number(specArr[1]);
        var land = Number(specArr[2]);
        var long = Number(row.long);
        var perimeter = height * 2 + width * 2;
        var amount = Number(row.perAmount);
        var inventory = Number(row.inventoryAmount);
        return ((perimeter / 3.14 - land) * land * long * 0.02466 * amount * inventory / 1000).toFixed(2) + '吨';
      }
    }, {
      title: '运费',
      key: 'freight',
      sortable: true
    }, {
      title: '出厂价',
      key: 'value',
      sortable: true
    }, {
      title: '厂家优惠',
      key: 'benifit',
      sortable: true
    }, {
      title: '操作',
      render (h, params) {
        return h('div',
        [
          h('Button',{
            props: {
              type: 'success',
              disabled: !params.row.value || params.row.value == 0
            },
            on: {
              click: () => {

              }
            }
          },'下单'),
          h('Button',{
            style: {
              'margin-left': '10px'
            },
            props: {
              type: 'info'
            },
            on: {
              click: () => {

              }
            }
          },'标记')
        ]);
      },
      width: 180
    }
  ]