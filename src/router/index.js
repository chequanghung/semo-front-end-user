import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/latest',
    name: 'Latest',
    component: () => import('@/views/Latest')
  },
  {
    path: '/fruit',
    component: () => import('@/views/Fruit')
  },
  {
    path: '/fruit/:id',
    props: true,
    name: 'FruitView',
    component: () => import('@/views/FruitView')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */'@/views/login/Login')
  },
  {
    path: '/reset',
    name: 'Reset',
    component: () => import('@/views/login/Reset')
  },
  {
    path: '/auction/:id',
    name: 'Auction',
    props: true,
    component: () => import('@/views/auction/Auction')
  },
  {
    path: '/user/id/:id',
    name: 'UserView',
    props: true,
    component: () => import('@/views/user/User')
  },
  {
    path: '/user/info',
    component: () => import('@/views/user/UserInfo'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/user/product',
    component: () => import('@/views/user/UserProduct'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/bid',
    component: () => import('@/views/user/UserBid'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/wallet',
    component: () => import('@/views/user/UserWallet'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/feedback',
    component: () => import('@/views/user/UserFeedback'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/views/product/Product'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login/Register'),
  },
  {
    path: '/affair/:id',
    name: 'Affair',
    component: () => import('@/views/affair/Affair'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/contract/:id',
    props: true,
    name: 'Contract',
    component: () => import('@/views/affair/Contract'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/search/:search',
    props: true,
    name: 'Search',
    component: () => import('@/views/Search')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0,0)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
