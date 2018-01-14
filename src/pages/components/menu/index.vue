<template>
    <div class="zeus-menu">
        <div class="zeus-logo">
            Zues 2.0
        </div>
        <Menu width="150" :accordion="true" @on-select="select" :active-name="currMenu" :open-names="opened">
            <Submenu name="需求管理" v-if="menuList.demand.length > 0">
                <template slot="title">
                    <Icon type="aperture"></Icon>
                    需求管理
                </template>
                <MenuItem :name="item.link" v-for="item in menuList.demand" :key="item.link">
                    {{item.name}}
                </MenuItem>
            </Submenu>
            <Submenu name="宙斯报价" v-if="menuList.order.length > 0">
                <template slot="title">
                    <Icon type="arrow-graph-down-left"></Icon>
                    宙斯报价
                </template>
                <MenuItem :name="item.link" v-for="item in menuList.order" :key="item.link">
                    {{item.name}}
                </MenuItem>
            </Submenu>
            <Submenu name="供应商录入" v-if="menuList.data.length > 0">
                <template slot="title">
                    <Icon type="ios-cog"></Icon>
                    供应商录入
                </template>
                <MenuItem :name="item.link" v-for="item in menuList.data" :key="item.link">
                    {{item.name}}
                </MenuItem>
            </Submenu>
            <Submenu name="管理员后台" v-if="menuList.manager.length > 0">
                <template slot="title">
                    <Icon type="cube"></Icon>
                    管理员后台
                </template>
                <MenuItem :name="item.link" v-for="item in menuList.manager" :key="item.link">
                    {{item.name}}
                </MenuItem>
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
    import page from '../page.config';
    export default {
        data () {
            return {
                menuList: {
                    data: [],
                    order: [],
                    demand: [],
                    manager: []
                },
            }
        },
        name: 'ZMenu',
        created() {
            this.getMenu(0);
        },
        methods: {
            getMenu(index) {
                this.menuList = page[index];
            },
            select(key) {
                this.$router.push({path: key});
            }
        },
        computed: {
            currMenu () {
                return this.$route.path
            },
            opened () {
                let currPage = this.$route.meta.page
                return [currPage]
            }
        }
    }
</script>