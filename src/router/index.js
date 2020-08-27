import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */'@/views/login/Login')
  },
  {
    path: '/auction/:id',
    name: 'Auction',
    props: true,
    component: () => import('@/views/auction/Auction')
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (Object.keys(store.state.user.user).length === 0) {
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
