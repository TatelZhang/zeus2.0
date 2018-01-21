<template>
  <div class="message-container">
    <div class="ivu-row">
        <span class="margin-right-10">消息类型：</span>
        <Select v-model="searchMessage.messageType" placeholder="消息类型" size="large" clearable style="display: inline-block;width: 211px;">
            <Option v-for="item in messageType" :key="item.value" :value="item.value">{{item.key}}</Option>
          </Select>
        <span class="margin-10">创建日期：</span>
        <DatePicker placeholder="开始日期" size="large" v-model="searchMessage.startTime"></DatePicker>
        <span class="margin-10">-</span>
        <DatePicker placeholder="结束日期" size="large" v-model="searchMessage.endTime"></DatePicker>
        <Button size="large" type="info" class="margin-10" @click="startSearch">查询</Button>
        <Button size="large" type="warning" @click="startAdd">添加消息</Button>
    </div>
    <br />
    <ZTable :column="table.column" :config="table.config" ref="message" :query="searchMessage"></ZTable>
    <Modal
    v-model="modalMessage.status"
    @on-ok="addMessage"
    >
      <h2 slot="header" style="color:#f60;text-align:center">
        <Icon :type="modalMessage.icon"></Icon>
        <span>{{modalMessage.head}}</span>
      </h2>
      <div >
        <div class="ivu-row">
          <Select v-model="submitMessage.messageType" placeholder="消息类型" size="large" clearable>
            <Option v-for="item in messageType" :key="item.value" :value="item.value">{{item.key}}</Option>
          </Select>
        </div>
        <br />
        <Input v-model="submitMessage.message" placeholder="填写消息内容" type="textarea" :rows="6"></Input>
      </div>
    </Modal>
    <Modal>

    </Modal>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        table: {
          column: [
            {
              title: '消息类型',
              key: 'messageType',
              width: 200,
              render: (h, p) => {
                let {row: {messageType}} = p
                // console.log(this.messageType)
                for(let type of this.messageType){
                  if(messageType === type.value)return type.key
                }
              }
            },{
              title: '消息内容',
              key: 'message',
            },{
              title: '创建时间',
              key: 'createTime',
              width: 300,
              render: (h, p) => {
                let {row: {createTime}} = p
                // console.log(typeof createTime)
                return new Date(Number(createTime)).formatDate('yyyy-MM-dd hh:mm')
              }
            },{
              title: '操作',
              width: 200,
              align: 'center',
              render: (h, p) => {
                let {row: {messageId},row} = p
                return h('div', {
                  style: {
                    textAlign: 'center',
                  }
                },[
                  h('Button', {
                    props: {
                      type: 'warning',
                      
                    },
                    'class': {
                      'margin-10': true
                    },
                    on: {
                      click: ()=>{
                        this.startChange(row)
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'error'
                    },
                    on: {
                      click: ()=> {
                        this.removeMessage(messageId)
                      }
                    }
                  }, '删除')
                ])
              }
            }
          ],
          config: {
            url: '/zues/api/message/list',
            pageSize: 15
          }
        },
        messageType: [{ value: '1', key: '供应商' }, { value: '2', key: '需求' },{ value: '3', key: '现货' }],
        searchMessage: {
          startTime: '',
          endTime: '',
          messageType: ''
        },
        modalMessage: {
          status: false,
          head: '添加消息',
          icon: 'android-add',
        },
        submitMessage: {
          messageType: '',
          message: '',
          messageId: null
        }
      }
    },
    methods: {
      // 用于刷新表单，
      startSearch () {
        this.$refs.message.search()
      },
      // 更新Modal框为新增
      startAdd () {
        this.modalMessage.head = "添加消息"
        this.modalMessage.icon = "android-add"
        this.submitMessage.messageId = null
        this.submitMessage.message = ''
        this.submitMessage.messageType = ''
        this.modalMessage.status = true
      },
      // 更新Modal框为更改
      startChange (row) {
        this.modalMessage.head = "修改消息"
        this.modalMessage.icon = "edit"
        this.submitMessage.messageType = row.messageType
        this.submitMessage.message = row.message
        this.submitMessage.messageId = row.messageId 
        this.modalMessage.status = true
      },
      // 新增message或更改message
      addMessage () {
        let targeturl = '/zues/api/message/add'
        
        if(this.submitMessage.messageId){
          targeturl = '/zues/api/message/update'
        }
        axios.post(targeturl, this.submitMessage).then(res=>{
          let {data, status} = res
          if(status === 200){
            if(data.code === 200){
              this.$Message.success(data.msg)
              this.startSearch()
              this.submitMessage = {message: '', messageType: ''}
            }else{
              this.$Message.error(data.msg)
              this.modalMessage.status = true
            }
          }
        })
      },
      // 删除message
      removeMessage (messageId) {
        this.$Modal.confirm({
          title: '警告',
          content: '确认删除这条消息？',
          onOk: ()=>{
            axios.post('/zues/api/message/delete', {messageId}).then(res=>{
              let {data, status} = res
              if(status === 200){
                if(data.code === 200){
                 this.$Message.success(data.msg)
                 this.startSearch()
                }else{
                  this.$Message.error(data,msg)
                }
              }
            })
          }
        })
      }
    }
  }
</script>
<style>
  #app .message-container{
    text-align: left;
  }
 
</style>
