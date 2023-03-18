<template>
  <r-app>
    <div
      class="page-loading d-flex h-center v-center color-warning-text flex-column"
      v-if="!all_lang_loaded"
    >
      <r-progress-circular
        size="100"
        indeterminate
        width="4"
      ></r-progress-circular>
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
    this.userInfo();
  },
};
</script>
<style lang="scss">
body {
  --color-background-one: #fff;
}

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
