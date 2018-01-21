<template>
  <div>
    <div class="ivu-row">
        <span class="margin-right-10">订单号：</span>
        <Input style="display: inline-block; width: 211px;" v-model="searchParam.orderNo" placeholder="支持模糊查询" size="large"></Input>
        <Button class="margin-10" type="primary" icon="ios-search" size="large" @click="searchOrder">查询</Button>
        <Button type="primary" icon="ios-download-outline" size="large">导出Excel</Button>
    </div>
    <br>
    <ZTable :column="table.column" :config="table.config" :query="searchParam" ref="order"></ZTable>
    <Modal v-model="modalStatus.orderDetail">
      <Table></Table>
    </Modal>
  </div>
</template>
<script>
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
                // console.log(typeof validate)
                return validate ? "已审核" : "未审核"
              }
            },{
              title: '操作',
              align: 'center',
              width: 300,
              render: (h, p) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'info'
                    },
                    on: {
                      click: () => {
                        this.showOrderDetailModal()
                      }
                    }
                    }, '查看'),
                  h('Button', {
                    'class': ['margin-10'],
                    props: {
                      type: 'success'
                    }
                  }, '打印'),
                  h('Button', {
                    props: {
                      type: 'error'
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
          orderDetail: false
        },
        orderDetailTable: {
          columns: [
            {title: '', key: ''},
          ]
        }
      }
    },
    methods: {
      searchOrder () {
        this.$refs.order.search()
      },
      showOrderDetailModal () {
        this.modalStatus.orderDetail = true;
      }
    }
  }
</script>
