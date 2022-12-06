<template>
  <footer class="home-footer mt-5">
    <r-container>
      <r-row>
        <r-col class="col-6 md-4"> </r-col>
        <r-col class="col-6 md-4">
          <div class="display-5 mb-3 font-weight-bold">{{ $t("pages") }}</div>
        </r-col>
        <r-col class="col-12 md-4">
          <span class="display-5 font-weight-bold">{{ $t("be_with_us") }}</span>
          <div>
            <r-btn
              v-for="(item, i) in social_media"
              :key="i"
              icon
              outlined
              class="ma-2 br-lg btn-icon"
              v-title="i"
              :href="item"
              target="_blank"
            >
              <img
                :src="`/storage/logos/${i}.svg`"
                :alt="i"
                width="25"
                height="25"
              />
            </r-btn>
          </div>
          <install-app class="mt-5"></install-app>
        </r-col>
      </r-row>
    </r-container>

    <r-container full-width class="color-one_d text-center title">
      <r-row class="h-center no-gutters">
        <r-col class="col-auto color-white-text">
          {{ $t("footer_copyright_msg") }}
        </r-col>
      </r-row>
    </r-container>
  </footer>
</template>

<script>
import InstallApp from "./installApp";
export default {
  name: "homeFooter",
  components: {InstallApp},
  data() {
    return {
      social_media: {},
    };
  },
  created() {
    this.get();
  },
  methods: {
    go(hash) {
      if (this.$route.name !== hash.to.name) {
        this.$router.push(hash.to);
        setTimeout(() => {
          const el = document.getElementById(hash.id);
          if (el !== null) {
            el.scrollIntoView();
          }
        }, 1000);
      } else {
        setTimeout(() => {
          const el = document.getElementById(hash.id);
          if (el !== null) {
            el.scrollIntoView();
          }
        }, 100);
      }
    },
    get() {
      this.$axios.get("home/settings/multi/social_media").then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          this[data[i]["name"]] = data[i]["value"];
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import "~renusify/style/include";

.home-footer {
  background-color: #575454 !important;
  border-top: 1px solid #141415;

  * {
    color: #fff !important;
  }

  .btm-line {
    width: 150px;
    height: 4px;
  }
  .btn-icon {
    opacity: 0.5;
    &:hover {
      background-color: var(--color-one-light);
      opacity: 1;
    }
  }
}
</style>
