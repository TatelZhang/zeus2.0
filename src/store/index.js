import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: { // 测试用
        count: 0,
        name: 'hello'
    },
    mutations: {
        increaseCount (state) {
            state.count ++ 
        },
    },
    actions: {
        someAction ({commit, state}) {
            setTimeout(() => {
                commit('increaseCount')
            }, 1000);
            // state.count++
        },
    },
    getters: {
        count (state, getters) {
            // console.log(getters)
            return state.count
        },
        some () {
            return 250
        }
    }
})