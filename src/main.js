// core vue.js and plugins
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// ui framework
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy)

// axios
import axios from 'axios'
import VueAxios from 'vue-axios'
 
// timezone
import moment from 'moment-timezone'
moment.tz.setDefault('America/Scoresbysund')

Vue.use(VueAxios, axios)
axios.defaults.baseURL = "https://project-zero-on-air.herokuapp.com/"
// axios.defaults.baseURL = "http://localhost:3003"

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
