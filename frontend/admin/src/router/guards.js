export const auth = (to, from, next) => {
  if (!window.app.$r.store.user_loaded) {
    setTimeout(() => {
      auth(to, from, next);
    }, 100);
    return;
  }

  if (!window.app.$r.store.user.login) {
    window.app.$storage.set("url.intended", to.fullPath);
    window.app.$toast(window.app.$t("login_need"), { type: "warning" });
    next({ name: "login" });
  } else {
    next();
  }
};

export const role = (to, from, next) => {
  if (!window.app.$r.store.user_loaded) {
    setTimeout(() => {
      role(to, from, next);
    }, 100);
    return;
  }

  if (!window.app.$r.store.user.login) {
    window.app.$storage.set("url.intended", to.fullPath);
    window.app.$toast(window.app.$t("login_need"), { type: "warning" });
    next({ name: "login" });
  } else {
    const { permissions } = window.app.$r.store.user.info;
    if (permissions.includes("admin") || permissions.includes("*")) {
      next();
    } else {
      window.app.$toast(window.app.$t("role_guard"), { type: "warning" });
      setTimeout(() => {
        location.replace("/");
      }, 1000);
    }
  }
};

export const profile_complete = (to, from, next) => {
  if (!window.app.$r.store.user_loaded) {
    setTimeout(() => {
      profile_complete(to, from, next);
    }, 100);
    return;
  }

  if (!window.app.$r.store.user.login) {
    window.app.$storage.set("url.intended", to.fullPath);
    window.app.$toast(window.app.$t("login_need"), { type: "warning" });
    next({ name: "login" });
  } else {
    const user = window.app.$r.store.user.info;
    if (user.name && user.last_name) {
      next();
    } else {
      window.app.$toast(window.app.$t("complete_profile"), { type: "warning" });
      next({ name: "profile" });
    }
  }
};

export const guest = (to, from, next) => {
  if (window.app.$r.store.user.login) {
    window.app.$toast(window.app.$t("already_login"));
    next({ name: "base" });
  } else {
    next();
  }
};
