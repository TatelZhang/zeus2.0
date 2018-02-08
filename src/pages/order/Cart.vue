<template>
  <div class="cart-container">
    <div style="margin-bottom: 10px;position: relative">
      <span>已选商品(含运费)： </span>
      <span>￥{{checkedPrice}}</span>
      <span>（采购吨位：{{checkedWeight}}）</span>
      <Button type="info" size="large" @click="changeChartAdjust">采购议价下浮</Button>
      <Button type="primary" size="large" class="margin-left-10" @click="submitCart">提交订单</Button>
      <Button style="position:absolute;right: 0; bottom: 0;" type="success" icon="wrench" @click="modalStatus.header = true">自定义表头</Button>
    </div>
    <div>
      <Table :data="cartData" :columns="nowHeader" stripe border @on-selection-change="solveColumnChange" ref="cartTable"></Table>  
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
    <Modal v-model="modalStatus.change" width="20%">
      <h2 slot="header" style="text-align:center">
        <span>修改订单</span>
      </h2>
      <div>
        <div class="margin-bottom-10 ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend">
          <div class="ivu-input-group-prepend">
            <span>采购数量</span>
          </div>
          <input type="number" class="ivu-input ivu-input-large" v-model.number="changeParams.chartAmount" @input="solvePrice">
        </div>
        <div class="margin-bottom-10 ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend">
          <div class="ivu-input-group-prepend">
            <span>采购议价</span>
          </div>
          <input type="number" class="ivu-input ivu-input-large" v-model.number="changeParams.chartAdjust" @input="solvePrice">
        </div>
        <div class="ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend">
          <div class="ivu-input-group-prepend">
            <span>总价</span>
          </div>
          <input type="number" class="ivu-input ivu-input-large" :value="changeParams.totalPrice" readonly>
        </div>
        <Input type="textarea" :rows="3" placeholder="备注" style="margin-top:10px;" v-model="changeParams.comment"></Input>
      </div>
      <div slot="footer">
        <Button long type="primary" @click="confirmChange">确认</Button>
      </div>
    </Modal>
    <Modal v-model="modalStatus.adjust" width="20%">
      <h2 slot="header" style="text-align:center">
        <span>采购议价下浮</span>
      </h2>
      <div>
        <div class="margin-bottom-10 ivu-input-wrapper ivu-input-wrapper-large ivu-input-type ivu-input-group ivu-input-group-large ivu-input-group-with-prepend">
        <div class="ivu-input-group-prepend">
          <span>下浮金额</span>
        </div>
        <input type="number" class="ivu-input ivu-input-large" v-model.number="adjustPrice">
        </div>
      </div>
      <div slot="footer">
        <Button long type="primary" @click="confirmAdjust">确认</Button>
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
          change: false,
          adjust: false
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
              this.cartData[index] = row
              const specArr = row.spec.split('*');
              const height = Number(specArr[0]);
              const width = Number(specArr[1]);
              const land = Number(specArr[2]);
              const long = Number(row.long) ? Number(row.long) : 6;
              const per = Number(row.perAmount);
              const perimeter = 2 * height + 2 * width;
              const amount = Number(row.chartAmount);
              row.chartWeight = (((perimeter/3.14 - land) * land * long * 0.02466 * amount * per)/1000).toFixed(2);
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
              return adjust.toFixed(2);
            }
          },
          totalPrice: {
            title: '金额',
            key: 'totalPrice',
            width: 120,
            render: (h, p) => {
              let {row, index} = p
              row.chartAmount   // 用于触发更新
              const price = Number(row.purePrice);
              const adjust = Number(row.chartAdjust?row.chartAdjust:0) * row.chartWeight;
              const totoalPice = price?price*row.chartWeight-adjust:0;
              row.totalPrice = totoalPice.toFixed(2);
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
              const {chartId} = p.row
              return h('div', [
                h('Button', {
                  style: {marginRight: '10px'},
                  props: {type: 'warning'},
                  on: {
                    click: () => {
                      this.showChangeModal(p)
                    }
                  }
                },'修改'),
                h('Button', {
                  props: {type: 'error'},
                  on: {
                    click: () => {
                      this.delCartItem (p.index, chartId)
                    }
                  }
                  }, '删除')
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
        checkedAdjust: 0,
        checkedId: [],
        changeParams: {
          chartAmount: 0,  // 采购数量
          chartAdjust: 0,   // 采购议价
          totalPrice: 0,    // 总价
          comment: '',      // 备注
          index: 0
        },
        currRow: {},        // 当前修改选中行
        adjustPrice: 0,
        submitRow: []
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
            this.cartData.map((item) => {
              item.chartWeight = 0
              item.purePrice = 0
              item.daPrice = 0
              item.totalAdjust = 0
              item.totalPrice = 0
            })
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
      solveColumnChange (columns) {
        this.checkedId = []
        columns.map((item, index) => {
          this.checkedId.push(item.chartId)
        })
        this.changeCheckedData()
      },
      getChartWeight () {  // 获取重量
        // 分解spec
        const row = this.currRow
        const specArr = row.spec.split('*');
        const height = Number(specArr[0]);
        const width = Number(specArr[1]);
        const land = Number(specArr[2]);
        const long = Number(row.long) ? Number(row.long) : 6;
        const per = Number(row.perAmount);
        const perimeter = 2 * height + 2 * width;
        const amount = Number(this.changeParams.chartAmount);
        const chartWeight = (((perimeter/3.14 - land) * land * long * 0.02466 * amount * per)/1000).toFixed(2);
        return chartWeight
      },
      initChangeParams (row) { // 初始化changgeParams
        let {chartAmount, chartAdjust, totalPrice, comment} = row
        this.currRow = row
        this.changeParams.chartAmount = chartAmount
        this.changeParams.chartAdjust = chartAdjust
        this.changeParams.totalPrice = totalPrice
        this.changeParams.chartWeight = 0
        this.changeParams.comment = comment
      },
      solvePrice () {   // 根据数量和议价更改总价
        const chartWeight = this.getChartWeight()
        const price = Number(this.currRow.purePrice)
        const adjust = Number(this.changeParams.chartAdjust || 0) * chartWeight
        const totoalPice = price?price*chartWeight-adjust:0
        this.changeParams.totalPrice = totoalPice.toFixed(2)
      },
      showChangeModal (p) { // 显示Modal，初始化数据
        const {row, index} = p
        this.changeParams.index = index
        this.initChangeParams(row)
        this.modalStatus.change = true
        // console.log(row)
      },
      changeCartData (index, del=false) {  // 修改数据后手动更新页面
        if(del){
          this.cartData.splice(index, 1)
          return 0
        }
        this.cartData[index] = this.currRow
      },
      confirmChange () {    // 更改购物车确定
        this.currRow.chartAmount = this.changeParams.chartAmount
        this.currRow.chartAdjust = this.changeParams.chartAdjust
        this.currRow.comment = this.changeParams.comment
        //  更改参数
        const params = {}
        params.chartId = this.currRow.chartId
        params.chartAdjust = this.changeParams.chartAdjust
        params.chartAmount = this.changeParams.chartAmount
        params.comment = this.changeParams.comment
        if(!this.changeParams.chartAmount || this.changeParams.chartAmount <= 0){
          this.$Message.error('请确认数量')
          return 0
        }
        axios.post('/zues/api/chart/update', params).then((res) => {
          let {status, data} = res
          if(status === 200 && data.code === 200){
            this.modalStatus.change = false
            this.$Message.success('修改订单成功')
            this.changeCartData(this.changeParams.index)
            this.changeCheckedData()
          }
        })
      },
      delCartItem (index, chartId) { // 删除订单Item
        this.$Modal.confirm({title: '删除', content: '从购物车删除？', 
        onOk: () => {
          axios.post('/zues/api/chart/remove', {chartId: chartId + ''}).then((res) => {
            const {status, data} = res
            if(status === 200 && data.code === 200){
              this.changeCartData(index, true)
              this.$Message.success('删除成功')
              this.solveColumnChange([])  // 清除选中项
            }
          })
        }})
      },
      changeChartAdjust () {    // 打开采购议价调整模态框
        if(this.checkedId.length){
          this.modalStatus.adjust = true
        }else{
          this.$Message.info('请选择商品')
        }
      },
      confirmAdjust () {    // 采购议价调整
        this.cartData.map((item) => {
          if(this.checkedId.indexOf(item.chartId) > -1){
            item.chartAdjust = -(this.adjustPrice || 0)
          }
        })
        this.modalStatus.adjust = false
        this.$refs.cartTable.$nextTick(()=>{
          this.changeCheckedData()
        })
      },
      submitCart () {
        const params = {
          orderAdjust: this.checkedAdjust, 
          orderPrice: this.checkedPrice, 
          orderWeight: this.checkedWeight,
          comId: getComId(),
          userId: getUserId()
          }
          params.supplierInventoryIds = this.submitRow.slice()
        axios.post('/zues/api/order/add', params).then(({status, data}) => {
          if(status === 200 && data.code === 200){
            this.$Message.success(data.msg)
            this.getData()
            this.solveColumnChange([])
          }else{
            this.$Message.error(data.msg || '请确认购物车')
          }
        })
      },
      changeCheckedData () {  // 已选商品信息显示及更新
        let p = 0
        let w = 0
        let a = 0
        this.checkedPrice = '0.00'
        this.checkedWeight = '0.00'
        this.submitRow = []
        this.cartData.map((item) => {
          if(this.checkedId.indexOf(item.chartId) > -1){
            let {totalPrice, chartWeight, totalAdjust} = item
            p += Number(totalPrice) || 0
            w += Number(chartWeight) || 0
            a += Number(totalAdjust) || 0
            this.submitRow.push(item)
          }
        })
        this.checkedPrice = p.toFixed(2)
        this.checkedWeight = w.toFixed(2)
        this.checkedAdjust = a
      }
    },
    watch: {
      
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
    created () {
      this.getData()
    },
    mounted () {
      this.initHeader()
    }
  }
</script>
<style>
</style>
