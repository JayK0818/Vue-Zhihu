import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '知乎专栏 - 随心写作,自由表达'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName:'login' */ '@/views/login/index.vue'),
    meta: {
      title: '用户登录'
    }
  },
  {
    path: '/column/:id',
    name: 'ColumnPage',
    component: () => import(/* webpackChunkName: 'column-page' */ '@/views/column-page/index.vue')
  },
  {
    path: '/create',
    name: 'CreateColumn',
    component: () => import(/* webpackChunkName: 'create-column' */ '@/views/create-column/index.vue'),
    meta: {
      title: '写文章 - 知乎'
    }
  },
  {
    path: '/lottery',
    name: '体彩',
    component: () => import(/* webpackChunkName: 'lottery' */ '@/components/lottery/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  if (typeof title === 'string') {
    document.title = title
  }
  next()
})

export default router
