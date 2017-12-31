<template>
  <div>
    dataCount{{count}}
    <br> 
    storeCount:{{$store.state.count}}
    <br>
    computedCount: {{computedCount}}
    <br>
    <Button type="error" @click="emitMutation">mutation</Button>
    <Button type="error" @click="emitAction">action</Button>
    <input type="text" :value="testValue" @input="testValue=$event.target.value">
    {{testValue}}
    <br>
    <button @click="testRocord">点击</button>
    <Record ref="record"/>
  </div>

</template>
<script>
  import Record from './manager/Record'
  export default {
    components: {
      Record
    },
    data () {
      return {
        count: this.$store.getters.count,
        testValue: 'test',
        modelValue: 'model'
      }
    },
    watch: {
      count (val,old){
        console.log(val, old)
      }
    },
    methods: {
      emitMutation () {
        this.$store.commit('increaseCount')
      },
      emitAction () {
        this.$store.dispatch('someAction')
      },
      testInput (e) {
        console.log(e)
      },
      testRocord () {
        // console.log(this.$refs)
        this.$refs.record.changeCreateTime('2017-12-31')
        this.$refs.record.searchRecord()
      }
    },
    computed: {
      computedCount () {
        // return this.$store.state.count
        // this.count = this.$store.getters.count
        return this.$store.getters.count
      }
    },
  }
</script>