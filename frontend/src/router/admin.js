import { createRouter, createWebHistory } from "vue-router";
import { role } from "./guards";

import template from "../layouts/admin";

const notFound = () => import("../views/index/notFound");
const law = () => import("../views/index/user/law");

/* {{place new import}} */
const base = () => import("../views/admin/dashboard");

const routes = [
  {
    path: "/laws",
    name: "laws",
    component: law,
  },
  {
    path: "/admin",
    component: template,
    beforeEnter: (to, from, next) => {
      role(to, from, next);
    },
    children: [
      { path: "", name: "base", component: base },
      /* {{place new Route}} */
      { path: "/:pathMatch(.*)*", name: "not_found", component: notFound },
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
    if (savedPosition) {
      return savedPosition;
    }
    return { behavior: "smooth", left: 0, top: 0 };
  },
});
export default router;
