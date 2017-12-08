<template>
    <div>
        <ZTable :column="table.column" :config="table.config"/>
    </div>
</template>
<style lang="less" scoped>
    
</style>
<script>
    import ZTable from '../components/table';
    export default {
        data () {
            return {
                table: {
                    column: [
                        {
                            title: '规格',
                            key: 'spec',
                        }, {
                            title: '长度',
                            key: 'long',
                        }, {
                            title: '更新时间',
                            key: 'lastUpdateTime',
                        }, {
                            title: '类别',
                            key: 'type',
                        }, {
                            title: '供应商',
                            key: 'supplierName',
                        }, {
                            title: '开单价',
                            key: 'purePrice'
                        }, {
                            title: '到岸价',
                            key: 'value'
                        }, {
                            title: '库存',
                            key: 'inventoryAmount'
                        }, {
                            title: '包装',
                            key: 'perAmount'
                        }, {
                            title: '支重',
                            key: 'perAmount'
                        }, {
                            title: '运费',
                            key: 'freight'
                        }, {
                            title: '出厂价',
                            key: 'value',
                        }, {
                            title: '厂家优惠',
                            key: 'benifit'
                        }, {
                            title: '操作',
                            render (h, params) {
                                return h('div',
                                [
                                    h('Button',{
                                        on: {
                                            click: () => {

                                            }
                                        }
                                    },'下单'),
                                    h('Button',{
                                        style: {
                                            'margin-left': '10px'
                                        },
                                        on: {
                                            click: () => {

                                            }
                                        }
                                    },'标记')
                                ]);
                            },
                            width: 200
                        }
                    ],
                    config: {
                        url: '/zues/api/product/list'
                    }
                }
            }
        },
        components: {
            ZTable
        }
    }
</script>