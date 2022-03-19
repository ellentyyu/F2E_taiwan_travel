import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/spots',
    name: 'spots',
    component: () => import(/* webpackChunkName: "about" */ '../views/Spots.vue')
  },
  {
    path: '/spot/:spotId',
    component: () => import('../views/SpotItem.vue')
  },
  {
    path: '/restaurants',
    component: () => import('../views/Restaurants.vue')
  },
  {
    path: '/hotels',
    component: () => import('../views/Hotels.vue')
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   route level code-splitting
  //   this generates a separate chunk (about.[hash].js) for this route
  //   which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior (to, from, savedPosition) {
   // always scroll to top
    return { top: 0 }
  }
})

export default router
