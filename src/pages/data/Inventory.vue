<template>
  <div>
    <Row :gutter="30">
      <Col span="3">
        <Input v-model="inventory.spec" placeholder="规格：支持模糊查询" size="large"></Input>
      </Col>
      <Col span="3">
        <ZSelect v-model="inventory.type" size="large" placeholder="类型" :data="materialType"></ZSelect>
      </Col>
      <Col span="3">
        <Input placeholder="供应商：支持模糊查询" v-model="inventory.supplierName" size="large"></Input>
      </Col>
      <Col span="3">
        <ZSelect v-model="inventory.address" size="large" placeholder="供应商所在地" data="/zues/api/supplier/address" keyValue="address-address"></ZSelect>
      </Col>
      <Col span="3" align="left">
        <Button size="large" icon="ios-search" type="primary" @click="searchInventory">查询</Button>
      </Col>
      <Col span="5" align="right">
        <Upload action="/">
            <Button type="info" icon="ios-cloud-upload-outline" size="large">上传库存表</Button>
            <span style="cursor:pointer;margin-left: 5px;">(供应商名称_类型_日期[库存表])</span>
          </Upload>
      </Col>
    </Row>
    <ZTable :column="table.column" :config="table.config" :query="inventory" ref="inventory"></ZTable>
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
              render: (h, P) => {
                return h('Button', {props: {type: 'warning'}}, '修改')
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
        }]
      }
    },
    methods: {
      searchInventory () {
        this.$refs.inventory.search()
      }
    }
  }
</script>