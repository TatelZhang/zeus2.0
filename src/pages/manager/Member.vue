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
          <Input style="display:inline-block; width:80%;" size="large" v-model="newMember.password" type="password"></Input>
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
    <Modal v-model="modalStatus.authQuick" @on-ok="uploadAuths">
      <h2 slot="header" style="color:#19be6b;text-align:center">
        <Icon type="settings"></Icon>
        <span>快速设置</span>
      </h2>
      <div>
        <div style="font-size: 14px;margin: 0 0 10px;font-weight: bold;">成员类型：</div>
        <Select v-model="currentType" size="large">
          <Option v-for="item in quickTypeSelctItems" :key="item.key" :value="item.key">{{item.value}}</Option>
        </Select>
        <div>
          <div style="font-size: 14px;margin: 10px 0;font-weight: bold;">描述：</div>
          {{currentDesciption}}
        </div>
      </div>
    </Modal>
    <Modal v-model="modalStatus.passwdReset" @on-cancel="resetParams.password = ''" @on-ok="restPasswd">
      <h2 slot="header" style="color:#f90;text-align:center">
        <Icon type="wrench"></Icon>
        <span>重置密码</span>
      </h2>
      <Input type="password" v-model="resetParams.password" placeholder="新的密码" size="large"></Input>
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
                {props: {type: 'success'},
                on: {
                  click: ()=>{
                    this.quickAuth(row)
                  }
                }}, 
                '快速设置'),
                h('Button', 
                {props: {type: 'warning'},
                on: {
                  click: ()=>{
                    this.resetParams.resetUser = row.userId
                    this.modalStatus.passwdReset = true
                  }
                }
                }, 
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
        // 当前成员权限
        currentAuth: [],
        // 用于上传的数据
        paramsWillBeUpload: {
          operator: 0,
          queryAuth: 0,
          orderAuth: 0,
          supplierAuth: 0,
          valueAuth: 0,
          inventoryAuth: 0,
          demandAuth: 0,
          adminAuth: 0
        },
        // 快速设置类型
        quickTypeSelctItems: [
          {key: 0, value: '自定义角色', desc: '自定义角色请使用权限分配功能'},
          {key: 1, value: '销售', desc: '销售拥有基础功能权限+定制化需求权限'},
          {key: 2, value: '采购', desc: '采购拥有除管理员以外的全部权限'},
          {key: 3, value: '管理员', desc: '超级管理员拥有系统全部权限'},
        ],
        allAuths:['queryAuth', 'orderAuth', 'supplierAuth', 'valueAuth', 'inventoryAuth', 'demandAuth', 'adminAuth'], 
        currentType: 0,
        authStr: {
          '0000000': 0,
          '0000010': 1,
          '1111100': 2,
          '1111111': 3
        },
        resetParams: {
          password: '',
          resetUser: ''
        }
      }
    },
    watch: {
      // 用于监控当前成员类型的改变, 并给予相应的权限
      currentType(val, old){
        for(let str in this.authStr){
          if(this.authStr[str] === val){
            for(let index in this.allAuths){
              this.paramsWillBeUpload[this.allAuths[index]] = Number(str[index])
            }
          }
        }
      }
    },
    computed: {
      currentDesciption () {
        for(let item of this.quickTypeSelctItems){
          if(item.key === this.currentType){
            return item.desc
          }
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
        // console.log(this.newMember)
      },
      // 新增member
      newMemberSubmit () {
        axios.post("/zues/api/user/register", this.newMember).then(res=>{
          if(res.status === 200){
            let {data} = res
            if(data.code === 200){
              this.$Message.info(data.msg)
              this.clearNewMember()
              this.$refs.member.search()
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
        this.currentAuth = [] // 清除当前权限数据
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
      // 更新成员权限
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
            }else{
              this.$Message.error(data.msg)
            }
          }
          this.cleanUploadParams()  // 清除需要上传的参数数据
        })
      },
      // 快速设置初始化参数, 首先获取当前成员, 弹出快速设置对话框, 设置当前类型
      quickAuth (row) {
        this.paramsWillBeUpload.operator = row.userId
        this.modalStatus.authQuick = true
        // let allAuths = ['queryAuth', 'orderAuth', 'supplierAuth', 'valueAuth', 'inventoryAuth', 'demandAuth', 'adminAuth']
        let code = ''
        for(let auth of this.allAuths){
          code += row[auth]
        }
        if(this.authStr[code]){
          this.currentType = this.authStr[code]
        }else{
          this.currentType = 0
        }
      },
      restPasswd () {
        axios.post('/zues/api/user/update', this.resetParams)
        .then(res=>{
          console.log(res)
          if(res.status === 200){
            let {data} = res
            if(data.code === 200){
              this.$Message.info(data.msg)
              this.resetParams.password = ''
            }else{
              this.$Message.info(data.msg||data.message)
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
  .member-container .member-modal .desc{
    font-size: 14px;margin: 0 0 10px;font-weight: bold;
  }
</style>
