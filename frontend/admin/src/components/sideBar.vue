<template>
  <r-container class="side-bar" full-width>
    <slot name="first"></slot>
    <r-row class="flex-column">
      <r-col v-for="(item, i) in items" :key="i">
        <div v-if="item.type === 'hr'" class="text-center caption">
          {{ $t(item.name) }}
          <r-divider></r-divider>
        </div>
        <div
          v-else
          @click.prevent="select === i ? (select = null) : (select = i)"
        >
          <r-card
            class="side-bar-item title d-flex h-space-between px-1 py-2"
            :class="{
              'router-link-exact-active': select === i,
            }"
            flat
            ripple
            :to="item.to"
          >
            <span class="flex-grow-1">
              <r-icon v-if="item.icon" v-html="item.icon" exact></r-icon>
              {{ $t(item.name) }}
            </span>
            <r-icon
              v-if="item.childs"
              v-html="$r.icons.chevron_down"
              :class="{
                'side-bar-icon-active': select === i,
              }"
            ></r-icon>
          </r-card>
        </div>
        <div
          v-if="item.childs"
          :class="{
            'side-bar-sub-item-active': select === i,
          }"
          class="side-bar-sub-item ms-2"
        >
          <r-card
            class="side-bar-sub-item-link d-block subtitle-1 px-1 py-2 mb-1"
            v-for="(child, j) in item.childs"
            :key="`${i}-${j}`"
            flat
            ripple
            :to="child.to"
          >
            {{ $t(child.name) }}
          </r-card>
        </div>
      </r-col>
    </r-row>
  </r-container>
</template>

<script>
export default {
  name: "sideBar",
  props: {
    items: Array,
  },
  data() {
    return {
      select: null,
    };
  },
};
</script>

<style lang="scss">

.side-bar {
  color: #fff;
  &-item {
    cursor: pointer;
  }

  &-icon-active {
    transition: 0.5s all ease;
    transform: rotateZ(180deg) !important;
  }

  &-sub-item {
    color: #eae6e6;
    transition: 0.2s all ease-in-out;
    max-height: 0;
    height: auto;
    overflow: hidden;

    &-active {
      transition: 0.5s all ease-in;
      max-height: 500px;
    }
  }
}
</style>
