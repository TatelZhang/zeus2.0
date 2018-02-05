<template>
  <div>
    <div style="margin-bottom: 10px;position: relative">
      <span>已选商品(含运费)： </span>
      <span>￥{{checkedPrice}}</span>
      <span>（采购吨位：{{checkedWeight}}）</span>
      <Button type="primary" size="large">采购议价下浮</Button>
      <Button type="primary" size="large" class="margin-left-10">提交订单</Button>
      <Button style="position:absolute;right: 0; bottom: 0;" type="success" icon="wrench" @click="modalStatus.header = true">自定义表头</Button>
    </div>
    <div>
      <Table :data="cartData" :columns="nowHeader" stripe border @on-selection-change="solveColumnChange"></Table>  
      <Page :total="pageStatus.totalCount" :current="pageStatus.page" :page-size="pageStatus.pageSize" @on-change="getData" style="margin-top: 10px; text-align: right;"></Page>
    </div>
    <Modal v-model="modalStatus.header">
      <h2 slot="header" style="text-align:center">
        <span>自定义表头</span>
      </h2>
      <div style="width: 80%; margin: 0 auto;">
        <CheckboxGroup style="font-size: 14px;" v-model="currHeader">
          <Checkbox v-for="item in cartHeaders" :key="item.key" :label="item.key" style="font-size: 14px;width:45%;">{{item.title}}</Checkbox>
        </CheckboxGroup>
      </div>
       <div slot="footer">
        <Button long type="primary" @click="saveHeader">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        modalStatus: {
          header: false
        },
        cartHeaders: {
          spec: {
            title: '规格',
            key: 'spec'
          },
          long: {
            title: '长度',
            key: 'long'
          },
          type: {
            title: '类别',
            key: 'type'
          },
          supplierName: {
            title: '供应商',
            key: 'supplierName'
          },
          chartAmount: {
            title: '数量',
            key: 'chartAmount'
          },
          perAmount: {
            title: '包装',
            key: 'perAmount'
          },
          chartWeight: {
            title: '吨位',
            key: 'chartWeight',
            render: (h, p) => {
              let {row, index} = p
              if(!row.spec) return 0
              const specArr = row.spec.split('*');
              const height = Number(specArr[0]);
              const width = Number(specArr[1]);
              const land = Number(specArr[2]);
              const long = Number(row.long) ? Number(row.long) : 6;
              const per = Number(row.perAmount);
              const perimeter = 2 * height + 2 * width;
              const amount = Number(row.chartAmount);
              row.chartWeight = (((perimeter/3.14 - land) * land * long * 0.02466 * amount * per)/1000).toFixed(2);
              this.cartData[index].chartWeight = row.chartWeight
              return (((perimeter/3.14 - land) * land * long * 0.02466 * amount * per)/1000).toFixed(2);
            }
          },
          purePrice: {
            title:'开单价',
            key: 'purePrice',
            render: (h, p) => {
              let {row, index} = p
              const value = Number(row.value);
              const freight = Number(row.freight) - Number(row.benifit?row.benifit:0);
              row.purePrice = (row.value - row.benifit).toFixed(2);
              this.cartData[index].purePrice = row.purePrice // 将purePrice 添加到原始数据
              return row.purePrice
            }
          },
          daPrice: {
            title: '到岸价',
            key: 'daPrice',
            render: (h ,p) => {
              let {row, index} = p
              const value = Number(row.value);
              const freight = Number(row.freight) - Number(row.benifit?row.benifit:0);
              row.daPrice = (row.value + freight).toFixed(2);
              this.cartData[index].daPrice = row.daPrice
              return row.daPrice
            }
          },
          chartAdjust: {
            title: '采购议价',
            key: 'chartAdjust'
          },
          totalAdjust: {
            title: '议价总额',
            key: 'totalAdjust',
            render: (h, p) => {
              let {row, index} = p
              const adjust = Number(row.chartAdjust?row.chartAdjust:0) * row.chartWeight;
              row.totalAdjust = adjust.toFixed(2);
              this.cartData[index].totalAdjust = row.totalAdjust
              return adjust.toFixed(2);
            }
          },
          totalPrice: {
            title: '金额',
            key: 'totalPrice',
            render: (h, p) => {
              let {row, index} = p
              const price = Number(row.purePrice);
              const adjust = Number(row.chartAdjust?row.chartAdjust:0) * row.chartWeight;
              const totoalPice = price?price*row.chartWeight-adjust:0;
              row.totalPrice = totoalPice.toFixed(2);
              this.cartData[index].totalPrice = row.totalPrice
              return totoalPice.toFixed(2);
            }
          },
          userId: {
            title: '用户ID',
            key: 'userId'
          },
          comment: {
            title: '备注',
            key: 'comment',
            width: 200
          },
          operate: {
            title: '操作',
            key: 'operate',
            align: 'center',
            width: 180,
            render: (h, p) => {
              return h('div', [
                h('Button', {
                  style: {marginRight: '10px'},
                  props: {type: 'warning'},
                  on: {
                    click: () => {
                      console.log(p)
                    }
                  }
                },'修改'),
                h('Button', {
                  props: {type: 'error'}}, '删除')
              ])
            }
          }
        },
        cartData: [],
        pageStatus: {
          page: 1,
          pageSize: 100,
          totalCount: 0,
        },
        currHeader: [],
        checkedPrice: '0.00',
        checkedWeight: '0.00',
        checkedColumns: []
      }
    },
    methods: {
      getData (page=1) {
        let params = {page}
        params.pageSize = this.pageStatus.pageSize
        axios.get('/zues/api/chart/list', {params}).then((res) => {
          let {status, data: {data, code}} = res
          // if(this.cartData.length === 0 && this.pageStatus.page >1)
          if(status === 200 && code === 200) {
            this.cartData = data.row.slice()
            this.pageStatus.totalCount = data.totalCount || 0
            this.pageStatus.page = Number(data.page) || 1
          }
        })
      },
      initHeader () { // 初始化行
        let header = localStorage.getItem('cartHeaders')
        try {
          header = JSON.parse(header)
          if(header.length){
            this.currHeader = header
          }else {
            throw new Error();
          }
        } catch (error) {
          this.currHeader = Object.keys(this.cartHeaders)
        }
      },
      saveHeader () {
        let list = this.currHeader.slice()
        if(list.length){
          localStorage.setItem('cartHeaders', JSON.stringify(list))
          this.$Message.success('表头保存成功')
        }
        this.modalStatus.header = false
      },
      solveColumnChange (selection) {
        this.checkedColumns = selection
        this.checkedPrice = '0.00'
        let p = 0
        let w = 0
        this.checkedWeight = '0.00'
        selection.map((item, index) => {
          let {totalPrice, chartWeight, totalAdjust} = item
          p += Number(totalPrice) || 0
          w += Number(chartWeight) || 0
        })
        this.checkedPrice = p.toFixed(2)
        this.checkedWeight = w.toFixed(2)
      }
    },
    computed: {
      nowHeader () {
        let headers = []
        let curr = this.currHeader.slice()
        let keys = Object.keys(this.cartHeaders)
        headers.push({type: 'selection', width: 60})
        for(let key of keys){
          if(curr.indexOf(key) !== -1){
            headers.push(this.cartHeaders[key])
          }
        }
        return headers
      }
    },
    mounted () {
      this.getData()
      this.initHeader()
    }
  }
</script>