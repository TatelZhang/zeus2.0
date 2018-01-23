<template>
  <div>
    <div class="ivu-row">
      <div style="font-size: 14px; font-weight: bold;">发件地址：</div>
      <div class="ivu-alert ivu-alert-info">
        <span v-show="senderAddress.isDefault" class="addr-default">默认地址</span>
        <span>地址名称：{{senderAddress.addressName}}</span>
        <span>详细地址：{{senderAddress.address}}</span>
        <span>联系人：{{senderAddress.linkName}}</span>
        <span>电话号码：{{senderAddress.phone}}</span>
        <span>传真号码：{{senderAddress.fax}}</span>
        <span>电子邮箱：{{senderAddress.email}}</span>
        <span>财务电话：{{senderAddress.finance}}</span>
      </div>
      <div style="font-size: 14px; font-weight: bold;">收件地址：</div>
      <div class="ivu-alert ivu-alert-info">
        <span v-show="recieverAddress.isDefault" class="addr-default">默认地址</span>
        <span>地址名称：{{recieverAddress.addressName}}</span>
        <span>详细地址：{{recieverAddress.address}}</span>
        <span>联系人：{{recieverAddress.linkName}}</span>
        <span>电话号码：{{recieverAddress.phone}}</span>
        <span>传真号码：{{recieverAddress.fax}}</span>
        <span>电子邮箱：{{recieverAddress.email}}</span>
        <span>财务电话：{{recieverAddress.finance}}</span>
      </div>
      
      <div style="font-size: 14px; font-weight: bold;">备注：</div>
      <div class="ivu-alert ivu-alert-info">
        <Input type="textarea"></Input>
      </div>
      <div style="font-size: 14px; font-weight: bold;">车辆：</div>
      <div class="ivu-alert ivu-alert-info">
        <span>车辆：</span>
      </div>
    </div>
    <div>
      <Button>返回</Button>
      <Button>打印</Button>
      <Button>设置</Button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      senderAddrList: [],
      recieverAddrList: [],
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
      recieverAddress: {
        isDefault: '',
        addressName: '',
        address: '',
        linkName: '',
        phone: '',
        fax: '',
        email: '',
        finance: ''
      }
    }
  },
  methods: {
    getAddress (type=1) {
      axios.get(`/zues/api/address/default?addressType=${type}`).then(({status, data}) => {
        if(status === 200 && data.code === 200){
          if(type === 1){
            this.senderAddrList = data.data
            this.senderAddress = data.data[0]
          }else if(type === 2){
            this.recieverAddress = data.data[0]
          }
        }
      })
    },
  },
  created () {
  
  },
  mounted () {
    this.getAddress(1)
    this.getAddress(2)
  }
}
</script>
<style>
  .p-input {
    border-radius: 5px;
    /* display: block; */
    height: 30px;
    border: solid 1px #dddee1;
    outline: none;
    padding: 3px 10px;
    /* transition: all ease .5; */
    transition: border .5s ease-in-out, display .5s ;
  }
  .p-input:hover {
    border-color: #2d8cf0;
   
  }
  .addr-item {
    /* background-color: #eee;  */
    border: 1px solid #eee;
    padding: 5px;
  }
  .addr-label {
    display: inline-block;
    margin-right: 10px;
  }
  .addr-default {
    display: inline-block;
    background-color: #fff;
    padding: 3px;
    color: red;
    border: 1px solid red;
    border-radius: 1px;
    margin-right: 10px;
  }
</style>
