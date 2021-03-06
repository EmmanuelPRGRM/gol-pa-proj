/* eslint-disable vue/experimental-script-setup-vars */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.config.productionTip = false
const frontversion = 'v3.5'
if (localStorage.getItem('version') !== frontversion) {
  localStorage.clear()
  localStorage.setItem('version', frontversion)
}

// base url
const baseDomain = 'https://event.fourello.com'
const eventSlug = 'colpal'
const version = 'v2'
const baseURL = `${baseDomain}/api/${version}/${eventSlug}`

// ALL DEFAULT CONFIGURATION HERE
Vue.prototype.$http = axios.create({ baseURL })
// gets the settings from the server
store.dispatch('settings/fetchSettings', eventSlug)

Vue.config.productionTip = false
Vue.use(vueMeta)

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
