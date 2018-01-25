<template>
  <div>
    <div class="ivu-row">
      <div>
        <div style="font-size: 14px; font-weight: bold;display: inline-block;">发件地址：</div>
      </div>
      <div class="ivu-alert ivu-alert-info">
        <Button @click="showSenders" type="info" icon="wrench">选择</Button>
        <Button type="primary" icon="compose">新增</Button>
        <span class="margin-10">详细地址：{{senderAddress.address}}</span>
        <span class="margin-10">电话号码：{{senderAddress.phone}}</span>
        <span class="margin-10">传真号码：{{senderAddress.fax}}</span>
        <span class="margin-10">电子邮箱：{{senderAddress.email}}</span>
        <span class="margin-10">财务电话：{{senderAddress.finance}}</span>
       
      </div>
      <div :class="['addr-container', senderClass]">
        <div class="addr-item" v-for="item in sender.row" :key="item.addressId">
          <Card >
            <div slot="title" style="font-weight:bold">
              <i class="fa fa-address-card-o"></i>
              <span class="margin-10">{{item.linkName}}</span>
              <span>{{item.addressName}}</span>
            </div>
            <div slot="extra">
              <Tag color="yellow" v-if="item.isDefault" style="margin-right: 10px;">默认地址</Tag>
              <Tag color="yellow" type="border" v-else style="margin-right: 10px;">设置默认</Tag>
              <a href="javascript:void(0)"><i class="fa fa-trash-o fa-lg"></i></a>
            </div>
            <div class="addr-item-content" @click="changeSender(1, item)">
              <div class="content-item">
                <span class="label">地址：</span> 
                <span class="info">{{item.addressName}}</span>
              </div>
              <div class="content-item">
                <span class="label">联系人：</span>
                <span class="info">{{item.linkName}}</span>
              </div>
              <div class="content-item">
                <span class="label">详细地址：</span>
                <span class="info">{{item.address}}</span>
              </div>
              <div class="content-item">
                <span class="label">电话号码：</span>
                <span class="info">{{item.phone}}</span>
              </div>
              <div class="content-item">
                <span class="label">传真号码：</span>
                <span class="info">{{item.fax}}</span>
              </div>
              <div class="content-item">
                <span class="label">电子邮箱：</span>
                <span class="info">{{item.email}}</span>
              </div>
              <div class="content-item">
                <span class="label">财务电话：</span>
                <span class="info">{{item.finance}}</span>
              </div>
            </div>
          </Card>
        </div>
        <Page size="small" style="text-align: right;margin-top: 10px;" :total="sender.totalCount" :current="sender.page" :page-size="sender.pageSize"></Page>
      </div> 
      <div style="font-size: 14px; font-weight: bold;">收件地址：</div>
      <div class="ivu-alert ivu-alert-info">
        <Button @click="showReceivers" type="info" icon="wrench">选择</Button>
        <Button type="primary" icon="compose">新增</Button>
        <span class="margin-10">详细地址：{{receiverAddress.address}}</span>
        <span class="margin-10">电话号码：{{receiverAddress.phone}}</span>
        <span class="margin-10">传真号码：{{receiverAddress.fax}}</span>
        <span class="margin-10">电子邮箱：{{receiverAddress.email}}</span>
        <span class="margin-10">财务电话：{{receiverAddress.finance}}</span>
        
      </div>
      <div :class="['addr-container', receiverClass]">
        <div class="addr-item" v-for="item in receiver.row" :key="item.addressId">
          <Card >
            <div slot="title" style="font-weight:bold">
              <i class="fa fa-address-card-o"></i>
              <span class="margin-10">{{item.linkName}}</span>
              <span>{{item.addressName}}</span>
            </div>
            <div slot="extra">
              <Tag color="yellow" v-if="item.isDefault" style="margin-right: 10px;">默认地址</Tag>
              <Tag color="yellow" type="border" v-else style="margin-right: 10px;">设置默认</Tag>
              <a href="javascript:void(0)"><i class="fa fa-trash-o fa-lg"></i></a>
            </div>
            <div class="addr-item-content" @click="changeSender(2, item)">
              <div class="content-item">
                <span class="label">地址：</span> 
                <span class="info">{{item.addressName}}</span>
              </div>
              <div class="content-item">
                <span class="label">联系人：</span>
                <span class="info">{{item.linkName}}</span>
              </div>
              <div class="content-item">
                <span class="label">详细地址：</span>
                <span class="info">{{item.address}}</span>
              </div>
              <div class="content-item">
                <span class="label">电话号码：</span>
                <span class="info">{{item.phone}}</span>
              </div>
              <div class="content-item">
                <span class="label">传真号码：</span>
                <span class="info">{{item.fax}}</span>
              </div>
              <div class="content-item">
                <span class="label">电子邮箱：</span>
                <span class="info">{{item.email}}</span>
              </div>
              <div class="content-item">
                <span class="label">财务电话：</span>
                <span class="info">{{item.finance}}</span>
              </div>
            </div>
          </Card>
        </div>
        <Page size="small" style="text-align: right;margin-top: 10px;" :total="receiver.totalCount" :current="receiver.page" :page-size="receiver.pageSize"></Page>
      </div> 
      <div style="font-size: 14px; font-weight: bold;">备注：</div>
      <div class="ivu-alert ivu-alert-info">
        <Input type="textarea"></Input>
      </div>
      <div style="font-size: 14px; font-weight: bold;">车辆信息：</div>
      <div class="ivu-alert ivu-alert-info">
        <span>车辆：</span>
      </div>
    </div>
    <div>
      <Button>返回</Button>
      <Button>打印</Button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      senderAddress: {
        isDefault: '',
        addressName: '',
        address: '',
        linkName: '',
        phone: '',
        fax: '',
        email: '',
        finance: ''
      },
      receiverAddress: {
        isDefault: '',
        addressName: '',
        address: '',
        linkName: '',
        phone: '',
        fax: '',
        email: '',
        finance: ''
      },
      show: {
        sender: false,
        receiver: false,
      },
      sender: {
        page: 1,
        pageSize: 5,
        totalCount: 1,
        row: []
      },
      receiver: {
        page: 1,
        pageSize: 5,
        totalCount: 1,
        row: []
      }
    }
  },
  methods: {
    getAddress (type=1) {
      axios.get(`/zues/api/address/default?addressType=${type}`).then(({status, data}) => {
        if(status === 200 && data.code === 200){
          if(type === 1){
            // this.senderAddrList = data.data
            this.senderAddress = data.data[0]
          }else if(type === 2){
            this.receiverAddress = data.data[0]
          }
        }
      })
    },
    getAddressList(type=1){
      let params = {addressType: type}
      let target = {}
      if(type === 1){
        target = this.sender
      }else{
        target = this.receiver
      }
      params.page = target.page
      params.address = ''
      axios.get('/zues/api/address/list', {params}).then(({status, data})=>{
        for(let key in this.sender){
          target[key] = data.data[key]
          target.page = Number(data.data.page)
        }
      })
    },
    showSenders(){
      this.show.sender = !this.show.sender
    },
    showReceivers () {
      this.show.receiver = !this.show.receiver
    },
    changeSender (type, item) {
      if(type === 1){
        this.senderAddress = item
        this.show.sender = false;
      }else{
        this.receiverAddress = item
        this.show.receiver = false;
      }
      
    },
  },
  computed: {
    senderClass () {
      return {
        show: this.show.sender
        }
    },
    receiverClass () {
      return {
        show: this.show.receiver
      }
    },
  },
  created () {
  
  },
  mounted () {
    this.getAddress(1)
    this.getAddress(2)
    this.getAddressList()
    this.getAddressList(2)
  }
}
</script>
<style>
  .addr-container {
    /* border: solid #ccc 1px; */
    /* padding: 5px; */
    height: 0;
    overflow: hidden;
    transition: height .5s;
  }
  .addr-item {
    display: inline-block;
    width:19%;
  }
  .addr-item:not(:last-child) {
    margin-right: 10px;
  }
  .addr-item-content{
    font-size: 12px;
    position: relative;
    cursor: pointer;
  }
  .content-item:not(:last-child) {
    margin-bottom: 3px;
  }
  .content-item .label {
    display: inline-block;
    width: 70px;
    text-align: right;
    color: #999;
  }
  .content-item .info{
    color: #666;
  }
  .show {
    height: 260px;
  }
</style>
