import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import Layout from '@/layout/index.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(
        /* webpackChunkName: 'login' */ '@/views/login/index.vue'
      )
  },
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () =>
          import(
            /* webpackChunkName: 'home' */ '@/views/home/index.vue'
          )
      },
      {
        path: '/advert',
        name: 'advert',
        component: () =>
          import(
            /* webpackChunkName: 'advert' */ '@/views/advert/index.vue'
          )
      },
      {
        path: '/advet-space',
        name: 'advet-space',
        component: () =>
          import(
            /* webpackChunkName: 'advet-space' */ '@/views/advert-space/index.vue'
          )
      },

      {
        path: '/course',
        name: 'course',
        component: () =>
          import(
            /* webpackChunkName: 'course' */ '@/views/course/index.vue'
          )
      },
      {
        path: '/menu',
        name: 'menu',
        component: () =>
          import(
            /* webpackChunkName: 'menu' */ '@/views/menu/index.vue'
          )
      },
      {
        path: '/resource',
        name: 'resource',
        component: () =>
          import(
            /* webpackChunkName: 'resource' */ '@/views/resource/index.vue'
          )
      },
      {
        path: '/role',
        name: 'role',
        component: () =>
          import(
            /* webpackChunkName: 'role' */ '@/views/role/index.vue'
          )
      },
      {
        path: '/user',
        name: 'user',
        component: () =>
          import(
            /* webpackChunkName: 'user' */ '@/views/user/index.vue'
          )
      },
      {
        path: '*',
        name: '404',
        component: () =>
          import(
            /* webpackChunkName: '404' */ '@/views/error-page/404.vue'
          )
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
