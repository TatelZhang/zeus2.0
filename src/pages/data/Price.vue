<template>
  <div>
    <div class="zeus-search">
      <Row>
        <Col span="17">
          <Form :model="searchFrom">
            <Row :gutter="10">
              <Col span="5">
                <Input v-model="searchFrom.spec" placeholder="规格：支持模糊查询" size="large" clearable></Input>
              </Col>
              <Col span="4">
                <ZSelect v-model="searchFrom.type" size="large" placeholder="类别" :data="materialType">
                </ZSelect>
              </Col>
              <Col span="5">
                <Input v-model="searchFrom.supplierName" size="large" placeholder="供应商：支持模糊查询"></Input>
              </Col>
              <Col span="5">
              <ZSelect v-model="searchFrom.address" size="large" placeholder="供应商所在地" data="/zues/api/supplier/address" keyValue="address-address"></ZSelect>
              </Col>
              <Col span="3">
                <FormItem prop="spec">
                  <Button long size="large" icon="ios-search" type="primary" @click="search">查询</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span="7" align="right">
          <Upload action="/">
            <Button type="info" icon="ios-cloud-upload-outline" size="large">上传价格表</Button>
            <span style="cursor:pointer;margin-left: 5px;">(命名格式：价格表_类型_日期)</span>
          </Upload>
        </Col>
      </Row>
      <Row>
        <Col span="2">
          <input type="number" class="ivu-input ivu-input-large" style="border-top-right-radius:0;border-bottom-right-radius:0;border-right:0;">
        </Col>
        <Col span="8" align="left">
          <ButtonGroup size="large">
            <Button icon="minus" style="border-top-left-radius: 0;border-bottom-left-radius:0"></Button>
            <Button icon="plus"></Button>
          </ButtonGroup>
          <Button type="warning" size="large" style="margin-left:10px;">调整价格</Button>
        </Col>
      </Row>
    </div>
    <ZTable :column="table.column" :config="table.config" :query="searchFrom" ref="price"/>

    <Modal v-model="change.status"> 
      <p slot="header" style="color: #f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>更改出厂价格</span>
      </p>
      <div>
        <label>出厂价：</label><input v-model="change.currPrice" class="ivu-input" type="number">
      </div>
      <div slot="footer">
        <Button type="error" size="large" @click="changePrice">更改</Button>
        <Button size="large" @click="change.status = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        searchFrom: {
          spec: '',
          type: '',
          supplierName: '',
          address: '',
        },
        table: {
          column: [
            {
              title: '规格',
              key: 'spec',
              width: 150,
              // align: 'center'
            },
            {
              title: '最近更新',
              key: 'lastUpdateTime',
              sortable: true,
              // align: 'center'
            },
            {
              title: '类别',
              key: 'type',
              // align: 'center'
            },
            {
              title: '供应商',
              key: 'supplierName',
              align: 'center'
            },
            {
              title: '出厂价(元/吨)',
              key: 'value',
              sortable: true,
              // align: 'center'
            },
            {
              title: '操作',
              align: 'center',
              key: 'nothing',
              render: (h, p)=>{
                return h('div',[
                  h('Button', {
                    props: {
                      type: 'info',
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: ()=>{
                        this.showInfo(p)
                      }
                    }
                  }, '详情'),
                  h('Button', {
                    props: {
                      type: 'warning'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: ()=>{
                        let { row } = p
                        this.change.currPrice = row.value 
                        this.change.supplierValueId = row.supplierValueId 
                        this.change.status = true
                      }
                    }
                  }, "更改")
                ])
              }
            }
          ],
          config: {
            url: '/zues/api/price/list'
          }
        }
        ,
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
          }
        ],
        change: {
          status: false,
          currPrice: 0,
          supplierValueId: null,
        }
      }
    },
    watch: {

    },
    methods: {
      search () {
        this.$refs.price.search()
      },
      showInfo (p) {
        let {row} = p
        this.$Modal.info({
          title: '供应信息',
          content: `
          规格：${row.spec}<br>
          类型：${row.type}<br>
          出厂价：${row.value} 元/吨<br>
          供应商：${row.supplierName}<br>
          供应商所在地：${row.address}<br>
          最近更新：${row.lastUpdateTime}`
        })
      },
      changePrice () {
        console.log(this.change.currPrice)
        if(typeof this.change.currPrice === 'number'){
          // axios.post
        }else{
          this.$Message.info('cuowu')
        }
      }
    }
  }
</script>
<style>
  .zeus-search{
    margin-bottom: 10px;
    
  }
  input[type=number]{
    -moz-appearance:textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
</style>
