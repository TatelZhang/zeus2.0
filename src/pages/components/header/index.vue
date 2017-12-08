<template>
    <div class="zeus-header">
        <Avatar icon="person" size="small" class="avatar"/>
        <span class="user-name">费仁杰</span>
        <span class="logout"><Icon type="power"/>退出登录</span>
    </div>
</template>
<style scoped lang="less">
    .zeus-header{
        height: 50px;
        line-height: 50px;
        background-color: #fff;
        width: 100%;
        border-bottom: 1px solid #e7e7e7;
        text-align: right;
        font-size: 14px;    
        .user-name{
            margin: 0 5px;
        }
        .logout{
            margin-right: 10px;
            cursor: pointer;
            &:hover{
                color: #42c7e6;
            }
            .ivu-icon{
                margin-right: 5px;
            }
            &::before{
                content: "|";
                margin: 0 10px;
            }
        }
    }
</style>
<script>
    export default {
        data () {
            return {

            }
        },
        name: "ZHeader"
    }
</script>