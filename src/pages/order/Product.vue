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
  </div>
</template>
<script>
  import Emitter from '../mixin/emitter';
   function getComId() {
    let cookies = document.cookie
    let res = cookies.match(/comId=(\d*);/)
    return res[1]
  }
  export default {
  data () {
      return {
        modalStatus: {
          header: false
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
           key: 'spec'
         },
         long: {
           title: '长度',
           key: 'long'
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
           sortable: true
         },
         inventoryAmount: {
           title: '库存',
           key: 'inventoryAmount'
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
            sortable: true
          },
          benifit: {
            title: '厂家优惠',
            key: 'benifit'
          },
          operate: {
            title: '操作',
            width: 180,
            align: 'center',
            key: 'operate',
            render: (h, p) => {
              return h('div', [
                h('Button', {
                  'class': ['margin-right-10']
                }, '下单'),
                h('Button', {}, '标记')
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
        currHeader: []
      }
  },
  mixins: [Emitter],
  methods: {
    search() {
      this.$refs.ztable.search();
    },
    initHeader () {
      let header = localStorage.getItem('tableHeaders')
      header = JSON.parse(header)
      if (header.length) {
        this.currHeader = header
      }else{
        this.currHeader = ["spec", "long", "lastUpdateTime", "type", "supplierName", "daPrice", "purePrice", "inventoryAmount", "perAmount", "perWeight", "allWeight", "freight", "value", "benifit", "operate"]
      }
    },
    saveHeader () {
      let list = this.currHeader.slice()
      if(list.length){
        localStorage.setItem('tableHeaders', JSON.stringify(list))
      }
      this.modalStatus.header = false;
      this.$Message.success('表头保存成功')
    },
    markRow (row, index) {
      let {mark} = row
      if(mark) return 'marked-row'
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
  .ivu-table .marked-row td{
    color: red;
  }
</style>
