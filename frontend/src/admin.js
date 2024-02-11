import { createApp } from "vue";
import App from "./Admin.vue";
import Axios from "./plugins/axios";
import router from "./router/admin";
import renusify from "renusify";

window.app = createApp(App)
  .use(router)
  .use(Axios)
  .use(renusify, {
    rtl: false,
    lang: "en",
    package: "admin",
    components: [
      "r-content",
      "r-container",
      "r-row",
      "r-col",
      "r-spacer",
      "r-divider",
      "r-btn",
      "r-icon",
      "r-form-creator",
      "r-card",
      "r-modal",
      "r-form",
      "r-input",
      "r-text-input",
      "r-tel-input",
      "r-switch-input",
      "r-mask-input",
      "r-chip",
      "r-list",
      "r-table",
      "r-table-crud",
      "r-message",
      "r-time-ago",
      "r-confirm",
      "r-progress-circle",
      "r-img",
      "r-chart",
      "r-date-input",
      "r-search-box",
      "r-text-area",
      "r-password-input",
      "r-unique-input",
      "r-btn-confirm",
      "r-count-down",
      "r-menu",
      "r-json-input",
      "r-file-input",
    ],
    directives: ["title"],
  })
  .mount("#app");
