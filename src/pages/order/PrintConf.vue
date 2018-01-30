<template>
  <div>
    <div class="ivu-row">
      <div>
        <div style="font-size: 14px; font-weight: bold;display: inline-block;">发件地址：</div>
        <div style="margin-bottom:3px;" class="ivu-alert ivu-alert-info">
          <Button @click="showSenders" type="info" icon="wrench">选择</Button>
          <span class="margin-10">详细地址：{{senderAddress.address}}</span>
          <span class="margin-10">电话号码：{{senderAddress.phone}}</span>
          <span class="margin-10">传真号码：{{senderAddress.fax}}</span>
          <span class="margin-10">电子邮箱：{{senderAddress.email}}</span>
          <span class="margin-10">财务电话：{{senderAddress.finance}}</span>
        </div>
        <div :class="['addr-container', senderClass]">
          <div class="ivu-row" style="margin-bottom:10px;">
            <span class="margin-right-10">搜索地址：</span>
            <Input style="display: inline-block; width: 211px;" placeholder="输入地址" v-model="senderSearchAddress"></Input>
            <Button class="margin-10" icon="ios-search" @click="searchAddress(1)">搜索</Button>
            <Button type="success" icon="compose" @click="showAddressModal(1)">新增</Button>
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
      </div>
      <div>
        <div style="font-size: 14px; font-weight: bold;">收件地址：</div>
        <div class="ivu-alert ivu-alert-info" style="margin-bottom:3px;">
          <Button @click="showReceivers" type="info" icon="wrench">选择</Button>
          <span class="margin-10">详细地址：{{receiverAddress.address}}</span>
          <span class="margin-10">电话号码：{{receiverAddress.phone}}</span>
          <span class="margin-10">传真号码：{{receiverAddress.fax}}</span>
          <span class="margin-10">电子邮箱：{{receiverAddress.email}}</span>
          <span class="margin-10">财务电话：{{receiverAddress.finance}}</span>
        </div>
        <div :class="['addr-container', receiverClass]">
          <div class="ivu-row" style="margin-bottom:10px;">
            <span class="margin-right-10">搜索地址：</span>
            <Input style="display: inline-block; width: 211px;" placeholder="输入地址" v-model="receiverSearchAddress"></Input>
            <Button class="margin-10" icon="ios-search" @click="searchAddress(2)">搜索</Button>
            <Button type="success" icon="compose" @click="showAddressModal(2)">新增</Button>
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
      </div> 
      <div>
        <div style="font-size: 14px; font-weight: bold;">备注：</div>
        <div class="ivu-alert ivu-alert-info" style="margin-bottom:25px;">
          <Input type="textarea" placeholder="请填写备注信息" v-model="comment"></Input>
        </div>
      </div>
      <div>
        <div style="font-size: 14px; font-weight: bold;">车辆信息：</div>
        <div class="ivu-alert ivu-alert-info">
          <div style="display: inline-block; width: 80px; height: 100%; vertical-align: top;">
            <Button type="info" icon="wrench" @click="showCars">选择</Button>
          </div>
          <div style="display: inline-block; max-width: 90%; padding-left: 20px;font-size: 14px;">
            <Tag closable type="dot" color="blue" v-for="(item, index) in carList" :key="item.carId" @on-close="removeListCar(index)">
              <span>
                {{item.plate}}
              </span>
            </Tag>
          </div>
        </div>
        <div :class="['addr-container', carClass]">
          <div class="ivu-row" style="margin-bottom:10px;">
            <span class="margin-right-10">搜索车辆：</span>
            <Input style="display: inline-block; width: 211px;" placeholder="输入车牌号" v-model="carPlateSearch"></Input>
            <Button class="margin-10" icon="ios-search" @click="changeCarPage(1)">搜索</Button>
            <Button type="success" icon="compose" @click="showAddCarModal">新增</Button>
          </div>
          <div class="addr-item car-item" v-for="item in car.row" :key="item.carId">
            <Card >
              <div slot="title" style="font-weight:bold">
                <Icon type="android-bus"></Icon>
                <span class="margin-10">{{item.plate}}</span>
                <span>{{item.linkName}}</span>
              </div>
              <div slot="extra">
                <a href="javascript:void(0)" @click="removeCar(item)"><i class="fa fa-trash-o fa-lg"></i></a>
              </div>
              <div class="addr-item-content" @click="addListCar(item)">
                <div class="content-item car-item">
                  <span class="label">货车名称：</span>
                  <span class="info">{{item.linkName}}</span>
                </div>
                <div class="content-item car-item">
                  <span class="label">车牌号码：</span>
                  <span class="info">{{item.plate}}</span>
                </div>
                <div class="content-item car-item">
                  <span class="label">电话号码：</span>
                  <span class="info">{{item.phone}}</span>
                </div>
              </div>
            </Card>
          </div>
          <Page size="small" style="margin-top: 10px;" :total="car.totalCount" :current="car.page" :page-size="car.pageSize" @on-change="changeCarPage"></Page>
        </div>
      </div>
    </div>
    <div>
      <Button type="warning" size="large" @click="backTo">返回</Button>
      <Button type="success" size="large" @click="startPrint">信息无误&nbsp;去打印</Button>
    </div>
    <Modal title="新增地址" v-model="modalStatus.addItem" width="20%;">
      <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend margin-bottom-10">
        <div class="ivu-input-group-prepend">
          <span>地址名称</span>
        </div>
        <input type="value" class="ivu-input" v-model="addAddressItem.addressName" placeholder="必填项：为公司名或人名">
      </div>
      <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend margin-bottom-10">
        <div class="ivu-input-group-prepend">
          <span>详细地址</span>
        </div>
        <input type="value" class="ivu-input" v-model="addAddressItem.address">
      </div>
      <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend margin-bottom-10">
        <div class="ivu-input-group-prepend">
          <span>联系人</span>
        </div>
        <input type="value" class="ivu-input" v-model="addAddressItem.linkName">
      </div>
      <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend margin-bottom-10">
        <div class="ivu-input-group-prepend">
          <span>电话号码</span>
        </div>
        <input type="value" class="ivu-input" v-model="addAddressItem.phone">
      </div>
      <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend margin-bottom-10">
        <div class="ivu-input-group-prepend">
          <span>传真号码</span>
        </div>
        <input type="value" class="ivu-input" v-model="addAddressItem.fax">
      </div>
      <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend margin-bottom-10">
        <div class="ivu-input-group-prepend">
          <span>电子邮箱</span>
        </div>
        <input type="value" class="ivu-input" v-model="addAddressItem.email">
      </div>
      <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend margin-bottom-10">
        <div class="ivu-input-group-prepend">
          <span>财务电话</span>
        </div>
        <input type="value" class="ivu-input" v-model="addAddressItem.finance">
      </div>
      <div slot="footer">
        <Button type="primary" long @click="addAddress">确认</Button>
      </div>
    </Modal>
    <Modal v-model="modalStatus.addCar" title="新增车辆" width="20%">
      <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend margin-bottom-10">
        <div class="ivu-input-group-prepend">
          <span>车牌号码</span>
        </div>
        <input type="value" class="ivu-input" v-model.trim="addCarParams.plate" placeholder="必填项">
      </div>
      <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend margin-bottom-10">
        <div class="ivu-input-group-prepend">
          <span>电话号码</span>
        </div>
        <input type="value" class="ivu-input" v-model.trim="addCarParams.phone" placeholder="必填项">
      </div>
      <div class="ivu-input-wrapper ivu-input-type ivu-input-group ivu-input-group-with-prepend margin-bottom-10">
        <div class="ivu-input-group-prepend">
          <span>货车名称</span>
        </div>
        <input type="value" class="ivu-input" v-model="addCarParams.linkName" placeholder="选填项">
      </div>
      <div slot="footer">
        <Button type="primary" long @click="addCar">确认</Button>
      </div>
    </Modal>
    <!-- 打印页面不显示 -->
    <div class="print-container" ref="printpage" style="position:relative;height:100%;">
      <div class="title" style="text-align:center;font-size:24px;letter-spacing:30px">{{senderAddress.addressName}}</div>
      <table cellspacing="0" cellpadding="0" border="0" style="width:100%;border-top:1px solid #888;border-left:1px solid #888;margin-top:20px;font-size:12px;">
        <tr>
          <td style="padding:5px 10px;border-right:1px solid #888;border-bottom:1px solid #888">收件单位：{{receiverAddress.addressName}}</td>
          <td style="padding:5px 10px;border-right:1px solid #888;border-bottom:1px solid #888">发件单位：{{senderAddress.addressName}}</td>
        </tr>
        <tr>
          <td style="padding:5px 10px;border-right:1px solid #888;border-bottom:1px solid #888">收件人：{{receiverAddress.linkName}}</td>
          <td style="padding:5px 10px;border-right:1px solid #888;border-bottom:1px solid #888">日期：{{new Date() | dateFilter}}</td>
        </tr>
        <tr>
          <td style="padding:5px 10px;border-right:1px solid #888;border-bottom:1px solid #888">传真号码：{{receiverAddress.fax}}</td>
          <td style="padding:5px 10px;border-right:1px solid #888;border-bottom:1px solid #888">总页数：1/1</td>
        </tr>
      </table>
      <table cellspacing="0" cellpadding="0" border="0" style="width:100%;border-top:1px solid #dfe6ec;border-left:1px solid #dfe6ec;margin-top:20px;" v-if="carList.length > 0">
        <caption style="text-align:left;margin-bottom:5px;font-size:14px;color:#888">兹：我公司委托下列车号来贵厂装货， 请予以发货！</caption>
        <thead>
          <tr>
            <th style="width:50%;padding:5px 0px;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">车号</th>
            <th style="width:50%;padding:5px 0px;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">手机</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in carList" :key="index">
            <td style="width:50%;padding:5px 0px;text-align:center;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">{{item.plate}}</td>
            <td style="width:50%;padding:5px 0px;text-align:center;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">{{item.phone}}</td>
          </tr>
        </tbody>
      </table>
      <table cellspacing="0" cellpadding="0" border="0" style="width:100%;border-top:1px solid #dfe6ec;border-left:1px solid #dfe6ec;margin-top:20px;">
        <caption style="text-align:left;margin-bottom:5px;font-size:12px;color:#888">规格如下：</caption>
        <thead>
          <tr>
            <th style="width:10%;padding:5px 0px;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">序号</th>
            <th style="width:30%;padding:5px 0px;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">规格</th>
            <th style="width:10%;padding:5px 0px;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">长度</th>
            <th style="width:10%;padding:5px 0px;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">类别</th>
            <th style="width:15%;padding:5px 0px;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">数量（件）</th>
            <th style="width:25%;padding:5px 0px;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">备注</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in orderDetail" :key="index">
            <td style="width:10%;padding:5px 0px;text-align:center;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">{{index+1}}</td>
            <td style="width:30%;padding:5px 0px;text-align:center;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">{{item.spec}}</td>
            <td style="width:10%;padding:5px 0px;text-align:center;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">{{item.long}}米</td>
            <td style="font-size:10px;width:10%;padding:5px 0px;text-align:center;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">{{item.type}}</td>
            <td style="width:15%;padding:5px 0px;text-align:center;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">{{item.orderAmount}}</td>
            <td style="width:25%;padding:5px 0px;text-align:center;border-right:1px solid #dfe6ec;border-bottom:1px solid #dfe6ec">{{item.comment}}</td>
          </tr>
        </tbody>
      </table>
      <div class="comment-container" style="margin-top:20px;font-family:'楷书'">
        <div class="comment" style="text-align:center;font-size:18px;font-weight:bold">{{comment}}</div>
        <div class="date" style="text-align:right">{{new Date() | dateFilter}}</div>
      </div>
      <div class="footer" style="position:absolute;bottom:0px;width:100%;font-size:14px;color:#ccc">
        <hr>
        <div class="address" style="display:inline-block;width:99%" v-if="senderAddress.address">地址：{{senderAddress.address}}</div>
        <div class="phone" style="display:inline-block;width:49%" v-if="senderAddress.phone">电话：{{senderAddress.phone}}</div>
        <div class="fax" style="display:inline-block;width:49%" v-if="senderAddress.fax">传真：{{senderAddress.fax}}</div>
        <div class="email" style="display:inline-block;width:49%" v-if="senderAddress.email">邮箱：{{senderAddress.email}}</div>
        <div class="finance" style="display:inline-block;width:49%" v-if="senderAddress.finance">财务：{{senderAddress.finance}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      modalStatus: {   
        addItem: false,  // 添加地址模态框
        addCar: false
      },
      senderAddress: {  // 发件人地址
        isDefault: '',
        addressName: '',
        address: '',
        linkName: '',
        phone: '',
        fax: '',
        email: '',
        finance: ''
      },
      receiverAddress: { // 收件人地址
        isDefault: '',
        addressName: '',
        address: '',
        linkName: '',
        phone: '',
        fax: '',
        email: '',
        finance: ''
      },
      show: {       // 地址列表显示动画状态
        sender: false,
        receiver: false,
        car: false
      },
      sender: {  // 发件人page
        page: 1,
        pageSize: 5,
        totalCount: 1,
        row: [],
      },
      senderSearchAddress: '', // 用于搜索地址数据绑定
      receiverSearchAddress: '', // 用于搜索地址数据绑定
      receiver: {   // 收件人page
        page: 1,
        pageSize: 5,
        totalCount: 1,
        row: [],
      },
      addAddressItem: {  // 新增地址参数
        addressName: '',
        address: '',
        linkName: '',
        phone: '',
        fax: '',
        email: '',
        finance: '',
        addressType: null
      },
      car: {
        page: 1,
        pageSize: 5,
        totalCount: 1,
        row: []
      },
      carList: [],
      carPlateSearch: '',
      addCarParams: {
        plate: '',
        phone: '',
        linkName: ''
      },
      comment: '',
      printOptions: {
        pageTitle: '',
        debug: false,               // show the iframe for debugging
        importCSS: false,            // import page CSS
        importStyle: false,         // import style tags
        printContainer: true,       // grab outer container as well as the contents of the selector
        removeInline: false,        // remove all inline styles from print elements
        printDelay: 0,            // variable print delay; depending on complexity a higher value may be necessary
        header: null,               // prefix to html
        footer: null,               // postfix to html
        base: false ,               // preserve the BASE tag, or accept a string for the URL
        formValues: true,           // preserve input/form values
        canvas: false,              // copy canvas elements (experimental)
        doctypeString: "",       // enter a different doctype for older markup
        removeScripts: false        // remove script tags from print content
      },
      orderDetail: []
    }
  },
  filters: {
    dateFilter (val) {
      return val.formatDate('yyyy-MM-dd');
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
          }
          target.page = Number(data.data.page) || 1;
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
    showCars () {
      this.show.car = !this.show.car
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
        this.changeAddress(item.addressType, item)
      })
    },
    // 删除地址
    removeAddress (item) {
      axios.post('/zues/api/address/remove', {addressId: item.addressId + ''}).then(res => {
        this.$Message.success('删除地址成功')
        this.getAddressList(item.addressType)
      })
    },
    showAddressModal (type) {
      this.modalStatus.addItem = true;
      this.addAddressItem.addressType = type;
    },
    addAddress() {
      if(!this.addAddressItem.addressName){
        this.$Message.error('请填写地址名称')
        return
      }
      axios.post('/zues/api/address/add', this.addAddressItem).then(({status, data})=>{
        if(status === 200 && data.code === 200){
          this.$Message.success('添加地址成功')
          this.getAddressList(this.addAddressItem.addressType)
          this.modalStatus.addItem = false;
        }
      })
    },
    // 获取车辆
    getCarList () {
      let params = {}
      params.page = this.car.page
      params.plate = this.carPlateSearch
      axios.get('/zues/api/car/list', {params}).then(({status, data}) => {
       
        if(status === 200 && data.code === 200){
          if(data.data.count === 0 && this.car.page > 1){
            this.car.page -= 1
            this.getCarList()
            return ;
          }
          for(let key in this.car){
            this.car[key] = data.data[key]
          }
          this.car.page = Number(data.data.page) || 1
        }
      })
    },
    changeCarPage (page) {
      this.car.page = page;
      this.getCarList()
    },
    addListCar (item) {
      this.carList.push(item);
    },
    removeListCar (index) { // 删除列表中的车辆信息
      this.carList.splice(index, 1);
    },
    showAddCarModal () {
      this.modalStatus.addCar = true;
    },
    addCar () {
      if(this.addCarParams.plate && this.addCarParams.phone){
        axios.post('/zues/api/car/add', this.addCarParams).then(({status, data}) => {
          if(status === 200 && data.code === 200){
            this.$Message.success('添加车辆地址成功')
            this.modalStatus.addCar = false;
            this.changeCarPage(1)
          }
        })
      }else{
        this.$Message.error('请完善车辆信息')
      }
    },
    removeCar (item) { // 移除车辆  
      axios.post('/zues/api/car/remove', {carId: item.carId + ''}).then(({status}) => {
        if(status === 200){
          this.changeCarPage(this.car.page)
          this.$Message.success('删除车辆信息成功')
        }
      })
    },
    backTo () {
      this.$router.push({path: '/order'})
    },
    startPrint () {
      let orderNo = this.$route.query.orderNo
      this.printOptions.pageTitle = `订单号：${orderNo}`
      let params = {orderNo}
      axios.post('/zues/api/order/print', params).then(({data}) => {
        this.orderDetail = data.data.orderDetail;
        $(this.$refs.printpage).printThis(this.printOptions)
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
    carClass () {
      return {
        show: this.show.car
      }
    }
  },
  mounted () {
    this.getAddress(1)
    this.getAddress(2)
    this.getAddressList(1)
    this.getAddressList(2)
    this.getCarList()
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
    margin-bottom: 10px;
  }
  .addr-item {
    vertical-align: top;
    margin-bottom: 5px;
  }
  .addr-item-content{
    font-size: 12px;
    position: relative;
    cursor: pointer;
  }
  .content-item{
    display: inline-block;
  }
  .content-item:not(:last-child) {
    margin-right: 20px;
  }
  .content-item .label {
    display: inline-block;
    color: #999;
  }
  .content-item .info{
    color: #333;
  }
  .show {
    max-height: 600px;
    border: 1px solid #eee;
    opacity: 1;
  }
  .margin-bottom-10:not(:last-child) {
    margin-bottom: 10px;
  }
  .addr-item.car-item{
    display: inline-block;
    width: 19%;
  }
  .addr-item.car-item:not(:last-child){
    margin-right: 10px;
  }
  .content-item.car-item{
    display: block;
  }
  .print-container {
    display: none;
  }
</style>
