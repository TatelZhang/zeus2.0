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
  </div>

</template>
<script>
  export default {
    data () {
      return {
        count: this.$store.getters.count
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
      }
    },
    computed: {
      computedCount () {
        // return this.$store.state.count
        // this.count = this.$store.getters.count
        return this.$store.getters.count
      }
    },
    mounted () {
      // console.log(this.$store)
    }
  }
</script>