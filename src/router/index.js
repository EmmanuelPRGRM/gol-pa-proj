import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'LandingPage',
    component: () => import('@/views/LandingPage.vue')
  },
  {
    path: '/login-animation',
    name: 'LoginAnimation',
    component: () => import(/* webpackChunkName: "Lobby" */ '../views/LoginAnimation')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Lobby" */ '../views/Login')
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: () => import(/* webpackChunkName: "Lobby" */ '../views/Lobby')
  }
]

const router = new VueRouter({
  routes
})

export default router
