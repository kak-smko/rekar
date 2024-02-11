import { createApp } from "vue";
import App from "./Index.vue";
import Axios from "./plugins/axios";
import "./registerServiceWorker";
import router from "./router/index";
import renusify from "renusify";

window.app = createApp(App)
  .use(router)
  .use(Axios)
  .use(renusify, {
    rtl: false,
    lang: "en",
    package: "index",
    components: [
      "r-content",
      "r-meta",
      "r-container",
      "r-row",
      "r-col",
      "r-spacer",
      "r-divider",
      "r-btn",
      "r-icon",
      "r-card",
      "r-message",
      "r-modal",
      "r-text-input",
      "r-tel-input",
      "r-switch-input",
      "r-mask-input",
      "r-img",
      "r-btn-confirm",
      "r-menu",
      "r-check-input",
      "r-password-input",
      "r-unique-input",
      "r-avatar",
      "r-toolbar",
      "r-count-down",
      "r-toolbar",
      "r-count-down"
    ],
    directives: ["title"],
  })
  .mount("#app");
