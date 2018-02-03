<template>
    <div class="zeus-table clearfix">
        <Table stripe border :columns="column" :data="data" :loading="loading" height="740" :row-class-name = "rowClassName"></Table>
        <Page class-name="zeus-pagenation" :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="handle"></Page>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                data: [],
                loading: false,
                page: {
                    pageSize: this.config.pageSize || 15,
                    total: 1,
                    current: 1
                }
            }
        },
        name: 'ZTable',
        props: {
            column: {
                type: Array,
                default () {
                    return []
                }
            },
            config: {
                type: Object,
                default () {
                    return {
                        url: '',
                    }
                }
            },
            rowClassName: Function,
            query: Object,
        },
        created() {
            this.load({pageSize: this.page.pageSize, page: 1});
        },
        methods: {
            load(param={}) {
                this.loading = true;
                var params = Object.assign({}, param, this.query);
                axios.get(this.config.url,{params})
                    .then(({data}) => {
                        this.data = data.data.row;
                        this.page.total = data.data.totalCount || 0;    // 当前数据为空指定total为0;
                        this.page.current = Number(data.data.page) || 1; // 当前数据为空, 指定page为1
                        if(this.data.length === 0 && this.page.current > 1){ // 如果当前页非首页且数据为空, 重新加载
                            this.load({page: this.page.current - 1})
                        }
                        this.loading = false;
                    })
            },
            handle(page){
                this.load({page: page, pageSize: this.page.pageSize});
            },
            search(){
                this.load({page: this.page.current});
            },
            solveData (index, key, val) {
                this.data[index][key] = val
            }
        }
    }
</script>
<style lang="less" scoped>
    .zeus-table{
        min-height: 600px;
        .zeus-pagenation{
            text-align: right;
            margin-top: 10px;
        }
    }
</style>