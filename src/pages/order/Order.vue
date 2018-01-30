<template>
  <div>
    <div class="ivu-row">
        <span class="margin-right-10">订单号：</span>
        <Input style="display: inline-block; width: 211px;" v-model="searchParam.orderNo" placeholder="支持模糊查询" size="large"></Input>
        <Button class="margin-10" type="primary" icon="ios-search" size="large" @click="searchOrder">查询</Button>
        <Button type="primary" icon="ios-download-outline" size="large" @click="exportOrder">导出Excel</Button>
    </div>
    <br>
    <ZTable :column="table.column" :config="table.config" :query="searchParam" ref="order"></ZTable>
    <Modal v-model="modalStatus.orderDetail" width="90%">
       <h2 slot="header" style="text-align:center">
        <span>订单详细</span>
      </h2> 
      <Table :columns="detailHeaders" :data="orderDetailTable.data" stripe border></Table>
      <div slot="footer">
        <Button type="warning" size="large" @click="exportOrderDetail">导出Excel</Button>
      </div>
    </Modal>
    <Modal v-model="modalStatus.changeSingle" width="20%" ref="test">
      <h2 slot="header" style="text-align:center">
        <span>修改订单</span>
      </h2> 
      <div>
        <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend margin-bottom ">
          <div class="ivu-input-group-prepend">
            <span>下浮</span>
          </div>
          <input type="number" class="ivu-input ivu-input-large" v-model="singleItem.orderDcrease">
        </div>
        <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend margin-bottom ">
          <div class="ivu-input-group-prepend">
            <span>重量</span>
          </div>
          <input type="number" class="ivu-input ivu-input-large" v-model="singleItem.Weight">
        </div>
        <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend margin-bottom ">
          <div class="ivu-input-group-prepend">
            <span>单价</span>
          </div>
          <input type="number" class="ivu-input ivu-input-large" v-model="singleItem.unitPrice">
        </div>
        <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend margin-bottom ">
          <div class="ivu-input-group-prepend">
            <span>数量</span>
          </div>
          <input type="number" class="ivu-input ivu-input-large" v-model="singleItem.orderAmount">
        </div>
        <Input type="textarea" placeholder="填写备注" v-model="singleItem.comment"></Input>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="singleItemUpdate">修改</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import 'printthis'
  export default {
    data () {
      return {
        searchParam: {
          orderNo: ''
        },
        table: {
          column: [
            {
              title: '订单号',
              key: 'orderNo'
            },{
              title: '下单时间',
              key: 'createTime',
              render: (h, p) => {
                let {row} = p
                return new Date(row.createTime).formatDate('yyyy-MM-dd hh:mm')
              }
            },{
              title: '供应商',
              key: 'supplierName'
            },{
              title: '总吨位',
              key: 'orderWeight'
            },{
              title: '总价',
              key: 'orderPrice'
            },{
              title: '下浮总额',
              key: 'orderAdjust'
            },{
              title: '下单人',
              key: 'userId'
            },{
              title: '状态',
              key: 'validate',
              width: 80,
              render: (h, p) => {
                let {row: {validate}} = p
                return validate ? "已审核" : "未审核"
              }
            },{
              title: '操作',
              align: 'center',
              width: 300,
              render: (h, p) => {
                let {row: {orderNo, validate}, row} = p;
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'info'
                    },
                    on: {
                      click: () => {
                        this.showOrderDetailModal(row)
                      }
                    }
                    }, '查看'),
                  h('Button', {
                    'class': ['margin-10'],
                    props: {
                      type: 'success'
                    },
                    on: {
                      click: () =>{
                        this.showPrint(orderNo)
                      }
                    }
                  }, '打印'),
                  h('Button', {
                    props: {
                      type: 'error',
                      disabled: Boolean(validate)
                    },
                    on: {
                      click: () => {
                        this.confirmDelOrder(orderNo)
                      }
                    }
                  }, '删除')
                ])
              }
            }
          ],
          config: {
            url: '/zues/api/order/list'
          }
        },
        modalStatus: {
          orderDetail: false,
          changeSingle: false
        },
        orderDetailTable: { //当前订单详情
          columns: [
            {title: '规格', key: 'spec'},
            {title: '类型', key: 'type'},
            {title: '供应商', key: 'supplierName'},
            {title: '数量', key: 'orderAmount'},
            {title: '单价', key: 'unitPrice'},
            {title: '到岸价', key: 'daPrice'},
            {title: '最低价', key: 'minPrice'},
            {title: '最低价供应商', key: 'minSupplier'},
            {title: '最低价库存', key: 'minInventory'},
            {title: '重量', key: 'Weight'},
            {title: '总下浮', key: 'orderDcrease'},
            {title: '单位下浮', 
            render: (h, p) => {
              let {row: {orderDcrease, Weight}} = p;
              return (Number(orderDcrease) / Number(Weight)).toFixed(2)
            }},
            {title: '备注', key: 'comment'},
          ],
          operate: {
            title: '操作', 
            align: 'center',
            render: (h, p) => {
              let {row, index} = p;
              return h('Button', {
                props: {
                  type: 'warning'
                },
                on: {
                  click: () => {
                    this.singleEdit(row, index)
                  }
                }
              }, '修改')
            }},
          data: [],  // 用于保存当前订单数据
          currOrderNo: '',
          validate: 0,
          detailIndex: null  // 当前订单详情item索引
        },
        singleItem: { // 用于更新单条item的参数
          orderDetailId: '',  // 详情ID ~
          orderNo: '',        // 订单号 ~
          comment: '',        // 评论
          orderDcrease: '',   // 下浮价格
          unitPrice: '',      // 单价
          orderAmount: '',    // 数量
          Weight: '',         // 重量
        },
      }
    },
    computed: {
      // 订单详情表头, 根据validate 判断订单是否已经审核，取消操作权限
      detailHeaders () {
        let headers = [...this.orderDetailTable.columns]
        if(!this.orderDetailTable.validate){
          headers.push(this.orderDetailTable.operate)
        }
        return headers
      }
    },
    methods: {
      searchOrder () {
        this.$refs.order.search()
      },
      // 打开订单查看Modal
      showOrderDetailModal (row) {
        let {orderNo, validate} = row
        this.orderDetailTable.validate = validate
        this.modalStatus.orderDetail = true;
        this.getOrderDetailData(orderNo)
      },
      // 获取订单数据
      getOrderDetailData (orderNo) {
        this.orderDetailTable.currOrderNo = orderNo
        axios.get('/zues/api/order/detail', {params: {orderNo}}).then(({status, data}) => {
          this.orderDetailTable.data = data.data.row
          // console.log(data)
        })
      },
      // 导出订单Excel
      exportOrderDetail () {
        let orderNo = this.orderDetailTable.currOrderNo;
        window.open(`/zues/api/export/orderdetail/${orderNo}订单详情.xls?orderNo=${orderNo}`);
      },
      // 导出当日Excel
      exportOrder () {
        var date = new Date().formatDate('yyyyMMdd');
        window.open(`/zues/api/export/order/订单列表${date}.xls`);
      },
      // 删除订单确认
      confirmDelOrder (orderNo) {
        this.$Modal.confirm({title: '确认', content: `确认删除订单?`,
        onOk: () => {
          this.deleteOrder(orderNo)
        }})
      },
      // 删除订单
      deleteOrder (orderNo) {
        axios.post('/zues/api/order/remove', {orderNo}).then(({status, data}) => {
          if(status === 200 && data.code === 200){
            this.$Message.success('删除成功!')
            this.searchOrder()
          }
        })
      },
      // 编辑单条订单详情
      singleEdit (row, index) {
        this.orderDetailTable.detailIndex = index
        this.modalStatus.changeSingle = true
        for(let item in this.singleItem){
          this.singleItem[item] = row[item]
        }
      },
      // 弹框数据本地更新
      updateDetailLocal () {
        Object.assign(this.orderDetailTable.data[this.orderDetailTable.detailIndex], this.singleItem)
      },
      singleItemUpdate () {
        axios.post('/zues/api/orderdetail/update', this.singleItem).then(({status, data}) => {
          if(status === 200 && data.code === 200){
            this.updateDetailLocal()
            this.$Message.success('更新成功！')
            this.modalStatus.changeSingle = false
          }
        })
      },
      // 跳转到打印页面
      showPrint (orderNo) {
        this.$router.push({name: 'printconf', query: {orderNo}})
      }
    }
  }
</script>
<style>
  .margin-bottom {
    margin-bottom: 10px;
  }
</style>
