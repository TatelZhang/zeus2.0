<template>
  <div class="demand">
    <div class="ivu-row">
      <span class="margin-right-10">销售名称：</span>
      <Input style="display:inline-block; width:211px;" placeholder="支持关键字/模糊查询" size="large" v-model="searchParams.demandUser"></Input>
      <span class="margin-10">客户名称：</span>
      <Input style="display:inline-block; width:211px;" placeholder="支持关键字/模糊查询" size="large" v-model="searchParams.customName"></Input>
      <span class="margin-10">提交日期：</span>
      <DatePicker style="display:inline-block; width:211px;" type="date" placeholder="开始日期" size="large" v-model="searchParams.createTime"></DatePicker>
      <span class="margin-10">-</span>
      <DatePicker type="date" placeholder="结束日期" style="width: 200px"  size="large" v-model="searchParams.endTime"></DatePicker>
      <Button class="margin-10" type="info" icon="ios-search" size="large" @click="searchDemand">查询</Button>
    </div>
    <div>
      <div style="text-align: left;font-size: 20px; margin: 10px 0;">
        <span style="vertical-align: middle">需求列表：</span>
        <div class="ivu-alert ivu-alert-success">
          <Button size="large" class="margin-right-10" type="primary" @click="modalStatus.upDemand = true">需求上传</Button>
          <Button size="large" class="margin-right-10" type="primary">导出需求</Button>
          <Button size="large" class="margin-right-10" type="primary">导出需求详情</Button>
        </div>
      </div>
      <Tabs v-model="currTableHeaderFlag">
        <TabPane label="未报价需求" name="noPriceDemand"></TabPane>
        <TabPane label="待反馈需求" name="repeatingDemand"></TabPane>
        <TabPane label="已反馈报价" name="repeatedDemand"></TabPane>
        <TabPane label="未成交需求" name="canceledDemand"></TabPane>
        <TabPane label="已成交需求" name="dealedDemand"></TabPane>
      </Tabs> 
      <ZTable :column="currHeaders" :config="table.config" ref="table" :query="searchParams"></ZTable>
    </div>
    <Modal 
    v-model="modalStatus.upDemand" 
    width="60%"
    :mask-closable="false"
    >
    <h2 slot="header" style="color: #f60;text-align:center">
      <span>需求上传</span>
    </h2>
    <div>
      <div>

      </div>
    </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        searchParams: {
          demandUser: '',
          customName: '',
          createTime: '',
          endTime: '',
          state: 0
        },
        modalStatus: {
          upDemand: false,
        },
        table: {
          baseHeaders: [
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
          }],
          operate: {
            title: '操作类型',

          },
          repeat: {
            title: '交易反馈'
          },
          config: {
            url: '/zues/api/demand/list'
          }
        },
        currTableHeaderFlag: 'noPriceDemand',
        currHeaders: [],
        demandStatus: {
          noPriceDemand: {key: 0, value: '未报价需求'},
          repeatingDemand: {key: 1, value: '待反馈'},
          repeatedDemand: {key: 2, value: '已反馈'},
          canceledDemand: {key: 3, value: '未成交'},
          dealedDemand: {key: 4, value: '已成交'}
        }
      }
    },
    watch: {
      // 更改当前
      currTableHeaderFlag (val){
        this.searchParams.state = this.demandStatus[val].key
        this.changeCurrHeaders()
        this.searchDemand()
      }
    },
    methods: {
      searchDemand () {
        this.$refs.table.search()
      },
      getTime (p, target) {
        let gTime = p.row[target]
        if(!gTime) return 
        return new Date(gTime).toLocaleString()
      },
      changeCurrHeaders () {
        this.currHeaders = [...this.table.baseHeaders]
        if(this.searchParams.state ===0){
          this.currHeaders.push(this.table.operate)
        }else if(this.searchParams.state === 1 || this.searchParams.state === 2){
          this.currHeaders.push(this.table.repeat)
        }
      }
    },
    mounted () {
      this.changeCurrHeaders()
    }
  }
</script>
<style>
#app .demand {
  text-align: left;
}
.customer-list{
  border: 2px dashed #d3dce6;
  margin-bottom: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.customer-list:hover {
  border: 2px dashed #f7ba2a;
}
</style>
