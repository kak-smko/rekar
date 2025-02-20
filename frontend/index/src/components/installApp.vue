<template>
  <r-btn
    class="color-info"
    block
    @click="add"
    v-if="this.$r.store.deferredPrompt"
  >
    {{ $t("install_app") }}
  </r-btn>
</template>

<script>
export default {
  name: "installApp",
  methods: {
    add() {
      const deferredPrompt = this.$r.store.deferredPrompt;
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        this.$r.store.deferredPrompt = null;
      });
    },
  },
};
</script>
