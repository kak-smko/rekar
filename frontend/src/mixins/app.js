export const App = {
  data() {
    return {
      lang_added: false,
    };
  },
  created() {
    this.setDefault();
    this.getDefault();
    this.userInfo();
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
        this.$translate.loads(["renusify"]);
      }
      setTimeout(()=>{
      this.lang_added = true;
      },50)
      this.$helper.setCookie("lang", this.$r.lang, 1000 * 24 * 60 * 60);
      document.documentElement.setAttribute("lang", this.$r.lang);
    },
    getDefault() {
      this.$axios.get("site-default/"+this.$r.package).then(({ data }) => {
        let d = this.$storage.get("siteDefault", {});
        if (data["hash"] !== d["hash"]) {
          this.$storage.set("siteDefault", data);
          this.setDefault();
        }
      });
    },
    userInfo() {
      this.$r.store.user = { login: false, info: {} };
      this.$r.store.user_loaded = false;
      if (this.$storage.get("auth.token", false)) {
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
    },
  },
  computed: {
    all_lang_loaded() {
      if(!this.lang_added){
        return false
      }
      for (let item in this.$r.store.langs_loaded) {
        if (this.$r.store.langs_loaded[item] === false) {
          return false;
        }
      }
      return true;
    }}
};
