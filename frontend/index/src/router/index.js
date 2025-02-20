import { createRouter, createWebHistory } from 'vue-router'

import { auth, profile_complete } from '@/router/guards.js'
import IndexLayout from '../layouts/home.vue'
import UserLayout from '../layouts/user.vue'

const login = () => import('app/extension/renus/user/view/login.vue')
const userSetting = () => import('app/extension/renus/user/view/setting.vue')
const profile = () => import('app/extension/renus/user/view/profile.vue')
const law = () => import('../views/user/law.vue')
const base = () => import('../views/home.vue')
const notFound = () => import('../views/notFound.vue')

/* user panel*/
const dashboard = () => import('../views/user/index.vue')

/* {{place new import}} */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: IndexLayout,
      children: [
        { path: '', name: 'base', component: base },
        {
          path: '/home/laws',
          name: 'laws',
          component: law
        },
        /* {{place new Route home}} */
        { path: 'home/login/:token?', name: 'login', component: login },
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
            /* {{place new Route user}} */
            { path: 'user-settings', name: 'userSettings', component: userSetting },
            { path: 'profile', name: 'profile', component: profile }
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
