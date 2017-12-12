<template>
    <ZTable :column="table.column" :config="table.config" ref="ztable"/>
</template>
<script>
    export default {
        data () {
            return {
                table: {
                    column: [
                        {
                            type: 'selection',
                            width: 60,
                            align: 'center'
                        },
                        {
                            title: '规格',
                            key: 'spec'
                        }, {
                            title: '长度',
                            key: 'long',
                        }, {
                            title: '类别',
                            key: 'type'
                        }, {
                            title: '供应商',
                            key: 'supplierName'
                        }, {
                            title: '数量',
                            key: 'amount'
                        }, {
                            title: '包装',
                            key: 'perAmount'
                        }, {
                            title: '吨位',
                            key: 'weight'
                        }, {
                            title: '开单价',
                            key: 'value'
                        }, {
                            title: '到岸价',
                            key: 'daPrice'
                        }, {
                            title: '采购议价',
                            key: 'adjust'
                        }, {
                            title: '议价总额',
                            key: 'totalAdjust'
                        }, {
                            title: '金额',
                            key: 'totalPrice'
                        }, {
                            title: '用户Id',
                            key: 'userId'
                        }, {
                            title: '备注',
                            key: 'comment'
                        }, {
                            title: '操作',
                            render(h, params) {

                            }
                        }
                    ],
                    config: {
                        url: '/zues/api/chart/list',
                        pageSize: 100,
                    }
                },
            }
        }
    }
</script>