<template>
  <div class="record-container">
    <div class="ivu-row">
        <span class="margin-right-10">时间：</span>
        <DatePicker size="large" placeholder="选择日期" @on-change="changeCreateTime"></DatePicker>
        <span class="margin-10">操作人：</span>
        <Input style="display:inline-block; width:211px;" size="large" placeholder="支持模糊搜索" v-model="recordSearch.operate" :value="'yyyy-MM-dd'"></Input>
        <Button size="large" type="info" class="margin-10" @click="searchRecord">查询</Button>
    </div>
    <br />
    <ZTable :column="table.column" :config="table.config" :query="recordSearch" ref="record"></ZTable>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        recordSearch: {
          createTime: '',
          operate: '',
          id: ''
        },
        table: {
          column: [
            {title: '序号', key: 'recordId',width: 200},
            {title: '时间', key: 'createTime',sortable: true , render: (h, p)=>{
              let {row: {createTime}} = p
              return new Date(createTime).toLocaleString()
            }},
            {title: '用户ID', key: 'userId'},
            {title: '修改记录', key: 'type'},
            {title: '操作明细', key: 'detail'}
          ],
          config: {
            url: '/zues/api/operate/list'
          }
        }
      }
    },
    methods: {
      searchRecord () {
        this.$refs.record.search()
      },
      changeCreateTime (e) {
        this.recordSearch.createTime = e
      }
    }
  }
</script>
<style>
  #app .record-container{
    text-align: left;
  }
</style>
