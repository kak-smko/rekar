import {createRouter, createWebHistory} from "vue-router";
import {auth, profile_complete} from "./guards";

import IndexLayout from "../layouts/home";
import UserLayout from "../layouts/user";

const law = () => import("../views/index/user/law");
const base = () => import("../views/index/home");
const notFound = () => import("../views/index/notFound");

/* user panel*/
const dashboard = () => import("../views/index/user/index");

/* {{place new import}} */

const routes = [
  {
    path: "/user",
    component: UserLayout,
    beforeEnter: (to, from, next) => {
      auth(to, from, next);
    },
    children: [
      {
        path: "", name: "dashboard", component: dashboard, beforeEnter: (to, from, next) => {
          profile_complete(to, from, next);
        }
      },
      /* {{place new Route user}} */
    ],
  },
  {
    path: "/",
    component: IndexLayout,
    children: [
      {path: "", name: "base", component: base},
      {
        path: "/home/laws",
        name: "laws",
        component: law,
      },
      /* {{place new Route home}} */
      {path: "/:pathMatch(.*)*", name: "not_found", component: notFound},
    ],
  },
];
const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === "production"
      ? process.env.API_production_URL
      : process.env.API_URL
  ),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      if (savedPosition) {
        setTimeout(() => {
          resolve({left: 0, top: savedPosition["top"]});
        }, 500);
      } else {
        resolve({left: 0, top: 0});
      }
    });
  },
});

export default router;
