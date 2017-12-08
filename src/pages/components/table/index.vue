<template>
    <div class="zeus-table clearfix">
        <Table stripe border :columns="column" :data="data" :loading="loading" height="740"></Table>
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
                    pageSize: 15,
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
            }
        },
        created() {
            this.load();
        },
        methods: {
            load(params={}) {
                this.loading = true;
                axios.get(this.config.url,{params})
                    .then(({data}) => {
                        this.data = data.data.row;
                        this.page.total = Math.ceil(data.data.totalCount / this.page.pageSize);
                        this.loading = false;
                    })
            },
            handle(page){
                this.load({page: page,pageSize: this.page.pageSize});
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