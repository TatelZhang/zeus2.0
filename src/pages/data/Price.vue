<template>
  <div class="price">
    <div class="zeus-search">
      <div class="ivu-row">
        <Form :model="searchFrom" style="display: inline-block;">
            <span class="margin-right-10">规格：</span>
            <Input style="display:inline-block; width:211px;" v-model="searchFrom.spec" placeholder="规格：支持模糊查询" size="large"></Input>
            <span class="margin-10">类型：</span>
            <ZSelect style="display:inline-block; width:211px;" v-model="searchFrom.type" size="large" placeholder="类型" :data="materialType"></ZSelect>
            <span class="margin-10">供应商名称：</span>
            <Input style="display:inline-block; width:211px;" v-model="searchFrom.supplierName" size="large" placeholder="供应商：支持模糊查询"></Input>
            <span class="margin-10">供应商所在地：</span>
            <ZSelect style="display:inline-block; width:211px;" v-model="searchFrom.address" size="large" placeholder="供应商所在地" data="/zues/api/supplier/address" keyValue="address-address"></ZSelect>
            <Button class="margin-10" size="large" icon="ios-search" type="primary" @click="search">查询</Button>
        </Form>
      </div>
      <Row style="margin-top: 10px;">
        <Col span="2">
          <input type="number" v-model="todayPriceParams.adjust" class="ivu-input ivu-input-large" style="border-top-right-radius:0;border-bottom-right-radius:0;border-right:0;">
        </Col>
        <Col span="3" align="left">
          <ButtonGroup size="large">
            <Button icon="minus" @click="changeAdjustPrice(-10)" style="border-top-left-radius: 0;border-bottom-left-radius:0"></Button>
            <Button icon="plus" @click="changeAdjustPrice(10)"></Button>
          </ButtonGroup>
          <Button type="warning" size="large" style="margin-left:10px;" @click="confirmAdjustPrice">调整价格</Button>
        </Col>
        <Col span="5">
          <Upload action="/zues/api/upload/excel" >
          <Button type="info" icon="ios-cloud-upload-outline" size="large">上传价格表</Button>
          <span style="cursor:pointer;margin-left: 5px;color:#a09f9f;font-size: 12px;">(命名格式：价格表_类型_日期)</span>
        </Upload>
        </Col>
      </Row> 
    </div>
    <ZTable :column="table.column" :config="table.config" :query="searchFrom" ref="price"/>

    <Modal v-model="priceModal"> 
      <h2 slot="header" style="color: #f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>更改出厂价格</span>
      </h2>
      <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend">
        <div class="ivu-input-group-prepend">
          <span>出厂价(元/吨)</span>
        </div>
        <input type="number" class="ivu-input ivu-input-large" placeholder="库存数量" v-model="singlePriceParams.value">
      </div>
      <div slot="footer">
        <Button size="large" @click="priceModal = false">取消</Button>
        <Button type="error" size="large" @click="adjustSinglePrice">更改</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  function getComId() {
    let cookies = document.cookie
    let res = cookies.match(/comId=(\d*);/)
    return res[1]
  }
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
              // width: 150,
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
              // align: 'center'
            },
            {
              title: '出厂价(元/吨)',
              key: 'value',
              sortable: true,
              align: 'center',
              className: 'price-column'
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
                        this.singlePriceParams.value = row.value 
                        this.singlePriceParams.supplierValueId = row.supplierValueId
                        this.priceModal = true
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
          }
        ],
        priceModal: false,
        singlePriceParams: {
          value: '',
          supplierValueId: '',
          row: '' // 貌似没有用
        },
        todayPriceParams: {
          address: '',
          adjust: 0,
          comId: '',
          lastUpdateTime: '',
          spec: '',
          supplierName: '',
          type: ''
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
      ajustTodayPrice () {
        let today = new Date()
        let year = today.getFullYear()
        let month = today.getMonth() + 1
        let day = today.getDay()
        month = month < 10 ? '0' + month : month + ''
        day = day < 10 ? '0' + day : day + ''
        this.todayPriceParams.comId = getComId()
        this.todayPriceParams.lastUpdateTime = year + month + day
        axios.post('/zues/api/price/adjust', this.todayPriceParams).then(res=>{
          let {data, status} = res
          if(status === 200){
            if(data.code === 200){
              this.$Message.success(data.msg)
              this.todayPriceParams.adjust = 0
              this.search()
            }else{
              this.$Message.error(data.msg)
            }
          }
        })
      },
      adjustSinglePrice () {
        axios.post('/zues/api/price/update', this.singlePriceParams).then(res=>{
          let {data, status} = res
          if(status === 200){
            if(data.code === 200){
              this.priceModal = false
              this.$Message.success(data.msg)
              this.search()
            }else{
              this.$Message.error(data.msg)
            }
          }
        })
      },
      changeAdjustPrice (val) {
        this.todayPriceParams.adjust = Number(this.todayPriceParams.adjust) + Number(val)
      },
      confirmAdjustPrice () {
        this.$Modal.confirm({
          title: '价格调整',
          content: `今日价格统一${this.todayPriceParams.adjust>0? "上调：" + this.todayPriceParams.adjust : "下调：" + this.todayPriceParams.adjust} 元 
          <br />(非当天上传的价格无法统一调整)`,
          onOk: ()=>{
            this.ajustTodayPrice()
          }
        })
      }
    }
  }
</script>
<style>
  .zeus-search{
    margin-bottom: 10px;
    text-align: left;
    
  }
  .price input[type=number]{
    -moz-appearance:textfield;
  }
  .price input[type=number]::-webkit-inner-spin-button,
  .price input[type=number]::-webkit-outer-spin-button{
    -webkit-appearance: none;
    margin: 0;
  }
  .ivu-table th.price-column{
        /* background-color: #2db7f5;
        color: #fff; */
    }
  .ivu-table td.price-column{
        color: #2db7f5;
    }
</style>
