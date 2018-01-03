<template>
  <div class="member-container">
    <div class="ivu-row">
      <span class="margin-right-10">用户ID：</span>
      <Input style="display:inline-block; width:211px;" size="large" placeholder="支持模糊搜索" v-model="memberSearch.userId"></Input>
      <span class="margin-10">请选择公司：</span>
      <ZSelect style="display:inline-block; width:211px;" size="large" :data="companyList" keyValue="key-label" v-model="memberSearch.comId"></ZSelect>
      <Button size="large" type="info" class="margin-10" @click="searchMember">查询</Button>
      <Button size="large" type="warning" @click="memberModal=true">添加用户</Button>
    </div>
    <br>
    <ZTable :column="table.column" :config="table.config" :query="memberSearch" ref="member"></ZTable>
    <Modal v-model="memberModal">
      <h2 slot="header" style="color:#f60;text-align:center">
        <Icon type="person-add"></Icon>
        <span>新增用户</span>
      </h2>
      <div class="member-modal">
        <div class="info-item">
          <span class="margin-right-10">用户ID：</span>
          <Input style="display:inline-block; width:80%;" size="large" v-model="newMember.registerId"></Input>
        </div>
        <div class="info-item">
          <span class="margin-right-10">密码：</span>
          <Input style="display:inline-block; width:80%;" size="large" v-model="newMember.password"></Input>
        </div>
        <div class="info-item">
          <span class="margin-right-10">公司：</span>
          <ZSelect style="display:inline-block; width:80%;" size="large" :data="companyList" keyValue="key-label" v-model="newMember.comId"></ZSelect>
        </div>
      </div>
      <div slot="footer">
        <Button type="warning" size="large" long @click="newMemberSubmit">提交</Button>
        <div style="margin-top: 5px;">
          <Button size="large" long @click="clearNewMember">取消</Button>
        </div>
      </div>
    </Modal>
    <Modal v-model="modalStatus.authChange" @on-ok="uploadAuths">
      <h2 slot="header" style="color:#2db7f5;text-align:center">
        <Icon type="edit"></Icon>
        <span>修改权限</span>
      </h2>
      <CheckboxGroup style="font-size: 14px;" v-model="currentAuth">
      <Checkbox v-for="item in authNameList" :key="item.key" :label="item.key" style="font-size: 14px;">{{item.value}}</Checkbox>
      </CheckboxGroup>
    </Modal>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        memberSearch: {
          userId: '',
          comId: ''
        },
        companyList: [
          {
            value: '00',
            label: '奎鑫总公司'
          }, {
            value: '01',
            label: '南京奎鑫'
          }, {
            value: '02',
            label: '武汉奎鑫'
          }, {
            value: '03',
            label: '西安奎鑫'
          }, {
            value: '04',
            label: '长春奎鑫'
          }, {
            value: '05',
            label: '沈阳奎鑫'
          }, {
            value: '06',
            label: '山东奎鑫'
          }, {
            value: '07',
            label: '南昌奎鑫'
          }
        ],
        table: {
          column: [
            {title: '用户ID', key: 'userId'},
            {title: '查询', key: 'queryAuth', align: 'center', 
            render: (h, p)=>{
              let {row}=p 
              if(row.queryAuth) return h('Icon', {props: {type: 'checkmark'}})
              return h('Icon', {props: {type: 'close'}})
              }
            },
            {title: '采购', key: 'orderAuth', align: 'center',
            render: (h, p)=>{
              let {row}=p 
              if(row.orderAuth) return h('Icon', {props: {type: 'checkmark'}})
              return h('Icon', {props: {type: 'close'}})
              }
            },
            {title: '供应商设置', key: 'supplierAuth', align: 'center',
            render: (h, p)=>{
              let {row}=p 
              if(row.supplierAuth) return h('Icon', {props: {type: 'checkmark'}})
              return h('Icon', {props: {type: 'close'}})
              }
            },
            {title: '价格表', key: 'valueAuth', align: 'center',
            render: (h, p)=>{
              let {row}=p 
              if(row.valueAuth) return h('Icon', {props: {type: 'checkmark'}})
              return h('Icon', {props: {type: 'close'}})
              }
            },
            {title: '库存表', key: 'inventoryAuth', align: 'center',
            render: (h, p)=>{
              let {row}=p 
              if(row.inventoryAuth) return h('Icon', {props: {type: 'checkmark'}})
              return h('Icon', {props: {type: 'close'}})
              }
            },
            {title: '定制需求', key: 'demandAuth', align: 'center', 
            render: (h, p)=>{
              let {row}=p 
              if(row.demandAuth) return h('Icon', {props: {type: 'checkmark'}})
              return h('Icon', {props: {type: 'close'}})
              }
            },
            {title: '管理员', key: 'adminAuth', align: 'center',
            render: (h, p)=>{
              let {row}=p 
              if(row.adminAuth) return h('Icon', {props: {type: 'checkmark'}})
              return h('Icon', {props: {type: 'close'}})
              }
            },
            {title: '操作', 
            width: 400,
            align: 'center',
            render: (h, p)=>{
              let {row} = p
              return h('div',{'class': 'operate'}, [
                h('Button', 
                {props: {type: 'info'},
                on: {
                  click: ()=>{
                    this.modalStatus.authChange = true
                    this.listCurrentAuth(row)
                  }
                }}, 
                '修改权限'),
                h('Button', 
                {props: {type: 'success'}}, 
                '快速设置'),
                h('Button', 
                {props: {type: 'warning'}}, 
                '重置密码'),
                h('Button', 
                {props: {type: 'error'},
                on: {click: ()=>{
                  this.removeMember(row.userId)
                }}}, 
                '删除用户')
              ])
            }},
          ],
          config: {
            url: '/zues/api/userrole/list'
          }
        },
        newMember: {
          registerId: '',
          comId: '',
          password: ''
        },
        memberModal: false,
        authNameList: [
          {key: 'queryAuth', value: '查询'},
          {key: 'orderAuth', value: '采购'},
          {key: 'supplierAuth', value: '供应商设置'},
          {key: 'valueAuth', value: '价格表'},
          {key: 'inventoryAuth', value: '库存表'},
          {key: 'demandAuth', value: '定制需求'},
          {key: 'adminAuth', value: '管理员'}
        ],
        modalStatus: {
          authChange: false,
          authQuick: false,
          passwdReset: false
        },
        currentAuth: [],
        paramsWillBeUpload: {
          operator: 0,
          queryAuth: 0,
          orderAuth: 0,
          supplierAuth: 0,
          valueAuth: 0,
          inventoryAuth: 0,
          demandAuth: 0,
          adminAuth: 0
        }
      }
    },
    methods: {
      searchMember () {
        this.$refs.member.search()
      },
      clearNewMember () {
        this.memberModal = false
        this.newMember.registerId = ''
        this.newMember.password = ''
        this.newMember.comId = ''
        console.log(this.newMember)
      },
      newMemberSubmit () {
        axios.post("/zues/api/user/register", this.newMember).then(res=>{
          if(res.status === 200){
            let {data} = res
            if(data.code === 200){
              this.$Message.info(data.msg)
              this.clearNewMember()
            }else{
              this.$Message.info(data.msg||data.message)
            }
          }
        })
      },
      removeMember (userId) {
        this.$Modal.confirm({
          title: '警告',
          content: `确认删除用户：${userId}`,
          onOk: ()=>{
            axios.post('/zues/api/user/delete', {operator: userId})
            .then(res=>{
              // console.log(res)
              if(res.status === 200){
                let {data} = res
                if(data.code === 200){
                  this.$Message.success(data.msg)
                  this.$refs.member.search()
                }else{
                  this.$Message.error(data.msg)
                }
              }
            })
          }
        })
      },
      listCurrentAuth (row){
        this.currentAuth = [] // 清除当前权限
        this.paramsWillBeUpload.operator = row.userId
        for(var auth in row){
          if(row[auth] === 1){
            this.currentAuth.push(auth)
          }
        }
      },
      cleanUploadParams () {
        for(let item in this.paramsWillBeUpload){
          this.paramsWillBeUpload[item] = 0
        }
      },
      uploadAuths () {
        for(let auth of this.currentAuth){
          this.paramsWillBeUpload[auth] = 1
        }
        axios.post('/zues/api/userrole/update', this.paramsWillBeUpload)
        .then(res=>{
          if(res.status === 200){
                let {data} = res
                if(data.code === 200){
                  this.$Message.success(data.msg)
                  this.$refs.member.search()
                  this.cleanUploadParams()
                }else{
                  this.$Message.error(data.msg)
                }
              }
        })
      }
    }
  }
</script>
<style>
  #app .member-container{
    text-align: left;
  }
  .member-container .operate button{
    margin: 0px 5px;
  }
  .member-modal {
    width: 90%;
    margin: 0 auto;
  }
  .member-modal .info-item{
    margin:  10px;
  }
  .member-modal .info-item>span{
    display: inline-block;
    width: 13%;
    font-size: 13px;
  }
</style>
