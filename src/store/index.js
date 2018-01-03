import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        comId: null
    },
    mutations: {
        submitComId (state, id) {
            state.comId = id 
        },
    },
    actions: {
        // someAction ({commit, state}) {
        //     setTimeout(() => {
        //         commit('increaseCount')
        //     }, 1000);
        //     // state.count++
        // },
    },
    getters: {
       comId ({comId}) {
           return comId
       }
    }
})