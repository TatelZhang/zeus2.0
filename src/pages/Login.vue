<template>
    <div class="zeus-login">
        <div class="zeus-login-dialog clearfix">
            <div class="zeus-logo-contain">
                <img src="../assets/images/logo3.png">
            </div>
            <div class="zeus-login-form">
                <div class="zeus-login-system">
                    <div class="name">奎鑫采销系统</div>
                    <div class="version">Zeus 2.0</div>
                </div>
                <Form :model="loginParams" class="form">
                    <FormItem>
                        <Input class="form-item" v-model="loginParams.userId" placeholder="用户名" style="width: 320px" size="large"></Input>
                    </FormItem>
                    <FormItem>
                        <Input class="form-item" v-model="loginParams.password" placeholder="密码" style="width: 320px" size="large"></Input>
                    </FormItem>
                    <FormItem>
                        <Select class="form-item" v-model="loginParams.comId" style="width:320px; text-align:left" clearable placeholder="选择公司" size="large">
                            <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button style="width: 320px" class="form-item" type="primary" long size="large" @click="login">登录</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
    import grain from './grain.js'
    export default {
        data () {
            return {
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
                loginParams: {
                    userId: '',
                    comId: '',
                    password: ''
                }
            }
        },
        mounted() {
            // grain();
        },
        methods: {
            login() {
                axios.post('/zues/api/user/login',this.loginParams)
                    .then( rs=> {
                        if(rs.data.code === 200){
                            this.$router.replace({path: '/product'});
                        }else{
                            this.$Message.info(rs.data.msg);
                        }
                    })
            }
        }
    }
</script>
<style lang="less" scoped>
    .zeus-login{
        height: 100%;
        width: 100%;
        background-image: url("../assets/images/bg2.png");
        background-size: cover;
        position: relative;
        .zeus-login-dialog{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%,-50%,0);
            z-index:3;
            width: 1070px;
            height: 610px;
            .zeus-logo-contain{
                float: left;
                height: 100%;
                width: 60%;
                background:-webkit-gradient(linear, 0 0, right bottom, from(rgba(27,225,172,0.8)), to(rgba(39,226,241,0.8)));
                img{
                    width: 80%;
                    margin-top: 30%;
                }
            }
            .zeus-login-form{
                float: left;
                height: 100%;
                width: 40%;
                background-color: #f7f7f7;
                position: relative;
                .zeus-login-system{
                    position: absolute;
                    top: 20%;
                    width: 100%;
                    .name{
                        color: #9ba1d5;
                        font-weight: bold;
                        font-size: 24px;
                    }
                    .version{
                        color: #c8c8c8;
                        font-size: 20px;
                        font-weight: normal;
                    }
                }
                .form{
                    margin-top: 300px;
                    padding: 30px 40px;
                    .form-item + .form-item{
                        margin-top: 10px;
                    }
                }
            }
        }
    }
</style>