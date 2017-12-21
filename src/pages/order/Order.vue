<template>
  <div>
    <div class="ivu-row">
      <!-- <div class="ivu-col ivu-col-span-1" style="vertical-align: center">订单号</div> -->
      <div class="ivu-col ivu-col-span-3">
        <Input v-model="searchParam.orderNo" placeholder="订单号：支持模糊查询" size="large"></Input>
      </div>
      <div class="ivu-col ivu-col-span-2" style="padding-left: 15px; padding-right: 15px;">
        <Button type="primary" icon="ios-search" size="large" @click="searchOrder" long>查询</Button>
      </div>
      <div class="ivu-col ivu-col-span-2" style="padding-left: 15px; padding-right: 15px;">
        <Button type="primary" icon="ios-download-outline" size="large" long>导出Excel</Button>
      </div>
    </div>
    <br>
    <ZTable :column="table.column" :config="table.config" :query="searchParam" ref="order"></ZTable>
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
                return new Date(row.createTime).toLocaleString()
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
              render: (h, p) => {
                let {row: {validate}} = p
                // console.log(typeof validate)
                return validate ? "已审核" : "未审核"
              }
            },{
              title: '操作',
            }
          ],
          config: {
            url: '/zues/api/order/list'
          }
        }
      }
    },
    methods: {
      searchOrder () {
        this.$refs.order.search()
      }
    }
  }
</script>
