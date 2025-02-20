<template>
  <div class="home-page">home</div>
</template>

<script>
export default {
  name: "home",

  data() {
    return {};
  },
};
</script>
<style lang="scss">
@keyframes right-left {
  0% {
    transform: translateX(10px);
  }
  50% {
    transform: translateX(30px);
  }
  100% {
    transform: translateX(10px);
  }
}
@keyframes up-down {
  0% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(30px);
  }
  100% {
    transform: translateY(10px);
  }
}
@keyframes slide {
  0% {
    max-width: 0;
  }

  100% {
    max-width: 100%;
  }
}
</style>
