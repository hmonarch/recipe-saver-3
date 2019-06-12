import Vue from 'vue'
import Router from 'vue-router'

// Components
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('./components/Account.vue')
    },
    { 
      path: '/recipes',
      redirect: '/recipes/all'
    },
    {
      path: '/recipes/:view',
      name: 'Recipes',
      component: () => import('./components/Recipes.vue')
    },
    {
      path: '/recipes/tag/:tagName',
      name: 'Tag',
      component: () => import('./components/Recipes.vue')
    },
    {
      path: '/login',
      name: 'LoginRegister',
      component: () => import('./components/LoginRegister.vue')
    },
    {
      path: '/share/:recipe',
      name: 'Share',
      component: () => import('./components/Share.vue')
    }
  ]
})
