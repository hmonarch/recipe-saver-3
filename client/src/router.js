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
      component: () => import('./components/Home.vue'),
      meta: { title: 'Recipe Saver — Online Recipe Organizer' }
    },
    {
      path: '/account',
      name: 'Account',
      component: () => import('./components/Account.vue'),
      meta: { title: 'Recipe Saver - Account' }
    },
    { 
      path: '/recipes',
      redirect: '/recipes/all',
      meta: { title: 'Recipe Saver - My Recipes' }
    },
    {
      path: '/recipes/:view',
      name: 'Recipes',
      component: () => import('./components/Recipes.vue'),
      meta: { title: 'Recipe Saver - My Recipes' }
    },
    {
      path: '/recipes/tag/:tagName',
      name: 'Tag',
      component: () => import('./components/Recipes.vue'),
      meta: { title: 'Recipe Saver - My Recipes' }
    },
    {
      path: '/login',
      name: 'LoginRegister',
      component: () => import('./components/LoginRegister.vue'),
      meta: { title: 'Recipe Saver - Login/Register' }
    },
    {
      path: '/share/:recipe',
      name: 'Share',
      component: () => import('./components/Share.vue'),
      meta: { title: 'Recipe Saver - Shared Recipe' }
    },
    {
      path: '/plans',
      name: 'Plans',
      component: () => import('./components/Plans.vue'),
      meta: { title: 'Recipe Saver - Plans' }
    },
    {
      path: '/password-recovery',
      name: 'PasswordRecovery',
      component: () => import('./components/PasswordRecovery.vue'),
      meta: { title: 'Recipe Saver - Password Recovery' }
    },
    {
      path: '/reset/:token',
      name: 'ResetForm',
      component: () => import('./components/ResetForm.vue'),
      meta: { title: 'Recipe Saver - Password Reset' }
    },
    {
      path: '/terms',
      name: 'Terms',
      component: () => import('./components/Terms.vue'),
      meta: { title: 'Recipe Saver - Terms & Conditions' }
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import('./components/Privacy.vue'),
      meta: { title: 'Recipe Saver - Privacy Policy' }
    },

  ]
})
