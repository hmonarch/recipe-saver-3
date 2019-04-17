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
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
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
  ]
})
