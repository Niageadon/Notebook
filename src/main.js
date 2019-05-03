import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './storage/index'
import router from './plugins/router/router'
import * as fireBase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import VueQuillEditor from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

fireBase.initializeApp({
  apiKey: 'AIzaSyDxMmvwTIRr5m9au-3-_nAQnLGBtBKMwrY',
  authDomain: 'vue-note-84b36.firebaseapp.com',
  databaseURL: 'https://vue-note-84b36.firebaseapp.com',
  projectId: 'vue-note-84b36',
  storageBucket: 'vue-note-84b36.appsot.com',
  messagingSenderId: '184897689684'
});
export const db = fireBase.firestore()


Vue.config.productionTip = false;
Vue.use(VueQuillEditor);

new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    // auto login
    fireBase.auth().onAuthStateChanged(user =>{
      if (user){
        this.$store.dispatch('autoLogin', user); // загружает инфу о логине
        this.$store.dispatch('getRecordsFromServer'); // загружает данные с сервера при загрузке
      }
    })
  }
}).$mount('#app')
