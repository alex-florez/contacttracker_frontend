import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

/* APIs */
import ContactTrackerConfigApi from './api/ContactTrackerConfigAPI.js'
import ContactTrackerStatisticsAPI from './api/ContactTrackerStatisticsAPI'

/* API de Google maps */
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

// Guardar en la instancia de Vue las instancias de las APIs.
Vue.prototype.$configapi = new ContactTrackerConfigApi() // API de configuración.
Vue.prototype.$statisticsapi = new ContactTrackerStatisticsAPI() // API de estadísticas.

// Integrar el módulo de Google Maps con la instancia Vue
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAPS_API_KEY
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
