<template>
  <panel :menu="menu" account="admin"></panel>
</template>

<script>
import Panel from "./panel.vue";

export default {
  name: "admin",
  components: { Panel },
  data() {
    return {
      menu: [
        {
          name: "dashboard",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M21 14V4H3v10h18m0-12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7l2 3v1H8v-1l2-3H3a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2h18M4 5h11v5H4V5m12 0h4v2h-4V5m4 3v5h-4V8h4M4 11h5v2H4v-2m6 0h5v2h-5v-2Z"/></svg>',
          to: { name: "base" },
        },

        {
          name: "shared",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M11 9V5l7 7l-7 7v-4.1c-5 0-8.5 1.6-11 5.1c1-5 4-10 11-11m6-1V5l7 7l-7 7v-3l4-4l-4-4Z"/></svg>',
          childs: [
            {
              permission: "settings",
              name: "settings",
              to: { name: "settings" },
            },
          ],
        },
        { name: "default", type: "hr" },
        {
          name: "users",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 5.5A3.5 3.5 0 0 1 15.5 9a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 9A3.5 3.5 0 0 1 12 5.5M5 8c.56 0 1.08.15 1.53.42c-.15 1.43.27 2.85 1.13 3.96C7.16 13.34 6.16 14 5 14a3 3 0 0 1-3-3a3 3 0 0 1 3-3m14 0a3 3 0 0 1 3 3a3 3 0 0 1-3 3c-1.16 0-2.16-.66-2.66-1.62a5.536 5.536 0 0 0 1.13-3.96c.45-.27.97-.42 1.53-.42M5.5 18.25c0-2.07 2.91-3.75 6.5-3.75s6.5 1.68 6.5 3.75V20h-13v-1.75M0 20v-1.5c0-1.39 1.89-2.56 4.45-2.9c-.59.68-.95 1.62-.95 2.65V20H0m24 0h-3.5v-1.75c0-1.03-.36-1.97-.95-2.65c2.56.34 4.45 1.51 4.45 2.9V20Z"/></svg>',
          childs: [
            { permission: "users", name: "users", to: { name: "users" } },
          ],
        },
        {
          name: "settings",
          icon: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12.013 2.25c.734.008 1.465.093 2.181.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.928 1.116l1.4-.615a.75.75 0 0 1 .85.174a9.793 9.793 0 0 1 2.204 3.792a.75.75 0 0 1-.271.825l-1.242.916a1.38 1.38 0 0 0 .001 2.226l1.243.915a.75.75 0 0 1 .271.826a9.798 9.798 0 0 1-2.203 3.792a.75.75 0 0 1-.849.175l-1.406-.617a1.38 1.38 0 0 0-1.927 1.114l-.169 1.526a.75.75 0 0 1-.572.647a9.518 9.518 0 0 1-4.405 0a.75.75 0 0 1-.572-.647l-.17-1.524a1.382 1.382 0 0 0-1.924-1.11l-1.407.616a.75.75 0 0 1-.849-.175a9.798 9.798 0 0 1-2.203-3.796a.75.75 0 0 1 .271-.826l1.244-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.272-.826a9.793 9.793 0 0 1 2.205-3.792a.75.75 0 0 1 .849-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.718-.159 1.45-.243 2.202-.252Zm0 1.5a9.135 9.135 0 0 0-1.355.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.798.588c.32.842.775 1.626 1.347 2.322l.906-.397a2.882 2.882 0 0 1 4.017 2.318l.108.984c.89.15 1.799.15 2.689 0l.108-.984a2.88 2.88 0 0 1 4.02-2.322l.904.396a8.299 8.299 0 0 0 1.347-2.318l-.798-.588a2.88 2.88 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.99 8.99 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5a3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5Z"/></svg>',
          childs: [
            { permission: "sms", name: "sms", to: { name: "sms" } },
            {
              permission: "activities",
              name: "activities",
              to: { name: "activities" },
            },
            {
              permission: "trackers",
              name: "trackers",
              to: { name: "trackers" },
            },
            {
              permission: "permissions",
              name: "permissions",
              to: { name: "permissions" },
            },
            { permission: "roles", name: "roles", to: { name: "roles" } },
            {
              permission: "translates",
              name: "translates",
              to: { name: "translates" },
            },
          ],
        },
      ],
    };
  },
};
</script>
