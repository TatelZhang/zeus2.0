<template>
  <div class="demandup-container">
    <div class="ivu-row">  
      <div class="title">产品参数录入：</div>
      <div class="ivu-alert ivu-alert-success">
        <div class="d-input">
          <div class="item1">
            <span>规格：(例:50*50*3.0*6)</span>
            <Input style="display:inline-block; width:211px;" size="large" v-model="specParams.spec"></Input>
          </div>
          <div class="item1">
            <span>类型：</span>
            <Input style="display:inline-block; width:211px;" size="large" v-model="specParams.type"></Input>
          </div>
          <div class="item1">
            <span>数量(支)：</span>
            <InputNumber  style="display:inline-block; width:211px;" size="large" v-model="specParams.demandAmount" :min="0"></InputNumber>
          </div>
          <div class="item1">
            <span>重量(吨)：</span>
            <InputNumber style="display:inline-block; width:211px;" size="large" v-model="specParams.demandWeight" :min="0"></InputNumber>
          </div>
          <Button type="warning" size="large" @click="addSpecItem">添加参数</Button>
        </div> 
        <div class="head">当前录入参数列表：<span class="desc">{{1}}</span></div>
        <Table :columns="uploadDetail.header" :data="uploadDetail.data" stripe border width="1406"></Table>
      </div>
    </div>
    <div class="ivu-row">
      <div class="title">客户信息录入：</div>
      <div class="ivu-alert ivu-alert-success">
        <div class="head">从客户列表中选择</div>
        <Collapse style="width: 50%;" v-model="customerInfos.panel">
          <Panel name="1">
            <span>客户列表</span> 
            <div slot="content">
              <div>
                <Input placeholder="输入客户名称" style="display:inline-block;max-width: 90%;" size="large" v-model="customerInfos.customerName"></Input>
                <Button type="info" size="large" @click="searchCustomerName">搜索</Button>
              </div>
              <div class="customer-list" v-for="item in customerInfos.list" :key="item.customerId" @click="choseCustomer(item)">
                <span>{{item.destination}}</span>
                <span>{{item.customerName}}</span>
                <span>{{item.customerPhone}}</span>
                <span style="color: red; float: right" @click.stop="removeCustomer(item.customerId)">删除</span>
              </div>
              <Page :total="customerInfos.totalCount" size="small" :page-size="customerInfos.pageSize" @on-change="getCustomerList"></Page>
            </div>
          </Panel>
        </Collapse>
        <div class="head">手动录入客户信息：<span class="desc">请录入客户信息</span></div>
        <div class="d-input">
          <div class="item1">
            <span>目的地：</span>
            <Input style="display:inline-block; width:211px;" size="large" v-model="demandParams.destination"></Input>
          </div>
          <div class="item1">
            <span>客户：</span>
            <Input style="display:inline-block; width:211px;" size="large" v-model="demandParams.customerName"></Input>
          </div>
          <div class="item1">
            <span>电话：</span>
            <Input style="display:inline-block; width:211px;" size="large" v-model="demandParams.customerPhone"></Input>
          </div>
          <div class="item1">
            <Button type="primary" size="large" @click="addCustomer">添加到客户列表</Button>
          </div>
          <div class="head">填写备注：</div>
          <Input type="textarea" :rows="3" placeholder="备注信息" v-model="uploadDetail.comment"></Input>
        </div>
      </div>
    </div>
    <div class="">
      <Button size="large" type="warning" @click="backTo">返回需求管理</Button>
      <Button size="large" type="success" @click="addDemand">提交需求</Button>
    </div>
  </div>
</template>
<script>
  import './index.css'
  export default {
    data () {
      return {
        uploadDetail: {
          header: [
            {title: '规格', key: 'spec'},
            {title: '类型', key: 'type'},
            {title: '数量(支)', key: 'demandAmount'},
            {title: '重量(吨)', key: 'demandWeight'},
            {title: '操作', 
            width: 100,
            align: 'center',
            render: (h, p) => {
              return h('div',{
                style: {
                  textAlign: 'center'
                }
              }, 
              [h('Button', {
                props: {
                  type: 'error'
                },
                on: {
                  click: ()=>{
                    this.removeSpecItem(p.index)
                  }
                }
              },'删除')])
            }}
          ],
          data: [],
          comment: ''
        },
        specParams: {
          spec: '',
          type: '',
          demandAmount: null,
          demandWeight: null
        },
        demandParams: {
          destination: '',
          customerName: '',
          customerPhone: ''
        },
        customerInfos: {
          list: [],
          page: 1,
          pageSize: 5,
          totalCount: null,
          customerName: '',
          panel: ''
        }
      }
    },
    methods: {
      // 获取本地存储产品参数信息
      getSpecDataFromLocal () {
        let data = localStorage.getItem('uploadDemandList')
        this.uploadDetail.data = JSON.parse(data)
      },
      // 添加specItem
      addSpecItem () {
        if(this.isSpecValid){
          this.uploadDetail.data = [...this.uploadDetail.data]
          this.uploadDetail.data.push(this.specItem)
          this.clearSpecParams()
          this.saveLocal()
        }else{
          this.$Message.error({content: '请完善规格参数信息',duration: 5})
        }
      },
      // 删除specItem
      removeSpecItem (index) {
        this.uploadDetail.data.splice(index, 1)
        this.saveLocal()
      },
      // 清除输入框中的数据
      clearSpecParams () {
        for(let key in this.specParams){
          this.specParams[key] = null
        }
      },
      // 保存产品参数列表到本地
      saveLocal () {
        let str = JSON.stringify(this.uploadDetail.data)
        localStorage.setItem('uploadDemandList', str)
      },
      // 确认需求上传
      addDemand () {
        if(this.uploadDetail.data.length === 0){
          this.$Notice.error({title: '请添加产品参数', duration: 5}) 
          return
        }else if(!this.isCustomerValid){
          this.$Notice.error({title: '请完善客户信息', duration: 5})
          return 
        }
        let params = Object.assign({}, this.demandParams, {demandDetails: this.uploadDetail.data})
        axios.post('/zues/api/demand/add', params).then(res=>{
          // console.log(res)
          this.$router.push({path: '/demand'})
          localStorage.setItem('uploadDemandList', '[]') // 需求上传后清除本地存储参数列表
          this.$Notice.success({title: '需求上传成功', duration: 5})
        })
      },
      backTo () {
        this.$router.push({path: '/demand'})
      },
      // 获取已有客户信息列表
      getCustomerList (page=1, name="") {
        axios.get(`/zues/api/customer/list?page=${page}&customerName=${name}`).then(res=>{
          let {status, data} = res
          if(status === 200 && data.code === 200){
            let {row, page, pageSize, totalCount} = data.data
            this.customerInfos.list = row
            this.customerInfos.page = page
            this.customerInfos.pageSize = pageSize
            this.customerInfos.totalCount = totalCount
          }
        })
      },
      searchCustomerName () {
        this.getCustomerList(1, this.customerInfos.customerName)
      },
      choseCustomer(item){
        this.demandParams.destination = item.destination
        this.demandParams.customerName = item.customerName
        this.demandParams.customerPhone = item.customerPhone

        this.customerInfos.panel = '' // 折叠面板关闭
      },
      // 删除客户信息
      removeCustomer (customerId) {
        axios.post('/zues/api/customer/remove', {customerId}).then(res=>{
          let {status, data} = res
          if(status === 200 && data.code === 200){
            this.$Message.success(data.msg)
            this.getCustomerList()
          }
        })
      },
      // 添加客户信息
      addCustomer () {
        if(this.isCustomerValid){
          axios.post('/zues/api/customer/add', this.demandParams).then(res=>{
            let {status, data} = res
            if(status === 200 && data.code === 200)
              this.$Message.success(data.msg)
              this.getCustomerList()
          })
        }else{
          this.$Notice.error({title: '请完善客户信息', duration: 5})
        }
      }
    },
    computed: {
      // 验证spec参数是否为空
      isSpecValid () {
        let flag = true
        for(let key in this.specParams){
          if(!this.specParams[key]){
            flag = false
          }
        }
        return flag
      },
      isCustomerValid () {
        let flag = true 
        for(let key in this.demandParams){
          if(!this.demandParams[key]){
            flag = false
          }
        }
        return flag
      },
      // 返回specItem
      specItem () {
        let item = {}
        for(let key in this.specParams){
          item[key] = this.specParams[key]
        }
        return item
      }
    },
    mounted () {
      // console.log(this.$route)
      this.getSpecDataFromLocal()
      this.getCustomerList()
    }
  }
</script>