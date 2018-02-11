<template>
  <div>
    <div class="ivu-row">
      <span class="margin-right-10">销售名称：</span>
      <Input style="display:inline-block; width:211px;" placeholder="支持关键字/模糊查询" size="large" v-model="searchParams.demandUser"></Input>
      <span class="margin-10">客户名称：</span>
      <Input style="display:inline-block; width:211px;" placeholder="支持关键字/模糊查询" size="large" v-model="searchParams.customName"></Input>
      <span class="margin-10">提交日期：</span>
      <DatePicker style="display:inline-block; width:211px;" type="date" placeholder="开始日期" size="large" v-model="searchParams.createTime"></DatePicker>
      <span class="margin-10">-</span>
      <DatePicker type="date" placeholder="结束日期" style="width: 200px"  size="large" v-model="searchParams.endTime"></DatePicker>
      <Button class="margin-10" type="info" icon="ios-search" size="large" @click="search">查询</Button>
    </div>
    <div style="text-align: left; margin: 20px 0;">
      <span style="font-size: 20px;">需求列表：</span>
      <Tabs v-model="currDemand">
        <TabPane label="未报价需求" name="noPriceDemand"></TabPane>
        <TabPane label="待反馈需求" name="repeatingDemand"></TabPane>
        <TabPane label="已反馈报价" name="repeatedDemand"></TabPane>
        <TabPane label="未成交需求" name="canceledDemand"></TabPane>
        <TabPane label="已成交需求" name="dealedDemand"></TabPane>
      </Tabs>
      <ZTable :column="demandHeaders" :config="config" ref="table" :query="searchParams"></ZTable>
    </div>
    <Modal v-model="modalStatus.view">
       <h2 slot="header" style="color: #f60;text-align:center">
        <span>需求明细</span>
      </h2>
      
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        modalStatus: {
          view: false
        },
        currDemand: 'noPriceDemand',
        searchParams: {
          demandUser: '',
          createTime: '',
          endTime: '',
          customName: '',
          state: 0
        },
        demandState: {
          noPriceDemand: {key: 0, value: '未报价需求'},
          repeatingDemand: {key: 1, value: '待反馈'},
          repeatedDemand: {key: 2, value: '已反馈'},
          canceledDemand: {key: 3, value: '未成交'},
          dealedDemand: {key: 4, value: '已成交'}
        },
        config: {
          url: '/zues/api/demand/list'
        },
        demandHeaders: [
          {type: 'index', width: 60, align: 'center'},
          {title: '销售', key: 'userId'},
          {title: '客户名称', key: 'customerName'},
          {title: '提交时间', key: 'createTime',
          render: (h, p) => {
            return this.getTime(p, 'createTime')
          }},
          {title: '报价时间', key: 'priceTime',
          render: (h, p) => {
            return this.getTime(p, 'priceTime')
          }},
          {title: '反馈时间', key: 'feedbackTime',
          render: (h, p) => {
            return this.getTime(p, 'feedbackTime')
          }},
          {title: '报价时长', key: 'priceTimeFragment',
          render: (h, p) => {
            return this.getTimeDelay(p, 'priceTimeFragment')
          }},
          {title: '电话', key: 'customerPhone'},
          {title: '需求明细',
          align: 'center',
          render: (h, p) => {
            return h('Button', {
              props: {type: 'info'},
              on: {
                click: () => {
                  this.showView (p)
                }
              }
            },'查看')
          }},
          {title: '采购', key: 'priceUser'},
          {title: '成交结果', key: 'state',
          render: (h, p) => {
            return this.getResult(p)
            // return 111
          }},
          {title: '原因', key: 'dealReason'},
        ]
      }
    },
    watch: {
      currDemand (val) {
        this.changeDemand(val)        
      }
    },
    methods: {
      search () {
        this.$refs.table.search()
      },
      getTime(p, target) {
        const tar = p.row[target]
        if(!tar) return 
        return new Date(tar).formatDate('yyyy-MM-dd hh:mm')
      },
      getTimeDelay (p) {
        const {row: {priceTime, createTime}} = p
        if(!priceTime) return '未报价'
        return Math.ceil((priceTime - createTime) / 1000 / 60) + '分钟'
      },
      getResult (p) {
        const {row: {state}} = p
        for(let item in this.demandState){
          if(this.demandState[item].key === state){
            return this.demandState[item].value
          }
        }
      },
      changeDemand (demand) {
        this.searchParams.state = this.demandState[demand].key
        this.$refs.table.load({page: 1})
      },
      showView () {
        this.modalStatus.view = true
      }
    }
  }
</script>
