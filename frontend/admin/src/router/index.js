import { createRouter, createWebHistory } from 'vue-router'
import { role } from './guards'

import template from '../layouts/admin'

const notFound = () => import('../views/notFound')
const law = () => import('../views/law')

/* {{place new import}} */
const base = () => import('../views/dashboard')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/laws',
      name: 'laws',
      component: law
    },
    {
      path: '/admin',
      component: template,
      beforeEnter: (to, from, next) => {
        role(to, from, next)
      },
      children: [
        { path: '', name: 'base', component: base },
        /* {{place new Route}} */
        { path: '/:pathMatch(.*)*', name: 'not_found', component: notFound }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        return resolve(savedPosition)
      }
      resolve({ behavior: 'smooth',left: 0, top: 0 })
    })
  }
})

export default router
