<template>
  <div class="verify-container">
    <div class="ivu-row">
      <span class="margin-right-10">订单号：</span>
      <Input style="display:inline-block; width:211px;" size="large" placeholder="支持模糊搜索" v-model="verifySearch.orderNo"></Input>
      <Button size="large" type="info" class="margin-10" @click="searchVerify">查询</Button>
    </div>
    <br>
    <ZTable :column="table.column" :config="table.config" :query="verifySearch" ref="verify"></ZTable>
    <Modal
    v-model="info.status"
    width="80%"
    >
    <h2 slot="header" style="color:#2d8cf0;text-align:center">订单详情</h2>
    <Table :columns="info.column" :data="info.data" stripe :loading="info.loading"></Table>
    <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        table: {
          column: [
            {title: '订单号', key: 'orderNo'},
            {title: '下单时间', key: 'createTime',
            render: (h, p)=>{
              let {row:{createTime}} = p
              return new Date(createTime).toLocaleString()
            }},
            {title: '总吨位', key: 'orderWeight'},
            {title: '总价', key: 'orderPrice'},
            {title: '采购下浮总额', key: 'orderAdjust'},
            {title: '下单人', key: 'userId'},
            {title: '操作',
            align: 'center',
            render: (h, p)=>{
              let {row: {orderNo}, row} = p
              return h('div',{
                style: {
                  textAlign: 'center'
                }
              },[h('Button',{
                props: {
                  type: 'primary'
                },
                'class': {
                      'margin-10': true
                },
                on: {
                  click: ()=>{
                    this.showDetail(orderNo)
                  }
                }
              }, '详情'),h('Button',{
                props: {
                  type: 'warning'
                },
                on: {
                  click: ()=>{
                    this.submitVerify(row)
                  }
                }
              }, '审核')])
            }},
          ],
          config: {
            url: '/zues/api/order/verifylist'
          }
        },
        verifySearch: {
          orderNo: ''
        },
        info: {
          status: false,
          loading: true,
          column: [
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
            {title: '下浮', key: 'orderDcrease'},
            {title: '备注', key: 'comment'}
          ],
          data: []
        },
        verifyParams: {
          orderNo: '',
          operator: '',
          comId: ''
        }
      }
    },
    methods: {
      searchVerify () {
        this.$refs.verify.search()
      },
      showDetail (orderNo) {
        axios.get('/zues/api/order/detail',{params:{orderNo}}).then((res)=>{
          // console.log(res)
          this.info.loading = true
          this.info.status = true
          if(res.data.code === 200){
            let {data:{row}} = res.data
            if(row.length){
              // console.log('hello?')
              this.info.data = row
              this.info.loading = false
            }
          }
        })
      },
      submitVerify (row) {
        // console.log(row)
        this.verifyParams.orderNo = row.orderNo
        this.verifyParams.operator = row.userId
        this.$Modal.confirm({
          title: '',
          content: '是否确认审核？',
          onOk: ()=>{
            axios.post('/zues/api/order/verify', this.verifyParams)
            .then(res=>{
              // console.log(res)
              if(res.status === 200){
                let {data} = res
                if(data.code === 200){
                  this.$Message.success(data.msg)
                  this.searchVerify()
                }else{
                  this.$Message.error(data.msg)
                }
              }
            })
          },
          onCancel: ()=>{
            this.$Message.info("已取消审核")
          }
        })
      }
    }
  }
</script>
<style>
  #app .verify-container{
    text-align: left;
  }
</style>
