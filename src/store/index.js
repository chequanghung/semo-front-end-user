import Vue from 'vue'
import Vuex from 'vuex'

// modules
import home from './modules/home'
import user from './modules/user'
import product from './modules/product'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home: home,
    user: user,
    product: product
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
})
