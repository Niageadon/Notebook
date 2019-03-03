import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './plugins/store'
import router from './plugins/router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
