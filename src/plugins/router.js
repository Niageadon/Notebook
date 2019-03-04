import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '../views/StartPage'
import LoginScreen from '../views/User/Authentication/Auth'

Vue.use(Router)

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


  ]
})
