<template>
  <div class="supplier-container">
    <Tabs>
      <TabPane label="供应商信息">
        <div class="supplier-tabs">
          <span class="margin-right-10">供应商名称：</span>
          <Input style="display:inline-block; width:211px;" v-model="search.supplierName" placeholder="支持关键词/模糊搜索" size="large"></Input> 
          <span class="margin-10">供应商所在地：</span>
          <ZSelect style="display:inline-block; width:211px;" v-model="search.address" size="large" data="/zues/api/supplier/address" keyValue="address-address"></ZSelect>
          <Button size="large" icon="ios-search" type="primary" @click="searchSupplier" class="margin-10">查询</Button>
          <Row />
          <br>
          <ZTable :column="table.column" :config="table.config" :query="search" ref="supplier"></ZTable>
        </div>
      </TabPane>
      <TabPane label="运费信息">
        <Row>
          <div class="daily-input">
            <Button type="info" size="large" @click="modalStatus.freightAdd = true">每日运费录入</Button>
          </div>
          <br>
        </Row>
        <ZTable :column="daily.column" :config="daily.config" ref="daily"></ZTable>
      </TabPane>
    </Tabs>
    <Modal v-model="modalStatus.benifitChange" @on-ok="changeBenifit">
      <h2 slot="header" style="color:#f90;text-align:center">
        <span>修改优惠政策</span>
      </h2> 
      <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend">
        <div class="ivu-input-group-prepend">
          <span>供应商名称</span>
        </div>
        <input type="value" class="ivu-input ivu-input-large" :value="currSupplier.supplierName" readonly>
      </div>
      <br>
      <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend">
        <div class="ivu-input-group-prepend">
          <span>供应商所在地</span>
        </div>
        <input type="value" class="ivu-input ivu-input-large" :value="currSupplier.address" readonly>
      </div>
      <br>
      <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend">
        <div class="ivu-input-group-prepend">
          <span>政策下浮（元/吨）</span>
        </div>
        <input type="number" class="ivu-input ivu-input-large" v-model="currSupplier.benifit">
      </div>
    </Modal>
    <Modal v-model="modalStatus.freightAdd" @on-ok="addFreight">
      <h2 slot="header" style="color:#f90;text-align:center">
        <span>每日运费录入</span>
      </h2> 
      <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend" style="margin-bottom: 14px">
        <div class="ivu-input-group-prepend">
          <span>供应商所在地</span>
        </div>
        <input type="value" class="ivu-input ivu-input-large" v-model="freightAdd.address">
      </div>
      <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend">
        <div class="ivu-input-group-prepend">
          <span>运费</span>
        </div>
        <input type="number" class="ivu-input ivu-input-large" v-model="freightAdd.freight">
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        search: {
          supplierName: '',
          address: ''
        },
        table: {
          column: [
            {title: '供应商名称', key: 'supplierName'},
            {title: '供应商所在地', key: 'address'},
            {title: '运费(元/吨)', key: 'freight'},
            {title: '厂家优惠政策(元/吨)', key: 'benifit'},
            {title: '价格更新', key: 'valueTime',
            render: (h, p) => {
              let {row:{valueTime}} = p
              valueTime = Number(valueTime)
              if(valueTime){
                return new Date(valueTime).toLocaleString()
              }else{
                return ''
              }
            }
            },
            {title: '库存更新', key: 'inventoryTime',
            render: (h, p) => {
              let {row:{valueTime}} = p
              valueTime = Number(valueTime)
              if(valueTime){
                return new Date(valueTime).toLocaleString()
              }else{
                return ''
              }
              }
            },
            {title: '启用状态', 
            key: 'isValide',
            render: (h, p)=>{
              let {row: {isValide}, row} = p
              // let status = isValide
              return h('Select', {
                props: {
                  value: isValide
                },
                'class': {
                  selected: Boolean(isValide)
                },
                on: {
                  'on-change': (e)=>{
                    this.changeStatus(e, row.supplierId)
                  }
                }
              },[h('Option', {props: {value: 1}}, '开启'), h('Option', {props: {value: 0}}, '关闭')])
            }},
            {title: '操作',
            align: 'center',
            width: 167,
            render: (h, p)=>{
              let {row} = p
               return h('Button', {
                   props: {
                     type: 'warning'
                   },
                   on: {
                     click: () => {
                      //  let {address, benifit, benifitAdjust, freight, inventoryTime, isValide, supplierId, supplierName, valueTime} = row
                      //  let r = {address, benifit, benifitAdjust, freight, inventoryTime, isValide, supplierId, supplierName, valueTime}
                       this.showBenifit(row)
                     }
                   }
                 }, '修改优惠政策')
              
             }
            }
          ],
          config: {
            url: '/zues/api/supplier/list'
          }
        },
        daily: {
          column: [
            {
              title: '所在地',
              key: 'address'
            },{
              title: '运费(元/吨)',
              key: 'freight'
            },{
              title: '最近更新时间',
              render: (h, p) => {
                let {row:{lastUpdateTime}} = p
                let time = Number(lastUpdateTime)
                if(!time) return 
                return new Date(time).toLocaleString()
              }
            },{
              title: '操作',
              align: 'center',
              render: (h) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'warning'
                    },
                    style: {
                      marginRight: '20px'
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'error'
                    }
                  }, '删除')
                ])
              }
            }
          ],
          config: {
            url: '/zues/api/freight/list'
          }
        },
        modalStatus: {
          benifitChange: false,
          freightAdd: false
        },
        currSupplier: {
          supplierName: '',
          address: '',
          benifit: '',   // 优惠政策
          supplierId: ''
        },
        freightAdd: {
          address: '',
          freight: "0"
        }
      }
    },
    methods: {
      searchSupplier () {
        this.$refs.supplier.search()
      },
      changeStatus (val, target) {
        let url = '/zues/api/supplier/open'
        if(!Boolean(val)){
          url = '/zues/api/supplier/close'
        }
        axios.post(url, {supplierId: target}).then(res=>{
          let {status, data} = res
          if(status === 200){
            this.$Message.success(data.msg)
            this.searchSupplier()
          }
        })
      },
      showBenifit (row) {
        this.currSupplier.supplierName = row.supplierName
        this.currSupplier.address = row.address
        this.currSupplier.benifit = row.benifit
        this.currSupplier.supplierId = row.supplierId
        // this.currSupplier.row = row
        // this.currSupplier.comId = ''
        this.modalStatus.benifitChange = true
      },
      changeBenifit () {
        axios.post('/zues/api/supplier/update', this.currSupplier).then(res=>{
          let {status, data} = res
          if(status === 200 && data.code === 200){
            this.$Message.success(data.msg)
            this.searchSupplier()
          }else{
            this.$Message.error(data.msg||'信息异常')
          }
        })
      },
      addFreight () {
        if(this.freightAdd.address){
          axios.post('/zues/api/freight/add', this.freightAdd).then(res=>{
            let {status, data} = res
            if(status){
              if(data.code === 200){
                this.$Message.success(data.msg)
                this.$refs.daily.search()
                this.freightAdd.address = '',
                this.freightAdd.freight = "0"
              }else{
                this.$Message.error(data.msg)
              }
            }
          })
        }else{
          setTimeout(()=>{
            this.modalStatus.freightAdd = true
          },0)
          this.$Message.error("请输入供应商所在地")
        }
      }
    }
  }
</script>
<style>
  #app .supplier-container {
    text-align: left;
  }
  .supplier-tabs{
    /* min-height: 500px; */
    /* padding-bottom: 20px; */
  }
  .daily-input{
    /* margin-bottom: 20px; */
    text-align: left;
  }
  .selected, .selected .ivu-icon-arrow-down-b:before{
    color: #13ce66;
  }
  .selected .ivu-select-selection{
    border-color: #13ce66;
  }
</style>
