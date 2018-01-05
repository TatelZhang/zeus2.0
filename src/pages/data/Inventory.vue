<template>
  <div class="inventory-container">
    <div class="ivu-row">
      <span class="margin-right-10">规格：</span>
      <Input v-model="inventory.spec" placeholder="规格：支持模糊查询" size="large" style="display:inline-block; width:211px;"></Input>
      <span class="margin-10">类型：</span>
      <ZSelect v-model="inventory.type" size="large" placeholder="类型" :data="materialType" style="display:inline-block; width:211px;"></ZSelect>
      <span class="margin-10">供应商名称：</span>
      <Input placeholder="供应商：支持模糊查询" v-model="inventory.supplierName" size="large" style="display:inline-block; width:211px;"></Input>
      <span class="margin-10">供应商名称：</span>
      <ZSelect v-model="inventory.address" size="large" placeholder="供应商所在地" data="/zues/api/supplier/address" keyValue="address-address" style="display:inline-block; width:211px;"></ZSelect>
      <Button size="large" icon="ios-search" type="primary" @click="searchInventory" class="margin-10">查询</Button>
      <Upload action="/zues/api/upload/excel?type=inventory" style="float:right"> 
        <Button type="info" icon="ios-cloud-upload-outline" size="large">上传库存表</Button>
        <span style="cursor:pointer;margin-left: 5px;">(供应商名称_类型_日期[库存表])</span>
      </Upload>
    </div>
    <br>
    <ZTable :column="table.column" :config="table.config" :query="inventory" ref="inventory"></ZTable>
    <Modal v-model="inventoryModal" @on-ok="changeInventory">
      <h2 slot="header" style="color:#f90;text-align:center">
        <span style="font-size: 14px;">更改库存数量</span>
      </h2>
      <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend">
        <div class="ivu-input-group-prepend">
          <span>库存数量(件)</span>
        </div>
        <input type="number" class="ivu-input ivu-input-large" placeholder="库存数量" v-model="inventoryParams.inventoryAmount">
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        inventory: {
          spec: '',
          type: '',
          supplierName: '',
          address: ''
        }, 
        table: {
          column: [
            {
              title: '规格',
              key: 'spec',
            },{
              title: '长度',
              key: 'long'
            },{
              title: '最近更新时间',
              key: 'lastUpdateTime'
            },{
              title: '类型',
              key: 'type'
            },{
              title: '供应商',
              key: 'supplierName'
            },{
              title: '库存数量(件)',
              key: 'inventoryAmount',
              sortable: true,
            },{
              title: '包装',
              key: 'perAmount'
            },{
              title: '单支重量(kg)',
              render: (h, p) => {
                let {row} = p
                let specArr = row.spec.split('*')
                specArr = specArr.map(item=>Number(item))
                let [height, width, land] = specArr
                let long = Number(row.long)||6
                let perimeter = 2 * height + 2 * width
                // let amount = Number(row.perAmout)
                // let inventoryAmount = Number(row.inventoryAmount)
                return ((perimeter / 3.14 - land) * land * long * 0.02466).toFixed(2)
              }
            },{
              title: '库存重量(吨)',
              sortable: true,
              // key: 'hello',
              render: (h, p) => {
                // console.log(p)
                let {row} = p
                let specArr = row.spec.split('*')
                specArr = specArr.map(item=>Number(item))
                let [height, width, land] = specArr
                let long = Number(row.long) || 6
                let perimeter = 2 * height + 2 * width
                let amount = Number(row.perAmount)
                let inventoryAmount = Number(row.inventoryAmount)
                return ((perimeter / 3.14 - land) * land * long * 0.02466 * amount * inventoryAmount / 1000).toFixed(2)
              }
            },{
              title: '操作',
              align: 'center',
              render: (h, p) => {
                let {row} = p
                return h('Button', 
                {props: {type: 'warning'},
                on: {
                  click: () => {
                    this.inventoryModal = true
                    this.inventoryParams.supplierInventoryId = row.supplierInventoryId
                    this.inventoryParams.inventoryAmount = Number(row.inventoryAmount)
                  }
                }
                }, '更改库存')
              }
            }
          ],
          config: {
            url: '/zues/api/inventory/list'
          }
        },
        materialType: [
          {
          key: '黑管',
          value: '黑管'
        }, {
          key: '热镀锌',
          value: '热镀锌'
        }, {
          key: '镀锌带',
          value: '镀锌带'
        }],
        inventoryModal: false,
        inventoryParams: {
          inventoryAmount: '',
          supplierInventoryId: ''
        }
      }
    },
    methods: {
      searchInventory () {
        this.$refs.inventory.search()
      },
      changeInventory () {
        axios.post('/zues/api/inventory/update', this.inventoryParams).then(res=>{
          let {data, status} = res
          if(status === 200){
            if(data.code === 200){
              this.$Message.success(data.msg)
              this.searchInventory()
            }else{
              this.$Message.error(data.msg)
              // this.modalMessage.status = true
            }
          }
        })
      },
      uploadError (e) {
        console.log(e)
      }
    }
  }
</script>
<style>
  #app .inventory-container{
    text-align: left;
  }
  
</style>
