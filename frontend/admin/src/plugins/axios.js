import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
axios.defaults.baseURL = `${import.meta.env.VITE_APP_API_URL}/api`;
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Content-Type"] =
  "application/json";

axios.interceptors.request.use(
  (config) => {
    if (window.app.$storage.has("auth.token")) {
      config.headers.Authorization =
        window.app.$storage.get("auth.token");
    }
    config.headers.lang = window.app.$r.lang;

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = window.app.$helper.htmlDecode(response.data);
      if (response.data.msg) {
        window.app.$toast(window.app.$t(response.data.msg));
      }
    }
    return response;
  },
  (error) => {
    const res = error.response;
    if (res && res.status === 307 && res.data.location) {
      console.log("redirect to:" + res.data.location);
      window.location.replace(res.data.location);
    }

    if (res && res.data.msg === "auth.failed") {
      window.app.$toast(window.app.$t("auth.failed"), {
        type: "error",
      });
      window.app.$r.store.user = { login: false, info: {} };
      window.app.$storage.remove("auth.token");
      window.app.$storage.remove("user_login");
    } else if (res && res.data.msg) {
      window.app.$toast(window.app.$t(res.data.msg), {
        type: "error",
      });
    }

    return Promise.reject(error);
  }
);
export default {
  install: (app) => {
    app.config.globalProperties.$axios = axios;
    app.provide('axios', app.config.globalProperties.$axios)
  },
};
