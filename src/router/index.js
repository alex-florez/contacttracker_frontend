import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Statistics from '../views/Statistics.vue'
import Positives from '../views/Positives.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/config',
    name: 'Configuration',
    component: () => import(/* webpackChunkName: "about" */ '../views/Configuration.vue')
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  },
  {
    path: '/positives',
    name: 'Positives',
    component: Positives
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
