import Vue from 'vue'
import Router from 'vue-router'
import StartPage from '../views/StartPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: StartPage
    },

  ]
})
