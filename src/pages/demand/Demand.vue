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
    <div style="text-align: left;font-size: 20px; margin: 20px 0;">
      <span>需求列表：</span>
      <div class="ivu-alert ivu-alert-success">
        <Button size="large" class="margin-right-10" type="primary" @click="demandUpload">需求上传</Button>
        <Button size="large" class="margin-right-10" type="primary">导出需求</Button>
        <Button size="large" class="margin-right-10" type="primary">导出需求详情</Button>
        <Button @click="modalStatus.upDemand = true">弹框</Button>
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
    <!-- 需求上传Modal -->
    <Modal v-model="modalStatus.upDemand" width="40%" :mask-closable="false" class="demand-upload">
      <h2 slot="header" style="color: #f60;text-align:center">
        <span>需求上传</span>
      </h2>
      <div class="upload-content">
        <div style="margin-bottom: 10px;">
          <div style="font-size: 14px;">规格信息录入：</div>
          <div class="ivu-alert ivu-alert-info">
            <div class="upload-item" style="width: 26%;">
              <Input placeholder="例:50*50*3.0*6">
                <span slot="prepend">规格：</span> 
              </Input>
            </div>
            <div class="upload-item" style="max-width: 16%">
              <Input>
                <span slot="prepend">类型：</span>
              </Input>
            </div>
            <div class="upload-item" style="max-width: 17%">
              <Input>
                <span slot="prepend">数量</span>
                <span slot="append">支</span>
              </Input>
            </div>
            <div class="upload-item" style="max-width: 18%">
              <Input>
                <span slot="prepend">重量</span>
                <span slot="append">吨</span>
              </Input>
            </div>
            <div class="upload-item">
              <Button type="warning">添加规格</Button>
            </div>
          </div>
          <Table :columns="uploadDemand.header" :data="uploadDemand.data" stripe border></Table>
        </div>
          <div style="font-size: 14px;">客户信息录入：</div>
          <div class="ivu-alert ivu-alert-info">
            <div style="display: inline-block; width: 50%;">
                <Input size="large" class="customer-label"><span slot="prepend">目的地</span></Input>
                <Input size="large" class="customer-label"><span slot="prepend">客户</span></Input>
                <Input size="large" class="customer-label"><span slot="prepend">电话</span></Input>
            </div>
            <div  style="display: inline-block;width:40%;vertical-align: top; float: right;">
              <Collapse>
                <Panel>
                  <span>选择已有客户</span> 
                  <div slot="content">
                    <div>
                      <Input placeholder="输入客户名称" style="display:inline-block;width: 70%;"></Input>
                      <Button type="info">搜索</Button>
                    </div>
                    <div class="customer-list">
                      <span>上海</span>
                      <span>嘉勋</span>
                      <span>15123120321</span>
                    </div>
                    <div class="customer-list">
                      <span>上海</span>
                      <span>嘉勋</span>
                      <span>15123120321</span>
                    </div>
                    <Page :total="5" size="small"></Page>
                  </div>
                </Panel>
              </Collapse>
            </div>
          </div>
          <Input type="textarea" :rows="4" placeholder="填写备注"></Input>
      </div>
    </Modal>
    <!-- 需求详细Modal -->
    <Modal v-model="modalStatus.demandDetail"  width="50%" class="demand-detail">
      <h2 slot="header" style="color: #f60;text-align:center">
        <span>需求明细</span>
      </h2>
      <div>
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
          upDemand: false,
          demandDetail: false
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
            width: 150,
            render: (h, p) => {
              return h('div', [
                h('Button', '修改'), 
                h('Button', '删除')
                ]
              )
            }
          },
          repeat: {
            title: '交易反馈',
            width: 100,
            render: (h, p) => {
              return h("Button",{
                props: {
                  type: 'warning'
                }
              }, '销售报价')
            }
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
        },
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
        },
        uploadDemand: { // 需求上传data
          header: [
            {title: '规格', key: ''},
            {title: '类型', key: ''},
            {title: '数量', key: ''},
            {title: '重量', key: ''},
            {title: '操作', }
          ],
          data: []
        }
      }
    },
    watch: {
      // 更改当前tab
      currTableHeaderFlag (val){
        this.searchParams.state = this.demandStatus[val].key
        this.changeCurrHeaders()
        this.searchDemand()
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
        }else if(this.searchParams.state === 1 || this.searchParams.state === 2){
          this.currHeaders.push(this.table.repeat)
        }
      },
      // 显示需求明细
      showDemandDetail (p) {
        let {row: {demandNo, destination, demandWeight, comment, priceComment}} = p
        this.demandDetail.destination = destination
        this.demandDetail.demandWeight = demandWeight
        this.demandDetail.comment = comment
        this.demandDetail.priceComment = priceComment
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
      demandUpload () {
        this.$router.push({path: '/demandup'})
      }
    },
    mounted () {
      this.changeCurrHeaders()
    }
  }
</script>
