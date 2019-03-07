import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '../views/StartPage'
import LoginScreen from '../views/User/Authentication/Login'
import RegistrationScreen from '../views/User/Authentication/Registration'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: StartPage
    },

    {
      path: '/Login',
      name: 'Login',
      component: LoginScreen
    },

    {
      path: '/Registration',
      name: 'Registration',
      component: RegistrationScreen
    },


  ]
})
