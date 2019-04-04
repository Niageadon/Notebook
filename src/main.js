import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './storage'
import router from './plugins/router'
import * as fireBase from 'firebase'


fireBase.initializeApp({
  apiKey: 'AIzaSyDxMmvwTIRr5m9au-3-_nAQnLGBtBKMwrY',
  authDomain: 'vue-note-84b36.firebaseapp.com',
  databaseURL: 'https://vue-note-84b36.firebaseapp.com',
  projectId: 'vue-note-84b36',
  storageBucket: 'vue-note-84b36.appsot.com',
  messagingSenderId: '184897689684'
})
export const db =fireBase.firestore()


Vue.config.productionTip = false;


new Vue({
  store,
  router,
  render: h => h(App),
  created(){

  }
}).$mount('#app')
