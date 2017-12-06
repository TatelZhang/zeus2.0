<template>
    <div class="login">
        <div class="login-dialog clearfix">
            <div class="logo-contain">
                <img src="../assets/images/logo2.png">
            </div>
            <div class="login-form">
                <div class="system">
                    <div class="name">奎鑫采销系统</div>
                    <div class="EN">Zeus 2.0</div>
                </div>
                <div class="form">
                    <Input class="form-item" v-model="loginParams.userId" placeholder="用户名" style="width: 320px" size="large"></Input>
                    <Input class="form-item" v-model="loginParams.password" placeholder="密码" style="width: 320px" size="large"></Input>
                    <Select class="form-item" v-model="loginParams.comId" style="width:320px; text-align:left" clearable placeholder="选择公司" size="large">
                        <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button style="width: 320px" class="form-item" type="primary" long size="large">登录</Button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                companyList: [
                    {
                        value: '00',
                        label: '奎鑫南京'
                    }
                ],
                loginParams: {
                    userId: '',
                    comId: '',
                    password: ''
                }
            }
        }
        
    }
</script>
<style lang="less" scoped>
    .login{
        height: 100%;
        width: 100%;
        background-image: url("../assets/images/bg.png");
        background-size: cover;
        .login-dialog{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate3d(-50%,-50%,0);
            z-index:3;
            width: 1070px;
            height: 610px;
            .logo-contain{
                float: left;
                height: 100%;
                width: 60%;
                background:-webkit-gradient(linear, 0 0, right bottom, from(rgba(213,225,244,0.9)), to(rgba(83, 97, 144, 0.9)));
                img{
                    width: 80%;
                    margin-top: 30%;
                }
            }
            .login-form{
                float: left;
                height: 100%;
                width: 40%;
                background-color: #f7f7f7;
                position: relative;
                .system{
                    position: absolute;
                    top: 20%;
                    width: 100%;
                    .name{
                        color: #9ba1d5;
                        font-weight: bold;
                        font-size: 24px;
                    }
                    .EN{
                        color: #dbdbdb;
                        font-size: 20px;
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