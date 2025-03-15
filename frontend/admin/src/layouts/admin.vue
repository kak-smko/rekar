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
        <img class="me-2" :src="'/pwa/logo?t=m&w=170&h=60'" />
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
        <admin-menus :items="menu"></admin-menus>
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

import AdminMenus from '@/components/menus.vue'

export default {
  components: { AdminMenus },
  data() {
    return {
      open: false,
      menu:[]
    };
  },
  created() {
    this.$axios.get('home/menu/admin').then(({data})=>{
      this.menu = data;
    })
  },
  watch: {
    $route: function () {
      this.open = false;
    },
  },

};
</script>

<style lang="scss">
@use "sass:map";
@use "renusify/style/variables/base" as var;
@use "renusify/style/mixins" as mx;
@use "renusify/style/mixins/container" as mxc;

$menu-width: 300px;
.template-panel {
  display: flex;
  flex-direction: row;
  position: relative;

  .toolbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: var.$toolbar-height;
    z-index: map.get(var.$z-index, "medium");
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
      min-height: calc(100vh - #{var.$toolbar-height});
      transition: 0.1s all ease-in-out;
      position: absolute;
      top: 0;
      z-index: 2;
      @include mx.rtl() {
        left: 0;
      }
      @include mx.ltr() {
        right: 0;
      }
    }

    .list {
      @include mx.rtl() {
        right: 0 !important;
      }
      @include mx.ltr() {
        left: 0 !important;
      }
    }
  }

  .menu-panel {
    transition: 0.3s all ease-in-out;
    height: calc(100vh - #{var.$toolbar-height});
    top: var.$toolbar-height;
    position: fixed;
    z-index: map.get(var.$z-index, "medium");
    opacity: 0;
    @include mx.rtl() {
      right: 0;
    }
    @include mx.ltr() {
      left: 0;
    }

    .list {
      overflow-y: auto;
      width: $menu-width;
      transition: 0.3s all ease-in-out;
      height: 100%;
      position: absolute;
      top: 0;
      background-color: var(--color-sheet);
      @include mx.rtl() {
        right: -$menu-width;
        border-left: 1px solid;
      }
      @include mx.ltr() {
        left: -$menu-width;
        border-right: 1px solid;
      }
      font-weight: bold;
    }

  }

  @include mxc.media-breakpoint-up("lg") {
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
      @include mx.rtl() {
        right: 0 !important;
      }
      @include mx.ltr() {
        left: 0 !important;
      }
    }
  }
}
</style>
