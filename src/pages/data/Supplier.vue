<template>
  <div>
    <Tabs>
      <TabPane label="供应商信息">
        <div class="supplier-tabs">
          <Row :gutter="30">
            <Col span="3">
              <Input v-model="search.supplierName" placeholder="供应商名称" size="large"></Input> 
            </Col>
            <Col span="3">
              <ZSelect v-model="search.address" size="large" data="/zues/api/supplier/address" keyValue="address-address" placeholder="供应商所在地"></ZSelect>
            </Col>
            <Col span="2">
              <Button long size="large" icon="ios-search" type="primary" @click="searchSupplier">查询</Button>
            </Col>
          </Row>
          <br>
          <ZTable :column="table.column" :config="table.config" :query="search" ref="supplier"></ZTable>
        </div>
      </TabPane>
      <TabPane label="运费信息">
        <Row>
          <div class="daily-input">
            <Button type="info">每日运费录入</Button>
          </div>
          <br>
        </Row>
        <ZTable :column="daily.column" :config="daily.config"></ZTable>
      </TabPane>
    </Tabs>
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
            {title: '厂家优惠政策(元/吨)', key: 'benifitAdjust'},
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
              let {row: {isValide}} = p
              return h('Select', {
                props: {
                  value: isValide
                },
                on: {
                  'on-change': (e)=>{
                    console.log(e)
                  }
                }
              },[h('Option', {props: {value: 1}}, '开启'), h('Option', {props: {value: 0}}, '关闭')])
            }},
            {title: '操作',
            // align: 'center',
            width: '80',
             render: (h, p)=>{
               return h('div', {
                 style:{
                   textAlign: 'center'
                 }
               }, [
                 h('Button', {
                   props: {
                     type: 'warning'
                   },
                   on: {
                     click:()=>{
                       this.$Message.info('heklklo')
                     }
                   }
                 }, '修改')
               ])
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
                // console.log(typeof lastUpdateTime, lastUpdateTime)
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
        }
      }
    },
    methods: {
      searchSupplier () {
        this.$refs.supplier.search()
      }
    }
  }
</script>
<style>
  .supplier-tabs{
    min-height: 500px;
    padding-bottom: 20px;
  }
  .daily-input{
    /* margin-bottom: 20px; */
    text-align: left;
  }
</style>
