import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
/* APIs */
import ContactTrackerConfigApi from './api/ContactTrackerConfigAPI.js'
import ContactTrackerStatisticsAPI from './api/ContactTrackerStatisticsAPI'

Vue.config.productionTip = false

// Guardar en la instancia de Vue las instancias de las APIs.
Vue.prototype.$configapi = new ContactTrackerConfigApi() // API de configuración.
Vue.prototype.$statisticsapi = new ContactTrackerStatisticsAPI() // API de estadísticas.

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
