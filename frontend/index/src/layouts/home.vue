<template>
  <div class="template-home">
    <r-toolbar logo="/pwa/logo?t=m" :menu="baseMenu">
      <template #search="{ item }">
        <div class="d-flex">
          <img class="me-1" :src="'/' + item.images[0] + '?w=50'" />
          {{ item.title }}
        </div>
      </template>
    </r-toolbar>
    <r-content>
      <router-view v-slot="{ Component }">
        <transition name="slide-end" mode="out-in">
          <keep-alive :exclude="['singleBlog']">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </r-content>
    <home-footer></home-footer>
  </div>
</template>

<script>
import HomeFooter from "../components/homeFooter.vue";

export default {
  components: { HomeFooter },
  data() {
    return {
      search: null,
      baseMenu: [{ title: this.$t("home"), to: { name: "base" } }],
    };
  },
};
</script>

<style lang="scss">
.r-content {
  min-height: 80vh;
}
</style>
