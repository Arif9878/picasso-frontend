import Vue from 'vue'

import App from './App'
import store from './store'
import router from './router'

import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'

import './permission' // permission control

import GoogleAuth from 'vue-google-authenticator'
Vue.use(GoogleAuth, {
  client_id: process.env.VUE_APP_SECRET_CLIENT_GOOGLE,
})
Vue.googleAuth().load()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
