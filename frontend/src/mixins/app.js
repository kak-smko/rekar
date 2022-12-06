export const App = {
  created() {
    if (window.site_settings) {
      this.$r.langs = window.site_settings["langs"];
      this.$r.dark = window.site_settings["dark"];
      this.$r.rtl = window.site_settings["rtl"];
      this.$r.lang = window.site_settings["lang"];
    }
  },
  methods: {
    userInfo() {
      this.$r.store.user = { login: false, info: {} };
      this.$r.store.user_loaded = false;
      if (
        this.$storage.has("auth.token") &&
        this.$storage.get("auth.token") !== "undefined"
      ) {
        this.$r.store.user = this.$storage.get("user_login", {
          login: false,
          info: {},
        });
        this.$axios.get("user").then(
          ({ data }) => {
            this.$r.store.user = data;
            this.$storage.set("user_login", data);
            this.$r.store.user_loaded = true;
          },
          () => {
            this.$r.store.user = {
              login: false,
              info: {},
            };
            this.$storage.remove("user_login");
            this.$r.store.user_loaded = true;
          }
        );
      } else {
        this.$r.store.user_loaded = true;
      }

      if (this.$storage.get("theme.night") !== null) {
        this.$r.dark = this.$storage.get("theme.night");
      }
      if (this.$storage.get("rtl") !== null) {
        this.$r.rtl = this.$storage.get("rtl");
      }
      if (this.$storage.get("lang") !== null) {
        this.$r.lang = this.$storage.get("lang");
      }

      setTimeout(() => {
        this.$translate.loads(["renusify"]);
        this.$translate.load();
      }, 100);
      document.documentElement.setAttribute("lang", this.$r.lang);
    },
  },
  computed: {
    all_lang_loaded() {
      if (!this.$r.store.langs_loaded) {
        return false;
      }
      for (let item in this.$r.store.langs_loaded) {
        if (this.$r.store.langs_loaded[item] === false) {
          return false;
        }
      }
      return true;
    },
  },
};
