import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import LandingPage from '@/components/LandingPage'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Coin from '@/components/Coin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/auth/register',
      name: 'register',
      component: Register
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/coin/:name',
      name: 'coin',
      component: Coin
    }
  ]
})
