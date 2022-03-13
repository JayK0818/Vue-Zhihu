import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName:'login' */ '@/views/login/index.vue')
  },
  {
    path: '/column/:id',
    name: 'ColumnPage',
    component: () => import(/* webpackChunkName: 'column-page' */ '@/views/column-page/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
