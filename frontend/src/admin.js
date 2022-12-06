import { createApp } from "vue";
import App from "./Admin.vue";
import Axios from "./plugins/axios";
import router from "./router/admin";
import renusify from "renusify";

window.app = createApp(App)
  .use(router)
  .use(Axios)
  .use(renusify, {
    rtl: true,
    lang: "fa",
    package: "admin",
    components: [
      "r-app",
      "r-content",
      "r-meta",
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
      "r-tel",
      "r-switch",
      "r-chip",
      "r-list",
      "r-table",
      "r-table-crud",
      "r-message",
      "r-time-ago",
      "r-confirm",
      "r-mask-input",
      "r-progress-circular",
      "r-progress-liner",
      "r-img",
      "r-chart",
      "r-date-picker",
      "r-btn-group",
      "r-search-input",
      "r-text-area",
      "r-address",
      "r-check-input",
      "r-password",
      "r-unique-feild",
      "r-file-uploader",
      "r-select",
      "r-range",
      "r-number",
      "r-rating",
      "r-text-editor",
      "r-text-editor-preview",
      //"r-avatar",
      //"r-toolbar",
      //"r-navbar",
      //"r-bottom-navigation",
      //"r-breadcrumbs",
      //"r-breadcrumbs-item",
      "r-count-down",
      //"r-slider",
      //"r-swiper",
      //"r-tabs",
      "r-group",
      "r-infinite-div",
      //"r-infinite-page",
      "r-infinite-box",
      //"r-iframe",
      "r-menu",
      "r-json",
      "r-tree",
      "r-float",
    ],
    directives: ["title"],
  })
  /*.mixin({
    created() {
      if (this.$options.metaInfo) {
        console.log(this.$options.metaInfo);
      }
    }
  })*/
  .mount("#app");
