import Vue from 'vue'

import App from './App'
import store from './store'
import router from './router'

import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import moment from 'moment'
import 'moment/locale/id'

import { VueMaskDirective } from 'v-mask'

import './permission' // permission control
import VueMoment from 'vue-moment'
import GoogleAuth from 'vue-google-authenticator'
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'

moment.locale('id')

Vue.use(GoogleAuth, {
  client_id: process.env.VUE_APP_SECRET_CLIENT_GOOGLE,
})

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    environment: process.env.VUE_APP_ERROR_ENVIRONMENT,
    dsn: process.env.VUE_APP_SENTRY_DSN,
    release: process.env.VUE_APP_VERSION,
    integrations: [new VueIntegration({ Vue, attachProps: true })],
  })
}

Vue.googleAuth().load()
Vue.use(VueMoment, {
  moment,
})
Vue.directive('mask', VueMaskDirective)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')
