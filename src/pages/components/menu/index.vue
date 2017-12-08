<template>
    <div class="zeus-menu">
        <div class="zeus-logo">
            Zues 2.0
        </div>
        <Menu width="150" :accordion="true">
            <Submenu name="1">
                <template slot="title">
                    <Icon type="aperture"></Icon>
                    需求管理
                </template>
                <MenuItem name="1-1">带货/需求</MenuItem>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="arrow-graph-down-left"></Icon>
                    宙斯报价
                </template>
                <MenuItem name="2-1">
                    现货查询
                </MenuItem>
                <MenuItem name="2-2">购物车</MenuItem>
                <MenuItem name="2-3">订单列表</MenuItem>
                <MenuItem name="2-4">需求报价</MenuItem>
            </Submenu>
            <Submenu name="3">
                <template slot="title">
                    <Icon type="ios-cog"></Icon>
                    供应商录入
                </template>
                <MenuItem name="3-1">供应商</MenuItem>
                <MenuItem name="3-2">价格表</MenuItem>
                <MenuItem name="3-3">库存表</MenuItem>
            </Submenu>
            <Submenu name="4">
                <template slot="title">
                    <Icon type="cube"></Icon>
                    管理员后台
                </template>
                <MenuItem name="4-1">下单审核</MenuItem>
                <MenuItem name="4-2">成员列表</MenuItem>
                <MenuItem name="4-3">操作记录</MenuItem>
                <MenuItem name="4-4">消息管理</MenuItem>
            </Submenu>
        </Menu>
    </div>
</template>
<style>
    .zeus-logo{
        height: 50px;
        width: 100%;
        line-height: 50px;
        font-size: 20px;
        color: #fff;
        background:-webkit-gradient(linear, 0 0, right 0, from(#1bd7a5), to(#37c5d9));
    }
</style>
<script>
    export default {
        data () {
            return {

            }
        },
        name: 'ZMenu',
    }
</script>