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
    <div style="text-align: left; margin: 20px 0;">
      <span style="font-size: 20px;">需求列表：</span>
      <div class="ivu-alert ivu-alert-success">
        <Button size="large" class="margin-right-10" type="primary" @click="demandUpload">需求上传</Button>
        <Button size="large" class="margin-right-10" type="primary" @click="exportDemandList">导出需求列表</Button>
        <Button size="large" class="margin-right-10" type="primary" @click="exportDemandDetailList">导出需求详情</Button>
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
    <!-- 需求详细Modal -->
    <Modal v-model="modalStatus.demandDetail"  width="50%" class="demand-detail" :mask-closable="false">
      <h2 slot="header" style="color: #f60;text-align:center">
        <span>需求明细</span>
      </h2>
      <div>
        <div><span style="font-size: 14px; font-weight: bold;">订单号：</span>{{demandDetail.demandNo}}</div>
        <div class="ivu-alert ivu-alert-info">
          
          <div class="info-item">
            <span class="label">目的地：</span> 
            <span>{{demandDetail.destination}}</span>
          </div>
          <div class="info-item">
            <span class="label">总重量：</span>
            <span>{{demandDetail.demandWeight}} 吨</span>
          </div>
          <div class="info-item">
            <span class="label">销售备注：</span>
            <span style="color: #ff0000">{{demandDetail.comment}}</span>
          </div>
          <div class="info-item">
            <span class="label">采购备注：</span>
            <span style="color: #ff0000">{{demandDetail.priceComment}}</span>
          </div>
        </div>
        <Table :columns="demandDetail.detailHeader" :data="demandDetail.detail" :loading="demandDetail.loading" stripe border></Table>
      </div>
      <div slot="footer">
        <Button type="warning" size="large" @click="exportDemand">导出需求</Button>
      </div>
    </Modal>
    <!-- 销售报价Modal -->
    <Modal v-model="modalStatus.priceDetail"  width="50%" class="demand-detail" :mask-closable="false">
      <h2 slot="header" style="color: #f60;text-align:center">
        <span>销售报价</span>
      </h2>
      <div>
        <div><span style="font-size: 14px; font-weight: bold;">订单号：</span>{{salePrice.customerDetail.demandNo}}</div>
        <div class="ivu-alert ivu-alert-info">
          <div class="info-item">
            <span class="label">目的地：</span> 
            <span>{{salePrice.customerDetail.destination}}</span>
          </div>
          <div class="info-item">
            <span class="label">总重量：</span>
            <span>{{salePrice.customerDetail.demandWeight}} 吨</span>
          </div>
          <div class="info-item">
            <span class="label">销售备注：</span>
            <span style="color: #ff0000">{{salePrice.customerDetail.comment}}</span>
          </div>
          <div class="info-item">
            <span class="label">采购备注：</span>
            <span style="color: #ff0000">{{salePrice.customerDetail.priceComment}}</span>
          </div>
        </div>
        <Table :columns="salePrice.header" :data="salePrice.demandList" :loading="salePrice.loading" stripe border></Table>
      </div>
      <div slot="footer">
        <Button type="warning" size="large" @click="confirmSubmit">提交</Button>
      </div>
    </Modal>
    <!-- 填写反馈 -->
    <Modal v-model="modalStatus.repeat">
      <h2 slot="header" style="color: #f60;text-align:center">
        <span>成交结果反馈</span>
      </h2>
      <div>
        <div style="margin-bottom: 10px;">
          <span style="font-size: 13px; font-weight:bold;">成交结果：</span>
          <Select v-model="FeedbackParams.state">
            <Option v-for="item in dealStatusArray" :key="item.value" :value="item.value">{{item.key}}</Option>
          </Select>
        </div>
        <div>
          <span style="font-size: 13px; font-weight:bold;">交易反馈：</span>
          <Input type="textarea" placeholder="请填写反馈" v-model="FeedbackParams.dealReason"></Input>
        </div>
      </div>
      <div slot="footer">
        <Button type="warning" size="large" @click="confirmDealSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import './index.css'
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
          demandDetail: false,
          priceDetail: false,
          repeat: false
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
            key: 'createTime',
            render: (h, p)=>{
              return this.getTime(p, 'createTime')
            }
          },{
            title: '报价时间',
            key: 'priceTime',
            render: (h, p) => {
              return this.getTime(p, 'priceTime')
            }
          },{
            title: '反馈时间',
            key: 'feedbackTime',
            render: (h, p) => {
              return this.getTime(p, 'feedbackTime')
            }
          },{
            title: '报价时长',
            render: (h, p) => {
              return this.getTimeDelay(p)
            }
          },{
            title: '电话',
            key: 'customerPhone'
          },{
            title: '需求明细',
            align: 'center',
            render: (h, p) =>{
              return h('div', {style: {
                textAlign: 'center'
              }},
              [h('Button',{
                props:{type: 'info'}, 
                on: {
                  click: () =>{
                    this.showDemandDetail(p)
                  }
                }
              }, 
            '查看')]) 
            }
          },{
            title: '采购',
            key: 'priceUser'
          },{
            title: '成交结果',
            state: 'state',
            render: (h, p) => {
              return this.getDealResult(p)
            }
          },{
            title: '原因',
            key: 'dealReason'
          }],
          operate: {
            title: '操作类型',
            align: 'center',
            width: 200,
            render: (h, p) => {
              let {row} = p
              return h('div', [
                h('Button', {
                  style: {marginRight: '10px'},
                  props: {type: "info"},
                  on: {
                    click: () => {
                      this.demandChange(row)
                    }
                  }},'修改'), 
                h('Button', {
                  props: {type: 'error'},
                  on: {
                    click: () => {
                      this.$Modal.confirm({title: '确认', content: '确认删除？', onOk: () => { this.delDemand(row.demandNo)}})
                    }
                  }
                }, '删除')
                ]
              )
            }
          },
          repeating: {
            title: '销售报价',
            // width: 100,
            align: 'center',
            render: (h, p) => {
              let {row} = p
              return h('div', {style: {textAlign: 'center'}}, [h('Button', {
                props: {
                  type: 'warning'
                },
                on: {
                  click: () => {
                    this.showPriceDeatil(row)
                  }
                }
              }, '报价')])
            }
          },
          repeated: {
            title: '交易反馈',
            // width: 100,
            align: 'center',
            render: (h, p) => {
              let {row: {demandNo}} = p
              return h('div', {style: {textAlign: 'center'}}, [h('Button', {
                props: {
                  type: 'warning'
                },
                on: {
                  click: () => {
                    this.openRepeatModal(demandNo)
                  }
                }
              }, '反馈')])
            }
          },
          config: {
            url: '/zues/api/demand/list'
          }
        },
        currTableHeaderFlag: 'noPriceDemand', // 切换当前表头
        currHeaders: [],
        demandStatus: {
          noPriceDemand: {key: 0, value: '未报价需求'},
          repeatingDemand: {key: 1, value: '待反馈'},
          repeatedDemand: {key: 2, value: '已反馈'},
          canceledDemand: {key: 3, value: '未成交'},
          dealedDemand: {key: 4, value: '已成交'}
        },
        // 用于显示需求详细
        demandDetail: {
          detailHeader: [
            {title: '规格', key: 'spec'},
            {title: '类型', key: 'type'},
            {title: '数量(支)', key: 'demandAmount'},
            {title: '重量(吨)', key: 'demandWeight'},
            {title: '业务报价', key: 'feedbackPrice'},
            {title: '出厂价', key: 'factoryPrice'},
            {title: '运费', key: 'freight'},
            {title: '备注', key: 'comment'},
          ],
          detail: [],
          loading: true,
          destination: '',
          demandWeight: '',
          comment: '',  // 销售备注
          priceComment: '', // 采购备注
          demandNo: ''
        },
        salePrice: {
          header: [
            {title: '规格', key: 'spec'},
            {title: '类型', key: 'type'},
            {title: '数量(支)', key: 'demandAmount'},
            {title: '重量(吨)', key: 'demandWeight'},
            {title: '业务报价', 
            width: '150',
            render: (h, p) => {
              let {row: {_index, feedbackPrice}} = p
              this.salePrice.demandList[_index].feedbackPrice1 = feedbackPrice
              return h('InputNumber', {
                style: {width: '100%'},
                props: {
                  value: feedbackPrice
                },
                on: {
                  'on-change':  (val)=> {
                    this.salePrice.demandList[_index].feedbackPrice1 = Number(val)
                  },
                  'on-blur': () => {
                    this.salePrice.demandList[_index].feedbackPrice = this.salePrice.demandList[_index].feedbackPrice1
                  }
                }
              })
            }
            },
            {title: '成本报价',
            render: (h, p) => {
              let {row: {freight, factoryPrice}} = p
              return freight + factoryPrice
            }},
            {title: '备注', key: 'comment', width: '20%',
            render: (h, p) => {
              let {row: {comment, _index}} = p
              this.salePrice.demandList[_index].comment1 = comment
              return h('Input', {
                props: {
                  rows: 2,
                  type: 'textarea',
                  value: comment
                },
                on: {
                  'input': (val) => {
                    this.salePrice.demandList[_index].comment1 = val
                    console.log(val)
                  },
                  'on-blur': () => {
                    this.salePrice.demandList[_index].comment = this.salePrice.demandList[_index].comment1
                  }
                }
              })
            }},
          ],
          loading: true,
          demandList: [],
          customerDetail: {
            demandNo: '',
            destination: '',
            demandWeight: '',
            comment: '', // 销售备注
            priceComment: '' // 采购备注
          }
        },
        FeedbackParams: {
          demandNo: '',
          state: '',
          dealReason: ''
        },
        dealStatusArray: [{ value: 4, key: '交易成功' }, { value: 3, key: '交易失败' }],
      }
    },
    watch: {
      // 更改当前tab
      currTableHeaderFlag (val){
        this.searchParams.state = this.demandStatus[val].key
        this.changeCurrHeaders()
        this.$refs.table.load({page: 1})
      }
    },
    methods: {
      // 用于刷新需求列表
      searchDemand () {
        this.$refs.table.search()
      },
      // 转换时间戳为字符串
      getTime (p, target) {
        let gTime = p.row[target]
        if(!gTime) return 
        return new Date(gTime).formatDate('yyyy-MM-dd hh:mm')
      },
      // 获取报价时长
      getTimeDelay (p) {
        let {row: {priceTime, createTime}} = p
        if(!priceTime) return '未报价'
        return Math.ceil((priceTime - createTime) / 1000 / 60) + '分钟'
      },
      // 转换成交结果code为状态
      getDealResult (p) {
        let {row: {state}} = p
        for(let item in this.demandStatus){
          if(this.demandStatus[item].key === state){
            return this.demandStatus[item].value
          }
        }
      },
      // 切换当前表头
      changeCurrHeaders () {
        this.currHeaders = [...this.table.baseHeaders]
        if(this.searchParams.state ===0){
          this.currHeaders.push(this.table.operate)
        }else if(this.searchParams.state === 1){
          this.currHeaders.push(this.table.repeating)
        }else if(this.searchParams.state === 2){
          this.currHeaders.push(this.table.repeated)
        }
      },
      // 显示需求明细
      showDemandDetail (p) {
        let {row: {demandNo, destination, demandWeight, comment, priceComment}} = p
        this.demandDetail.destination = destination
        this.demandDetail.demandWeight = demandWeight
        this.demandDetail.comment = comment
        this.demandDetail.priceComment = priceComment
        this.demandDetail.demandNo = demandNo
        this.demandDetail.loading = true
        this.modalStatus.demandDetail = true
        axios.get('/zues/api/demand/detail', {params: {demandNo}}).then(res=>{
          let {status, data} = res
          if(status === 200 && data.code === 200){
            this.demandDetail.detail = data.data
            this.demandDetail.loading = false
          }
        })
      },
      // 转入需求上传页面
      demandUpload () {
        this.$router.push({path: '/demandup'})
      },
      // 转入需求更改页面
      demandChange (row) {
        let {comment, demandNo, destination, customerName, customerPhone} = row
        this.$router.push({name: 'demandch', params: {comment, demandNo, destination, customerName, customerPhone, status: true}})
      },
      // 删除需求
      delDemand (demandNo) {
        axios.post('/zues/api/demand/remove', {demandNo}).then(res=>{
          let {status, data} = res
          if(status === 200 && data.code === 200){
            this.$Message.info(data.msg)
            this.searchDemand()
          }
        })
      },
      // 导出需求列表
      exportDemandList () {
        window.open(`/zues/api/export/demandlist/需求列表.xls`)
      },
      // 导出需求
      exportDemand () {
        let target = this.demandDetail.demandNo
        window.open(`/zues/api/export/demandexport/${target}需求详情.xls?demandNo=${target}`)
        // this.modalStatus.demandDetail = false
      },
      // 导出需求详情 根据销售人员，创建时间，客户名称
      exportDemandDetailList () {
        let date = new Date().formatDate('yyyyMMdd');
        window.open(`/zues/api/export/demanddetaillist/需求列表详情${date}.xls?demandUser=${this.searchParams.demandUser}&createTime=${this.searchParams.createTime}&customName=${this.searchParams.customName}`)
      },
      // 销售报价Modal
      showPriceDeatil (row) {
        // console.log(row)
        this.modalStatus.priceDetail = true
        for(let key in this.salePrice.customerDetail){
          this.salePrice.customerDetail[key] = row[key]
        }
        this.getPriceList(row.demandNo)
        this.salePrice.loading = false
      },
      // 获取销售报价list
      getPriceList (demandNo) {
        axios.get('/zues/api/demand/detail', {params: {demandNo}}).then(({status, data}) => {
          if(status === 200 && data.code === 200){
            this.salePrice.demandList = data.data
          }
        })
      },
      // editPriceList (index, key, val){
      //   this.salePrice.demandList[index][key] = val
      // },
      // 提交销售报价
      confirmSubmit () {
        this.$Modal.confirm({title: '确认', content: '确认提交？', onOk: () => {this.submitPrice()}})
      },
      submitPrice () {
        let params = {demandNo: this.salePrice.customerDetail.demandNo, demandPrices: this.salePrice.demandList, imp: 2}
        axios.post('/zues/api/demand/price', params).then(({status, data}) => {
          if(status === 200 && data.code === 200){
            this.$Message.success(data.msg)
            this.modalStatus.priceDetail = false
            this.searchDemand()
          }else{
            this.$Message.error({content: data.msg, duration: 5})
          }
        })
      },
      openRepeatModal (demandNo) {
        this.FeedbackParams.state = ''
        this.FeedbackParams.dealReason = ''
        this.modalStatus.repeat = true
        this.FeedbackParams.demandNo = demandNo
      },
      confirmDealSubmit () {
        if(this.FeedbackParams.state&&this.FeedbackParams.dealReason){
          this.$Modal.confirm({title: '确认', content: '确认提交？', onOk: () => {this.submitDealResult()}})
        }else{
          this.$Message.error({content: '请完善反馈信息', duration: 5})
        }
      },
      submitDealResult () {
        axios.post('/zues/api/demand/update', this.FeedbackParams).then(({status, data})=>{
          if(status===200 && data.code === 200){
            this.$Message.success("反馈成功")
            this.modalStatus.repeat = false
            this.searchDemand()
          }else{
            this.$Message.error(data.msg)
          }
        })
      }
    },
    mounted () {
      this.changeCurrHeaders()
    }
  }
</script>
