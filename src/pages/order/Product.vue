<template>
  <div class="product-container">
    <div class="zeus-search">
      <div class="ivu-row" style="margin-bottom: 20px;">
        <span class="margin-right-10">规格：</span>
        <Input style="display: inline-block; width: 211px;" v-model="searchParams.spec" size="large" placeholder="规格"></Input>
        <span class="margin-10">到岸目的地：</span>
        <Input style="display: inline-block; width: 211px;" :value="searchParams.comId | companyName" size="large" readonly></Input>
        <span class="margin-10">供应商所在地：</span>
        <ZSelect style="display: inline-block; width: 211px;" v-model="searchParams.address" size="large" placeholder="供应商所在地" data="/zues/api/supplier/address" keyValue="address-address"/>
        <span class="margin-10">类别：</span>
        <Select style="display: inline-block; width: 211px;" v-model="searchParams.type" size="large" clearable>
          <Option value="黑管"></Option>
          <Option value="镀锌带"></Option>
          <Option value="热镀锌"></Option>
        </Select>
        <Button class="margin-10" size="large" icon="ios-search" type="primary" @click="search">厂家现货查询</Button>
      </div>
    </div>
    <div style="margin-bottom: 10px;">
      <span style="font-size: 20px;">厂家现货价格/库存表：</span>
      <Button style="float: right;" type="success" icon="wrench" @click="modalStatus.header = true">自定义表头</Button>
    </div>
    <ZTable :column="tableHeader" :config="table.config" :query="searchParams" ref="ztable" :row-class-name="markRow"/>
    <Modal v-model="modalStatus.header">
      <h2 slot="header" style="text-align:center">
        <span>自定义表头</span>
      </h2>
      <div style="width: 80%; margin: 0 auto;">
        <CheckboxGroup style="font-size: 14px;" v-model="currHeader">
          <Checkbox v-for="item in headers" :key="item.key" :label="item.key" style="font-size: 14px;width:45%;">{{item.title}}</Checkbox>
        </CheckboxGroup>
      </div>
      <div slot="footer">
        <Button long type="primary" @click="saveHeader">保存</Button>
      </div>
    </Modal>
    <Modal v-model="modalStatus.mark" width="20%">
      <h2 slot="header" style="text-align:center">
        <span>标记类型选择</span>
      </h2>
      <div style="width: 50%; margin: 0 auto;">
        <RadioGroup v-model="markParams.mark">
          <Radio label="1">
            <span>库存超期</span>
          </Radio>
          <Radio label="2">
            <span>虚拟库存</span>
          </Radio>
        </RadioGroup>
      </div>
      <div slot="footer">
        <Button long type="primary" @click="confirmMark">确认</Button>
      </div>
    </Modal>
    <!--<span class="warn-txt"><span class="red-mark">标记表示库存超期</span><span class="yellow-mark">标记表示虚拟库存</span></span>-->
    <Modal v-model="modalStatus.deal" width="20%">
      <h2 slot="header" style="text-align:center">
        <span>下单操作</span>
      </h2>
      <div>
        <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend">
          <div class="ivu-input-group-prepend">
            <span>数量</span>
          </div>
          <input type="number" class="ivu-input ivu-input-large" placeholder="必填项" v-model.number="chartAmount">
        </div>
        <Input type="textarea" :rows="3" placeholder="填写备注" style="margin-top:10px;" v-model="comment"></Input>
      </div>
      <div slot="footer">
        <Button long type="primary" @click="dealConfirm">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import Emitter from '../mixin/emitter';
   function getComId() {
    let cookies = document.cookie
    let res = cookies.match(/comId=(\d*);/)
    return res[1]
  }
   function getUserId() {
    let cookies = document.cookie
    let res = cookies.match(/userId=(\w*);/)
    return res[1]
  }
  export default {
  data () {
      return {
        modalStatus: {
          header: false,
          deal: false,
          mark: false
        },
        searchParams: {
          spec: '',
          // material: '',
          type: '',
          address: '',
          comId: ''
        },
        headers: {
         spec: {
           title: '规格',
           key: 'spec',
           width: 110
         },
         long: {
           title: '长度',
           key: 'long',
           width: 80
         },
         lastUpdateTime: {
           title: '更新时间',
           key: 'lastUpdateTime'
         },
         type: {
           title: '类别',
           key: 'type'
         },
         supplierName: {
           title: '供应商',
           key: 'supplierName'
         },
         daPrice: {
           title: '到岸单价',
           key: 'daPrice',
           sortable: true
         },
         purePrice: {
           title: '开单价',
           key: 'purePrice',
           sortable: true,
           className: 'special-column'
         },
         inventoryAmount: {
           title: '库存',
           key: 'inventoryAmount',
           className: 'special-column'
         },
         perAmount: {
           title: '包装',
           key: 'perAmount'
         },
         perWeight: {
           title: '单支重量',
           key: 'perWeight',
           render (h, {row}) {//计算单支重量
            var specArr = row.spec.split("*");
            var height = Number(specArr[0]);
            var width = Number(specArr[1]);
            var land = Number(specArr[2]);
            var long = Number(row.long);
            var perimeter = height * 2 + width * 2;
            return ((perimeter / 3.14 - land) * land * long * 0.02466).toFixed(2) + 'kg';
          },
         },
         allWeight: {
          title: '库存重量',
          key: 'allWeight',
          render (h, {row}) {//计算总吨位
            var specArr = row.spec.split("*");
            var height = Number(specArr[0]);
            var width = Number(specArr[1]);
            var land = Number(specArr[2]);
            var long = Number(row.long);
            var perimeter = height * 2 + width * 2;
            var amount = Number(row.perAmount);
            var inventory = Number(row.inventoryAmount);
            return ((perimeter / 3.14 - land) * land * long * 0.02466 * amount * inventory / 1000).toFixed(2) + '吨';
            }
          },
          freight: {
            title: '运费',
            key: 'freight'
          },
          value: {
            title: '出厂价',
            key: 'value',
            sortable: true,
            className: 'special-column'
          },
          benifit: {
            title: '厂家优惠',
            key: 'benifit',
            render: (h, p) => {
              let {row: {benifit, benifitAdjust, purePrice}} = p
              let up = h('Icon', {props: {type: 'arrow-up-c'}})
              let down = h('Icon', {props: {type: 'arrow-down-c'}})
              let priceStatus = ''
              if(benifitAdjust > 0 && purePrice){
                priceStatus = h('span', {style: {marginLeft: '5px', color: '#13ce66', fontSize: '10px'}}, [down, Math.abs(benifitAdjust)])
              }else if(benifitAdjust < 0 && purePrice){
                priceStatus = h('span', {style: {marginLeft: '5px', color: 'red', fontSize: '10px'}}, [up, Math.abs(benifitAdjust)])
              }
              return h('div', [benifit, priceStatus])
            }
          },
          operate: {
            title: '操作',
            width: 180,
            align: 'center',
            key: 'operate',
            render: (h, p) => {
              let {row: {mark, supplierInventoryId, value}, index} = p
              let button = h('Button', {
                props: {type: 'info'}, 
                on: {
                  click: () => {
                    this.startMark(supplierInventoryId, index)
                  }
                },}, '标记')
              if(mark) {
                button = h('Button', 
                {props: {type: 'warning'},
                on: {
                  click: () => {
                    this.cancelMark(supplierInventoryId, index)
                  }
                }
                }, '清除')
              }
              return h('div', [
                h('Button', 
                {
                  'class': ['margin-right-10'],
                  props: {
                    type: 'success',
                    disabled: !value
                  },
                  on: {
                    click: () => {
                      this.startDeal (supplierInventoryId)
                    }
                  }
                }, 
                '下单'),
                button
              ])
            }
          }
        },
        table: {
          config: {
              url: '/zues/api/product/list',
              // pageSize: 20
          }
        },
        currHeader: [],
        markParams: {
          mark: '1',
          supplierInventoryId: '',
          index: ''
        },
        // 下单参数
        chartAmount: 1,
        comment: '',
        supplierInventoryId: ''
    }
  },
  mixins: [Emitter],
  methods: {
    search() {
      this.$refs.ztable.search();
    },
    initHeader () { // 初始化行
      let header = localStorage.getItem('tableHeaders')
      // header = JSON.parse(header) // JSON 不能 parse 空字符串
      // if (header && header.length) { // header 不为 null 或为 []
      //   this.currHeader = header
      // }else{
      //   this.currHeader = ["spec", "long", "lastUpdateTime", "type", "supplierName", "daPrice", "purePrice", "inventoryAmount", "perAmount", "perWeight", "allWeight", "freight", "value", "benifit", "operate"]
      // }
      try {
        header = JSON.parse(header)
        if(header.length){
          this.currHeader = header
        }else {
          throw new Error();
        }
      } catch (error) {
        this.currHeader = ["spec", "long", "lastUpdateTime", "type", "supplierName", "daPrice", "purePrice", "inventoryAmount", "perAmount", "perWeight", "allWeight", "freight", "value", "benifit", "operate"]
      }
    },
    saveHeader () {  // 保存自定义header到本地
      let list = this.currHeader.slice()
      if(list.length){
        localStorage.setItem('tableHeaders', JSON.stringify(list))
        this.$Message.success('表头保存成功')
      }
      this.modalStatus.header = false;
    },
    markRow (row, index) { // 显示标记类型行
      let {mark} = row
      if(mark === '1') {
        return 'red-mark'
      }else if(mark === '2'){
        return 'yellow-mark'
      }
    },
    startMark (id, index) {
      this.modalStatus.mark = true;
      this.markParams.supplierInventoryId = id
      this.markParams.index = index
    },
    confirmMark () {
      this.doMark(this.markParams)
      this.modalStatus.mark = false
    },
    doMark ({supplierInventoryId, mark, index}) {
      let params = {
        supplierInventoryId,
        mark
      }
      axios.post('/zues/api/inventory/update', params).then(({status, data})=> {
        if(status === 200 && data.code === 200){
          this.$refs.ztable.solveData(index, 'mark', mark)
        }
      })
    },
    cancelMark (id, index){
      this.doMark({supplierInventoryId: id, mark: '', index})
    },
    startDeal (id) {
      this.modalStatus.deal = true;
      this.chartAmount = 1
      this.comment = ''
      this.supplierInventoryId = id
    },
    dealConfirm () {
      let params = {}
      params.comId = getComId()
      params.chartAmount = this.chartAmount
      params.comment = this.comment
      params.supplierInventoryId = this.supplierInventoryId
      params.userId = getUserId()
      axios.post('/zues/api/chart/addToChart', params).then(({status, data}) => {
        if(status === 200 && data.code === 200){
          this.$Message.success(data.msg)
          this.modalStatus.deal = false
        }
      })
    }
  },
  watch: {
    chartAmount (val, oldVal) {
      if(val < 0){
        this.chartAmount = oldVal
      }
    }
  },
  computed: {
    tableHeader () {
      let tableHeader = []
      let curr = this.currHeader.slice()
      let keys = Object.keys(this.headers)
      for(let key of keys){
        if(curr.indexOf(key) !== -1){
          tableHeader.push(this.headers[key])
        }
      }
      return tableHeader
    }
  },
  filters: {
    companyName (val) {
      const company = {
        '01': '南京奎鑫',
        '02': '武汉奎鑫',
        '03': '西安奎鑫',
        '04': '长春奎鑫',
        '05': '沈阳奎鑫',
        '06': '山东奎鑫',
        '07': '南昌奎鑫',
      }
      return company[val]
    }
  },
  mounted () {
    this.searchParams.comId = getComId()
    this.initHeader()
  }
}
</script>
<style>
  .ivu-table .red-mark td{
    color: red;
  }
  .ivu-table .yellow-mark td{
    color: #f7ba2a;
  }
  .ivu-table td.special-column {
    color: red;
    text-decoration: underline;
    font-weight: bold;
  }
</style>
