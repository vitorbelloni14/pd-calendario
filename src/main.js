import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import moment from 'moment-timezone'

Vue.config.productionTip = false

moment.tz.setDefault('America/Sao_Paulo');

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
