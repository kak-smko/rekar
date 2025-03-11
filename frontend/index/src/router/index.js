import { createRouter, createWebHistory } from 'vue-router'

import { auth, profile_complete } from '@/router/guards.js'
import IndexLayout from '../layouts/home.vue'
import UserLayout from '../layouts/user.vue'
const base = () => import('../views/home.vue')
const notFound = () => import('../views/notFound.vue')

const dashboard = () => import('../views/user/index.vue')


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
 /* {{place new Route}} */
    {
      path: '/',
      component: IndexLayout,
      children: [
        { path: '', name: 'base', component: base },
        {
          path: '/user',
          component: UserLayout,
          beforeEnter: (to, from, next) => {
            auth(to, from, next)
          },
          children: [
            {
              path: '', name: 'dashboard', component: dashboard, beforeEnter: (to, from, next) => {
                profile_complete(to, from, next)
              }
            },
          ]
        },
        { path: '/:pathMatch(.*)*', name: 'not_found', component: notFound }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        setTimeout(() => {
          resolve({ left: 0, top: savedPosition['top'] })
        }, 500)
      } else {
        resolve({ left: 0, top: 0 })
      }
    })
  }
})

export default router
