<template>
  <div>
    <div class="ivu-row">
      <div class="ivu-col ivu-col-span-3">
        <Input placeholder="销售名称" size="large"></Input>
      </div>
      <div class="ivu-col ivu-col-span-3">
        <Input placeholder="客户名称" size="large"></Input>
      </div>
      <div class="ivu-col ivu-col-span-1">
        <span style="line-height: 36px;font-size: 14px">提交日期:</span>
      </div>
      <div class="ivu-col ivu-col-span-3">
        <DatePicker type="date" placeholder="Select date" style="width: 200px"  size="large"></DatePicker>
      </div>
      <div class="ivu-col ivu-col-span-1" style="width:1%">
        <span style="line-height: 36px;font-size: 14px">-</span>
      </div>
      <div class="ivu-col ivu-col-span-3">
        <DatePicker type="date" placeholder="Select date" style="width: 200px"  size="large"></DatePicker>
      </div>
      <div class="ivu-col ivu-col-span-2">
        <Button type="primary" icon="ios-search" size="large" long>查询</Button>
      </div>
    </div>
    <div>
      <br>
      <div style="text-align: left;font-size: 20px">需求列表：</div>
      <Tabs>
        <TabPane label="未报价需求"></TabPane>
        <TabPane label="待反馈需求"></TabPane>
        <TabPane label="已反馈报价"></TabPane>
        <TabPane label="未成交需求"></TabPane>
        <TabPane label="成交需求"></TabPane>
      </Tabs>
      <ZTable :column="table.column" :config="table.config"></ZTable>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        table: {
          column: [
            {
              title: '#',
              width: 60,
              align: 'center',
              render: (h, p) =>{
                let {row:{_index}} = p
                return _index+1
              }
            },
            {
              title: '销售'
            },{
              title: '销售'
            },{
              title: '销售'
            },{
              title: '销售'
            },{
              title: '销售'
            },{
              title: '销售'
            },{
              title: '销售'
            },{
              title: '销售'
            },{
              title: '销售'
            },{
              title: '销售'
            },
          ],
          config: {url:'/zues/api/demand/list'}
        }
      }
    }
    
  }
</script>