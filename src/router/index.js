import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import LoginAnimation from "../views/LoginAnimation.vue";
import Login from "../views/Login.vue";
import Lobby from '../views/Lobby.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/login-animation",
    name: "LoginAnimation",
    component: LoginAnimation,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {

    path: "/lobby",
    name: "Lobby",
    component: Lobby,
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});


// route guard
import store from '@/store'
router.beforeEach((to, from, next) => {
  const auth_token = store.getters['authentication/token'];
  
  // if ( to.name !== 'LandingPage' && !auth_token ) {
  //   store.dispatch('authentication/logout', {})
  //   next({ name: 'LandingPage' });
  // }
  if ( to.name === 'Login' && auth_token ) {
    // next({ name: 'Lobby' });
  } else if (to.name === 'LoginAnimation' && auth_token) {
    next({ name: 'Lobby' });
  }
  else {
    next();
  }
})
export default router;
