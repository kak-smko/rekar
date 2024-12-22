export const App = {
  data() {
    return {
      lang_added: false,
    };
  },
  methods: {
    setDefault() {
      this.lang_added = false;
      let data = this.$storage.get("siteDefault", false);
      if (data === false) {
        return;
      }
      if (data["fonts"]) {
        document.head.append(
          document.createRange().createContextualFragment(data["fonts"])
        );
      }
      if (data["meta_tag"]) {
        document.head.append(
          document.createRange().createContextualFragment(data["meta_tag"])
        );
      }
      if (data["colors"]) {
        let el = document.createElement("style");
        el.setAttribute("f", "siteDefault");
        el.innerHTML = data["colors"];
        document.head.append(el);
      }
      this.$r.store.version = data["version"] || 0;
      this.$r.langs = data["langs"] || {};
      this.$r.rtl = this.$storage.get("rtl", data["rtl"]);
      this.$r.lang = this.$storage.get("lang", data["lang"]);

      if (data["translates"] && data["lang"] === this.$r.lang) {
        let r = {};
        data["translates"].forEach((item) => {
          r[item.key] = item[this.$r.lang];
        });
        this.$translate.setMessages(r, this.$r.lang);
        this.$translate.local = this.$r.lang;
      } else {
        this.lang_loads(this.$r.lang)
      }
      setTimeout(() => {
        this.lang_added = true;
      }, 10);
      this.$helper.setCookie("lang", this.$r.lang, 1000 * 24 * 60 * 60);
      document.documentElement.setAttribute("lang", this.$r.lang);
    },
    getDefault() {
      this.$axios.get("site-default").then(({data}) => {
        let d = this.$storage.get("siteDefault", {});
        if (data["hash"] !== d["hash"]) {
          this.$storage.set("siteDefault", data);
          setTimeout(() => {
            window.location.reload()
          }, 100)
        }
        d = "";
      }, () => {
        this.lang_loads(this.$r.lang)

      });
    },
    lang_loads(lang) {
      this.$axios.get(`/translate/renusify,${this.$r.package}/${lang}`).then(({data}) => {
        const d = {};
        const lng = data.length
        for (let i = 0; i < lng; i++) {
          d[data[i].key] = data[i][lang];
        }

        this.$translate.setMessages(d, lang);
        this.$translate.local = lang;
      }).finally(() => {
        setTimeout(() => {
          this.lang_added = true;
        }, 100);
      })
    },
    userInfo() {
      this.$r.store.user = {login: false, info: {}};
      this.$r.store.user_loaded = false;
      if (this.$storage.get("auth.token", false)) {
        this.$r.store.user = this.$storage.get("user_login", {
          login: false,
          info: {},
        });
        this.$axios.get("user").then(
          ({data}) => {
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
    },
  }
};
