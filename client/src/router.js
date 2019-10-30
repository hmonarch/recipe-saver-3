import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./components/Home.vue')
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
    },
    {
      path: '/plans',
      name: 'Plans',
      component: () => import('./components/Plans.vue')
    },
    {
      path: '/password-recovery',
      name: 'PasswordRecovery',
      component: () => import('./components/PasswordRecovery.vue')
    }
  ]
})
