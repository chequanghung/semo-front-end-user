import Vue from 'vue'
import Vuex from 'vuex'

// modules
import home from './modules/home'
import user from './modules/user'
import product from './modules/product'
import register from './modules/register'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home: home,
    user: user,
    product: product,
    register: register
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
})
