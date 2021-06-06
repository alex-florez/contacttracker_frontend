import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import ContactTrackerConfigApi from './api/ContactTrackerConfigAPI.js'

Vue.config.productionTip = false

// Singleton de las API's
Vue.prototype.$configapi = new ContactTrackerConfigApi()

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
