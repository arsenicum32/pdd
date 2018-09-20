// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'


Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    id: 4,
    count: 0,
    rest: axios.create({
      baseURL: 'https://api.lilamp.com/',
      timeout: 5000,
      //headers: {'X-Custom-Header': 'foobar'}
    }),
    ans: [],
    scope: 0,
    connection: true
  },
  mutations: {
    increment (state) {
      state.count++
    },
    networkErr (state){
      state.connection = false;
    },
    result (state, args){
      console.log(args);
      state.ans = [...args.answ];
      state.scope = args.scope;
    },
    changeId(state, id){
      console.log(id);
      state.id = id;
    }
  },
  actions: {
    networkErr ({ commit }) {
      commit('networkErr')
    },
    result ({commit}, args) {
      commit('result', args);
    },
    changeId({commit} , id){
      commit('changeId', id);
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store ,
  components: { App },
  template: '<App/>'
})
