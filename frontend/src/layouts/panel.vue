<template>
  <div
    class="template-panel h-end"
    :class="{
      'menu-open': open,
    }"
  >
    <header
      class="toolbar border-none d-flex v-center sheet sheet-tile elevation-sm"
    >
      <r-btn class="btn-menu" icon text @click.prevent="open = !open">
        <r-icon v-if="!open" v-html="$r.icons.menu"></r-icon>
        <r-icon v-else v-html="$r.icons.close"></r-icon>
      </r-btn>
      <router-link to="/" target="_blank">
        <img class="me-2" src="/pwa/logo?t=m&w=170&h=60" />
      </router-link>
      <span
        v-title:bottom="
          '+' +
          ($helper.ifHas($r.store, false, 'user', 'info', 'country_code') ||
            '') +
          ' ' +
          ($helper.ifHas($r.store, false, 'user', 'info', 'phone') || '')
        "
        v-if="$helper.ifHas($r.store, false, 'user', 'info', 'name')"
        >{{ $t(["welcome", [$r.store.user.info.name]]) }}</span
      >
      <r-spacer></r-spacer>
    </header>
    <aside class="menu-panel">
      <div class="list">
        <sideBar :items="genMenu"></sideBar>
      </div>
      <div class="hover-div" @click.prevent="open = false"></div>
    </aside>
    <r-content :flipped="$r.breakpoint.lgAndUp" below-header="80px">
      <router-view v-slot="{ Component }">
        <transition name="slide-start" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </r-content>
  </div>
</template>

<script>
import sideBar from "../components/sideBar";

export default {
  name: "panel",
  props: { menu: Array, account: { type: String, default: "user" } },
  components: { sideBar },
  data() {
    return {
      open: false,
    };
  },
  watch: {
    $route: function () {
      this.open = false;
    },
  },
  computed: {
    genMenu() {
      let res = [];
      for (let i = 0; i < this.menu.length; i++) {
        let item = this.menu[i];

        if ("childs" in item) {
          let child = [];
          for (let j = 0; j < item["childs"].length; j++) {
            if (this.can(item["childs"][j])) {
              child.push(item["childs"][j]);
            }
          }
          item["childs"] = child;
          res.push(item);
        } else if (this.can(item) || item["type"] === "hr") {
          res.push(item);
        }
      }
      return res;
    },
    permissions() {
      const { permissions } = this.$r.store.user.info;
      return permissions;
    },
  },
  methods: {
    can(item) {
      if (!item.permission) {
        return true;
      }
      if (
        this.permissions.includes("*") ||
        this.permissions.includes(item.permission)
      ) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
@import "~renusify/style/_include";

$menu-width: 300px;
.template-panel {
  display: flex;
  flex-direction: row;
  position: relative;

  .toolbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: $toolbar-height;
    z-index: map_get($z-index, "medium");
  }

  &.menu-open {
    .menu-panel {
      width: 100vw;
      opacity: 1;
      background-color: rgba(0, 0, 0, 0.4);
    }

    .hover-div {
      width: calc(100% - #{$menu-width});
      max-width: calc(100% - #{$menu-width});
      min-height: calc(100vh - #{$toolbar-height});
      transition: 0.1s all ease-in-out;
      position: absolute;
      top: 0;
      z-index: 2;
      @include rtl() {
        left: 0;
      }
      @include ltr() {
        right: 0;
      }
    }

    .list {
      @include rtl() {
        right: 0 !important;
      }
      @include ltr() {
        left: 0 !important;
      }
    }
  }

  .menu-panel {
    transition: 0.3s all ease-in-out;
    height: calc(100vh - #{$toolbar-height});
    top: $toolbar-height;
    position: fixed;
    z-index: map_get($z-index, "medium");
    opacity: 0;
    @include rtl() {
      right: 0;
    }
    @include ltr() {
      left: 0;
    }

    .list {
      overflow-y: auto;
      width: $menu-width;
      transition: 0.3s all ease-in-out;
      background-color: var(--color-one);
      height: 100%;
      position: absolute;
      top: 0;
      @include rtl() {
        right: -$menu-width;
      }
      @include ltr() {
        left: -$menu-width;
      }
      color: white;
      font-weight: bold;
    }

    * {
      color: white !important;
    }
  }

  @include media-breakpoint-up("lg") {
    .btn-menu {
      display: none;
    }
    .menu-panel {
      width: $menu-width !important;
      background-color: transparent;
      opacity: 1;
    }

    .hover-div {
      width: 0 !important;
    }
    .list {
      @include rtl() {
        right: 0 !important;
      }
      @include ltr() {
        left: 0 !important;
      }
    }
  }
}
</style>
