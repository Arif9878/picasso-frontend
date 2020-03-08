import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

import GoogleAuth from 'vue-google-authenticator'
Vue.use(GoogleAuth, { client_id: '724643044802-l66d3qf1vh6383n6q1on0558d6rqpv8b.apps.googleusercontent.com' })
Vue.googleAuth().load()

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App)
})
