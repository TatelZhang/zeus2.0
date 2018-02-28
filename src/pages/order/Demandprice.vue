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
      <ZTable :column="demandHeader" :config="config" ref="table" :query="searchParams"></ZTable>
    </div>
    <!-- 需求明细查看 -->
    <Modal v-model="modalStatus.view" width="50%" class="demand-detail" @on-cancel="detail.loading = true">
       <h2 slot="header" style="color: #f60;text-align:center">
        <span>需求明细</span>
      </h2>
      <div class="ivu-alert ivu-alert-info">
        <div class="info-item">
          <span class="label">目的地：</span>
          <span>{{detail.destination}}</span>
        </div>
        <div class="info-item">
          <span class="label">总重量：</span>
          <span>{{detail.demandWeight}}</span>
        </div>
        <div class="info-item">
          <span class="label">销售备注：</span>
          <span style="color: #ff0000">{{detail.comment}}</span>
        </div>
        <div class="info-item">
          <span class="label">采购备注：</span>
          <span style="color: #ff0000">{{detail.priceComment}}</span>
        </div>
      </div>
      <Table :columns="detail.viewColumn" :data="detail.data" :loading="detail.loading" stripe border></Table>
      <div slot="footer"></div>
    </Modal>
    <!-- 需求报价 -->
    <Modal v-model="modalStatus.price"  width="50%" class="demand-detail" :mask-closable="false" @on-cancel="detail.loading = true">
      <h2 slot="header" style="text-align:center">
        <span>需求报价</span>
      </h2>
      <div class="ivu-alert ivu-alert-success">
        <div class="info-item">
          <span class="label">目的地：</span>
          <span>{{detail.destination}}</span>
        </div>
        <div class="info-item">
          <span class="label">总重量：</span>
          <span>{{detail.demandWeight}}</span>
        </div>
        <div class="info-item">
          <span class="label">销售备注：</span>
          <span style="color: #ff0000">{{detail.comment}}</span>
        </div>
        <div class="info-item">
          <span class="label">采购备注：</span>
          <span>
            <Input style="display: inline-block; width: 211px;" v-model="detail.priceComment"></Input>
          </span>
        </div>
      </div>
      <Table :columns="detail.priceColumn" :data="detail.data" :loading="detail.loading" stripe border></Table>
      <div slot="footer">
        <div style="display: inline-block; width: 49%">
          <Button type="info" long @click="confirmSave">保存</Button>
        </div>
        <div style="display: inline-block; width: 49%;">
          <Button type="success" long @click="confirmSubmit">提交</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
  import '../demand/index.css' 
  export default {
    data () {
      return {
        modalStatus: {
          view: false,
          price: false
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
        demandBaseHeaders: [
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
                  this.showView(p)
                }
              }
            },'查看')
          }},
          {title: '采购', key: 'priceUser'},
          {title: '成交结果', key: 'state',
          render: (h, p) => {
            return this.getResult(p)
          }},
          {title: '原因', key: 'dealReason'},
        ],
        operate: {
          title: '操作',
          align: 'center',
          render: (h, p) => {
            return h('Button',{
              props: {type: 'warning'},
              on: {
                click: () => {
                  this.showView(p, true)
                }
              }
            }, '需求报价')
          }
        },
        detail: {  // detail数据
          loading: true,
          demandNo: '',
          data: [], // 需求明细数据
          destination: '',   // 目的地
          demandWeight: '',  // 总重量
          comment: '',       // 销售备注
          priceComment: '',   // 采购备注
          priceColumn: [
            {title: '规格', key: 'spec'},
            {title: '类型', key: 'type'},
            {title: '数量(支)', key: 'demandAmount'},
            {title: '重量(吨)', key: 'demandWeight'},
            {title: '出厂价', 
            render: (h, p) => {
              const {row: {factoryPrice}, index, row} = p
              let _factoryPrice = factoryPrice
              return h('Input', {
                props: {
                  value: factoryPrice
                },
                on: {
                  input: (val) => {
                    _factoryPrice = Number(val)
                  },
                  'on-blur': () => {
                    this.detail.data[index].factoryPrice = _factoryPrice
                  }
                }
              })
            }},
            {title: '运费', 
            render: (h, p) => {
              const {row: {freight}, index} = p
              let _freight = freight
              return h('Input', {
                props: {
                  value: freight
                },
                on: {
                  input: (val) => {
                    _freight = Number(val)
                  },
                  'on-blur': () => {
                    this.detail.data[index].freight = _freight
                  }
                }
              })
            }},
            {title: '备注',
            render: (h, p) => {
              const {row: {comment}, index} = p
              let _comment = comment
              return h('Input', {
                props: {
                  value: comment
                },
                on: {
                  input: (val) => {
                    _comment = val
                  },
                  'on-blur': () => {
                    this.detail.data[index].comment = _comment
                  }
                }
              })
            }},
          ],
          viewColumn: [
            {title: '规格', key: 'spec'},
            {title: '类型', key: 'type'},
            {title: '数量(支)', key: 'demandAmount'},
            {title: '重量(吨)', key: 'demandWeight'},
            {title: '业务报价', key: 'feedbackPrice'},
            {title: '出厂价', key: 'factoryPrice'},
            {title: '运费', key: 'freight'},
            {title: '备注', key: 'comment'},
          ],
        }
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
      getTime(p, target) {  // 辅助函数，获取格式化时间 
        const tar = p.row[target]
        if(!tar) return 
        return new Date(tar).formatDate('yyyy-MM-dd hh:mm')
      },
      getTimeDelay (p) {  // 辅助函数，获取延时 
        const {row: {priceTime, createTime}} = p
        if(!priceTime) return '未报价'
        return Math.ceil((priceTime - createTime) / 1000 / 60) + '分钟'
      },
      getResult (p) {  // 辅助函数，获取结果
        const {row: {state}} = p
        for(let item in this.demandState){
          if(this.demandState[item].key === state){
            return this.demandState[item].value
          }
        }
      },
      changeDemand (demand) { // 更改需求类型
        this.searchParams.state = this.demandState[demand].key
        this.$refs.table.load({page: 1})
      },
      showView (p, price=false) {  // 展示模态框
        const {row: {destination, demandWeight, comment, priceComment, demandNo}} = p
        this.detail.destination = destination
        this.detail.demandWeight = demandWeight
        this.detail.comment = comment
        this.detail.priceComment = priceComment
        this.getDetail(demandNo)
        if(this.demandFlag && price){
          this.modalStatus.price = true
        }else{
          this.modalStatus.view = true
        }
      },
      getDetail (demandNo) {  // 获取需求详细
        this.detail.loading = true
        axios.get('/zues/api/demand/detail', {params: {demandNo}}).then(({status, data}) => {
          if(status === 200 && data.code === 200) {
            this.detail.data = data.data
            this.detail.demandNo = demandNo
            this.detail.loading = false
          }
        })
      },
      updateDemand (submit=false) {  // 保存或提交报价
        let url = '/zues/api/demand/save'
        if(submit) url = '/zues/api/demand/price'
        const params = {}
        params.demandNo = this.detail.demandNo
        params.demandPrices = this.detail.data
        params.priceComment = this.detail.priceComment
        params.timeConsume = ''
        axios.post(url, params).then(({status, data}) => {
          if(status === 200 && data.code === 200) {
            this.$Message.success(data.msg)
            this.modalStatus.price = false
            this.search()
          }
        })
      },
      confirmSave () {
        this.$Modal.confirm({title: '保存', content: '确认保存?',
        onOk: () => {
          this.updateDemand()
        }})
      },
      confirmSubmit () {
        this.$Modal.confirm({title: '提交', content: '确认提交?',
        onOk: () => {
          this.updateDemand(true)
        }})
      }
    },
    computed: {
      demandFlag () {
        if(this.searchParams.state === 0) return true
        return false
      },
      demandHeader () {
        const column = [...this.demandBaseHeaders]
        if(this.demandFlag) {
          column.push(this.operate)
        }
        return column
      }
    }
  }
</script>
