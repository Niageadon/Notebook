import Vue from 'vue'
import Router from 'vue-router'
import Guard from './auth-guard'
import StartPage from '../../views/StartPage'
import LoginScreen from '../../views/User/Authentication/Login'
import RegistrationScreen from '../../views/User/Authentication/Registration'

Vue.use(Router);

export default new Router({
  mode: 'history', // убирает /#
  routes: [
    { path: '/', name: 'Home', component: StartPage},

    { path: '/Login', name: 'Login', component: LoginScreen,
      children: []
    },

    { path: '/Registration', name: 'Registration', component: RegistrationScreen},


  ]
})
