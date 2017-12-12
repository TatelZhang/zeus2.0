<template>
    <div class="zeus-select">
        <input
            ref="input"
            type="hidden"
            :value="currentValue">
        <Select 
            v-model="bindValue"
            :size="size"
            :disabled="disabled"
            :placeholder="placeholder"
            :align="align"
            :clearable="clearable"
            :class="alignCls">
            <Option v-for="item in list" :key="item.key" :value="item.value"></Option>
        </Select>
    </div>
</template>
<script>
    import Emitter from '../../mixin/emitter';
    const prefixCls = 'zeus-select';
    export default {
        name: 'ZSelect',
        mixins: [ Emitter ],
        props: {
            value: [String, Number],
            size: String,
            disabled: Boolean,
            placeholder: String,
            align: {
                type: String,
                default: 'left'
            },
            clearable: {
                type: Boolean,
                default: true
            }, //单选是否可清空
            data: [Array, String], //data接收数组类型和加载数据的地址
            keyValue: String, //指定key-value,如果不指定默认使用key,value关键字,形如'key-value'
        },
        data () {
            return {
                list: [],
                currentValue: this.value,
                prefixCls: prefixCls,
                bindValue: this.value
            };
        },
        computed: {
            alignCls () {
                return `${prefixCls}-align-${this.align}`;
            }
        },
        created () {
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
                console.log(data);
                this.list = data;
            },
            setCurrentValue (value) {
                if (value === this.currentValue) return;
                this.$emit('input', value);
                this.currentValue = value;
            },
        },
        watch: {
            value (val) {
                this.setCurrentValue(val);
            },
            bindValue (val) {
                this.setCurrentValue(val);
            }
        },
    };
</script>
    