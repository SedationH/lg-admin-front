import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'
import Layout from '@/layout/index.vue'

import store from '@/store'

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
    component: Layout,
    meta: { isAuthenticated: true },
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
        path: '/menu/add',
        name: 'menuAdd',
        component: () =>
          import(
            /* webpackChunkName: 'menuAddOrEdit' */ '@/views/menu/add.vue'
          )
      },
      {
        path: '/menu/edit',
        name: 'menuEdit',
        component: () =>
          import(
            /* webpackChunkName: 'menuAddOrEdit' */ '@/views/menu/edit.vue'
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

router.beforeEach((to, from, next) => {
  if (
    !to.matched.some(value => value.meta.isAuthenticated)
  ) {
    next()
  } else {
    if (store.getters['user/userLoginInfo']) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})

export default router
