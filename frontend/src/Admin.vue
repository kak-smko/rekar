<template>
  <r-app>
    <div
      class="page-loading d-flex h-center v-center color-warning-text flex-column"
      v-if="!all_lang_loaded || !$r.store.user_loaded"
    >
      <r-progress-circle
        size="100"
        indeterminate
        width="4"
      ></r-progress-circle>
      <span class="mt-2">{{ $t("loading") }}</span>
    </div>
    <router-view v-else />
  </r-app>
</template>
<script>
import { App } from "./mixins/app";
export default {
  mixins: [App],
  created() {
    window.addEventListener("beforeinstallprompt", e => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      console.log("beforeinstallprompt");
      e.preventDefault();
      this.$r.store.deferredPrompt = e;
    });
    this.userInfo();
  },
};
</script>
<style lang="scss" scoped>
.page-loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-image: linear-gradient(45deg, #332665, #0ceae3);
  z-index: 100;
}
</style>
