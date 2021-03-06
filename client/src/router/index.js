import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Profile from '@/components/user/Profile'
import CheckIn from '@/components/user/CheckIn'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Home
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/profile',
      name: 'profile',
      component: Profile
  }, {
      path: '/checkIn',
      name: 'checkIn',
      component: CheckIn
  }
  ]
})
