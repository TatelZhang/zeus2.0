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
        <div class="ivu-row" style="margin-bottom:10px;">
          <span class="margin-right-10">搜索地址：</span>
          <Input style="display: inline-block; width: 211px;" placeholder="输入地址" size="large" v-model="senderSearchAddress"></Input>
          <Button class="margin-10" icon="ios-search" size="large" @click="searchAddress(1)">搜索</Button>
        </div>
        <div class="addr-item" v-for="item in sender.row" :key="item.addressId">
          <Card >
            <div slot="title" style="font-weight:bold">
              <i class="fa fa-address-card-o"></i>
              <span class="margin-10">{{item.linkName}}</span>
              <span>{{item.addressName}}</span>
            </div>
            <div slot="extra">
              <Tag color="yellow" v-if="item.isDefault" style="margin-right: 10px;" @click="console.log(1)">默认地址</Tag>
              <Tag color="yellow" type="border" v-else style="margin-right: 10px;"> <span @click="setDefaultAddress(item)">设置默认</span></Tag>
              <a href="javascript:void(0)" @click="removeAddress(item)"><i class="fa fa-trash-o fa-lg"></i></a>
            </div>
            <div class="addr-item-content" @click="changeAddress(1, item)">
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
        <Page size="small" style="margin-top: 10px;" :total="sender.totalCount" :current="sender.page" :page-size="sender.pageSize" @on-change="changeSenderPage"></Page>
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
        <div class="ivu-row" style="margin-bottom:10px;">
          <span class="margin-right-10">搜索地址：</span>
          <Input style="display: inline-block; width: 211px;" placeholder="输入地址" size="large" v-model="receiverSearchAddress"></Input>
          <Button class="margin-10" icon="ios-search" size="large" @click="searchAddress(2)">搜索</Button>
        </div>
        <div class="addr-item" v-for="item in receiver.row" :key="item.addressId">
          <Card >
            <div slot="title" style="font-weight:bold">
              <i class="fa fa-address-card-o"></i>
              <span class="margin-10">{{item.linkName}}</span>
              <span>{{item.addressName}}</span>
            </div>
            <div slot="extra">
              <Tag color="yellow" v-if="item.isDefault" style="margin-right: 10px;">默认地址</Tag>
              <Tag color="yellow" type="border" v-else style="margin-right: 10px;"><span @click="setDefaultAddress(item)">设置默认</span></Tag>
              <a href="javascript:void(0)" @click="removeAddress(item)"><i class="fa fa-trash-o fa-lg"></i></a>
            </div>
            <div class="addr-item-content" @click="changeAddress(2, item)">
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
        <Page size="small" style="margin-top: 10px;" :total="receiver.totalCount" :current="receiver.page" :page-size="receiver.pageSize"></Page>
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
        row: [],
      },
      senderSearchAddress: '', // 用于搜索地址数据绑定
      receiverSearchAddress: '', // 用于搜索地址数据绑定
      receiver: {
        page: 1,
        pageSize: 5,
        totalCount: 1,
        row: [],
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
    // 获取地址列表
    getAddressList(type=1){
      let params = {addressType: type}
      let target = {}
      if(type === 1){
        target = this.sender
        params.address = this.senderSearchAddress
      }else{
        target = this.receiver
        params.address = this.receiverSearchAddress
      }
      params.page = target.page
      
      axios.get('/zues/api/address/list', {params}).then(({status, data})=>{
        if(status === 200 && data.code === 200){
          if(data.data.count === 0 && target.page > 1){
            target.page -= 1
            this.getAddressList(type);
            return 
          }
          for(let key in this.sender){
            target[key] = data.data[key]
            target.page = Number(data.data.page) || 1;
          }
        }
      })
    },
    searchAddress(type) {
      if(type === 1){
        this.sender.page = 1
        this.getAddressList(1)
      }else{
        this.receiver.page = 1
        this.getAddressList(2)
      }
    },
    showSenders(){
      this.show.sender = !this.show.sender
    },
    showReceivers () {
      this.show.receiver = !this.show.receiver
    },
    // 地址列表选择填充
    changeAddress (type, item) {
      if(type === 1){
        this.senderAddress = item
        this.show.sender = false;
      }else{
        this.receiverAddress = item
        this.show.receiver = false;
      }
    },
    // 翻页
    changeSenderPage (page) {
      this.sender.page = page
      this.getAddressList(1)
    },
    changeReceiverPage (page){
      this.receiver.page = page
      this.getAddressList(2)
    },
    // 设置默认地址
    setDefaultAddress(item) {
      axios.post('/zues/api/address/setdefault', {addressType: item.addressType, addressId: item.addressId}).then(({status, data}) => {
        // if(status === 200 && data.code === 200) {}
        this.$Message.success("设置默认地址成功")
        this.getAddressList(item.addressType)
      })
    },
    // 删除地址
    removeAddress (item) {
      axios.post('/zues/api/address/remove', {addressId: item.addressId + ''}).then(res => {
        this.$Message.success('删除地址成功')
        this.getAddressList(item.addressType)
      })
    }
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
    opacity: 0;
    padding: 5px;
    max-height: 0;
    overflow: hidden;
    transition: all .5s ease-in-out;
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
    max-height: 330px;
    /* max-height: 100%; */
    border: 1px solid #eee;
    opacity: 1;
  }
</style>
