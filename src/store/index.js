import Vue from 'vue'
import Vuex from 'vuex'

// modules
import home from './modules/home'
import user from './modules/user'
import product from './modules/product'
import register from './modules/register'
import auction from './modules/auction'
import affair from './modules/affair'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home: home,
    user: user,
    product: product,
    register: register,
    auction: auction,
    affair: affair,
  },
  state: {
  },
  mutations: {
  },
  actions: {
  },
})
