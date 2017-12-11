<template>
    <div class="zeus-select">
        <input type="hidden" :value="currentValue">
        <Select 
            v-model="currentValue"
            :size="size"
            :disabled="disabled"
            :placeholder="placeholder"
            :align="align"
            :class="alignCls">
            <Option v-for="item in list" :key="item.key" :value="item.value"></Option>
        </Select>
    </div>
</template>
<style lang="less">
    .zeus-select-align-left{ text-align: left }
    .zeus-select-align-right{ text-align: center }
    .zeus-select-align-center{ text-align: center }
</style>
<script>
    const prefixCls = 'zeus-select';
    export default {
        data () {
            return {
                list: [],
                currentValue: this.value,
            }
        },
        props: {
            value: [String, Number],
            remote: String,
            size: String,
            disabled: Boolean,
            placeholder: String,
            align: {
                type: String,
                default: 'left'
            },
            data: [Array, String], //data接收数组类型和加载数据的地址
            keyValue: String, //指定key-value,如果不指定默认使用key,value关键字,形如'key-value'
        },
        computed: {
            alignCls () {
                return `${prefixCls}-align-${this.align}`;
            }
        },
        created () {
            console.log("value:" + this.value);
            console.log("value:" + this.model);
            this.load();
        },
        methods: {
            load () {
                if(typeof this.data === 'object'){
                    this.getData(this.data);
                }else{
                    axios.get(this.data,{})
                        .then(({data}) => {
                            this.getData(data.data);
                        })
                }
            },
            getData (data) {
                var keyValue = this.keyValue;
                if(keyValue) {
                    if(!/\w-\w/.test(keyValue)){
                        console.warn("不合法的keyValue值,[key-value]");
                        return false;
                    }
                    var key = keyValue.split('-')[0];
                    var value = keyValue.split('-')[1];
                    data = data.map(v => {
                        return {
                            key: v[key],
                            value: v[value]
                        }
                    })
                }
                this.list = data;
            }
        },
        watch: {
            currentValue (v) {
                this.currentValue = v;
                console.log(v);
            }
        }
    }
</script>