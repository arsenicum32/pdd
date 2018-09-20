import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Quizz from '@/components/Quizz'
import Form from '@/components/Form'
import End from '@/components/End'
import Rules from '@/components/Rules'

// sys route
import Auth from '@/components/auth'
import Dev from '@/components/dev'
import Admin from '@/components/admin'
import Constructor from '@/components/constructor'
import Contacts from '@/components/contacts'
import NF from '@/components/404'
import Test from '@/components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/quizz',
      name: 'Quizz',
      component: Quizz
    },
    {
      path: '/form',
      name: 'Form',
      component: Form
    },
    {
      path: '/end',
      name: 'End',
      component: End
    },
    {
      path: '/rules',
      name: 'Rules',
      component: Rules
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/dev',
      name: 'dev',
      component: Dev
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/constructor',
      name: 'Constructor',
      component: Constructor
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts
    },
    {
      path: '/404',
      name: '404',
      component: NF
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
  ]
})
