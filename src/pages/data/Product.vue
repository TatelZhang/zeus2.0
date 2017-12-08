<template>
    <div>
        <div class="zeus-search">
            <Form :model="form">
                <Row :gutter="30">
                    <Col span="4">
                        <FormItem prop="spec">
                            <Input v-model="form.spec" size="large" placeholder="规格"></Input>
                        </FormItem>
                    </Col>
                    <Col span="4">
                        <FormItem prop="type">
                            <Input v-model="form.type" size="large" placeholder="类别"></Input>
                        </FormItem>
                    </Col>
                    <Col span="5">
                        <FormItem prop="type">
                            <Input v-model="form.type" size="large" placeholder="供应商地址"></Input>
                        </FormItem>
                    </Col>
                    <Col span="5">
                        <FormItem prop="destination">
                            <Input v-model="form.destination" size="large" placeholder="到岸目的地"></Input>
                        </FormItem>
                    </Col>
                    <Col span="2">
                        <FormItem prop="spec">
                            <Button long size="large" icon="ios-search" type="primary">查询</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
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
                            key: 'purePrice',
                            sortable: true
                        }, {
                            title: '到岸价',
                            key: 'value',
                            sortable: true
                        }, {
                            title: '库存',
                            key: 'inventoryAmount',
                            sortable: true
                        }, {
                            title: '包装',
                            key: 'perAmount'
                        }, {
                            title: '支重',
                            render (h, {row}) {//计算单支重量
                                var specArr = row.spec.split("*");
                                var height = Number(specArr[0]);
                                var width = Number(specArr[1]);
                                var land = Number(specArr[2]);
                                var long = Number(row.long);
                                var perimeter = height * 2 + width * 2;
                                return ((perimeter / 3.14 - land) * land * long * 0.02466).toFixed(2) + 'kg';
                            }
                        }, {
                            title: '总重',
                            render (h, {row}) {//计算总吨位
                                var specArr = row.spec.split("*");
                                var height = Number(specArr[0]);
                                var width = Number(specArr[1]);
                                var land = Number(specArr[2]);
                                var long = Number(row.long);
                                var perimeter = height * 2 + width * 2;
                                var amount = Number(row.perAmount);
                                var inventory = Number(row.inventoryAmount);
                                return ((perimeter / 3.14 - land) * land * long * 0.02466 * amount * inventory / 1000).toFixed(2) + '吨';
                            }
                        }, {
                            title: '运费',
                            key: 'freight',
                            sortable: true
                        }, {
                            title: '出厂价',
                            key: 'value',
                            sortable: true
                        }, {
                            title: '厂家优惠',
                            key: 'benifit',
                            sortable: true
                        }, {
                            title: '操作',
                            fixed: 'right',
                            render (h, params) {
                                return h('div',
                                [
                                    h('Button',{
                                        props: {
                                            type: 'primary',
                                            disabled: !params.row.value || params.row.value == 0
                                        },
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
                },
                form: {
                    spec: '',//规格
                    address: '',//地址
                    type: '',//类型
                }
            }
        },
        components: {
            ZTable
        }
    }
</script>