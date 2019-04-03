import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './storage'
import router from './plugins/router'
import VeeValidate from 'vee-validate';







Vue.config.productionTip = false;
Vue.use(VeeValidate);


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
