<template>
  <div class="ps-2 admin-menus">
    <div v-for="(item, i) in items" :key="i">
      <div class="d-flex h-space-between v-center cursor-pointer">
        <r-card class="admin-menu-item d-flex v-center flex-grow-1"
                :to="item.path?{path:item.path.startsWith('/')?item.path:'/'+item.path}:undefined"
                @click.prevent=" open === item.id ? (open = null) : (open = item.id) "
                flat>
          <r-img v-if="item.icon.length>0"
                 class="me-1"
                 :src="item.icon[0]" is-svg width="24" height="24" alt="icon"></r-img>
          {{ item.title }}
        </r-card>
        <r-icon v-if="item.children.length>0" class="me-1 cursor-pointer"
                v-html="open === item.id? $r.icons.minus : $r.icons.plus"
                @click.prevent.stop=" open === item.id ? (open = null) : (open = item.id) "></r-icon>
      </div>
      <admin-menus v-if="item.children" :class="{ 'admin-menus-hide': open !== item.id}"
                   :items="item.children"
                   class="ms-1"></admin-menus>
    </div>
  </div>

</template>
<script>
export default {
  name: 'admin-menus',
  props: {
    items: Array
  },
  data() {
    return {
      open: null
    }
  }

}
</script>
<style lang="scss">
.admin-menus {
  transition: 0.3s all ease;
  min-width: 200px;
  max-height: 100vh;
  overflow: auto;
}

.admin-menu-item {
  padding: 4px;
}

.router-link-exact-active {
  background-color: var(--color-one) !important;
  color: var(--color-on-one) !important;
  border-radius: 20px 0 0 20px;
  padding: 4px 4px 4px 8px !important;
}

.admin-menus-hide {
  max-height: 0;
  overflow: hidden;
}
</style>
