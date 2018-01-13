<template>
    <div class="zeus-page">
        <!-- 左侧菜单导航 -->
        <div class="zeus-menu-layout">
            <ZMenu/>
        </div>
        <!-- 顶部菜单导航 -->
        <div class="zeus-header-layout">
            <ZHeader/>
        </div>
        <div class="zeus-content-layout">
            <router-view/>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        mounted() {
            $("canvas").remove();//删除canvas以免影响页面性能
        }
    }
</script>
<style lang="less">
    @import "../assets/base.less";
    .zeus-page{
        overflow: auto;
        .zeus-header-layout{
            position: fixed;
            top: 0px;
            left: 150px;
            right: 0px;
            z-index: 100;
        }
        .zeus-menu-layout{
            position: fixed;
            left: 0px;
            width: 150px;
            bottom: 0px;
            top: 0px;
            background:-webkit-gradient(linear, 0 0, right bottom, from(#1ed3a6), to(#42c7e6));
            overflow: hidden;
        }
        .zeus-content-layout{
            margin-left: 160px;
            margin-top: 60px;
            margin-bottom: 10px;
            margin-right: 10px;
            overflow: hidden;
            border-radius: 5px;
            padding: 20px 10px;
            background-color: #fff;
            box-shadow: 1px 1px 10px #ccc;
            min-height: 600px;
            min-width: 1400px;
            text-align: left;
        }
    }
</style>