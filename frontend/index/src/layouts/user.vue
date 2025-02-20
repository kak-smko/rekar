<template>
  <r-container >
    <r-row>
      <r-col v-if="!$r.breakpoint.mdAndUp" class="col-12">
        <r-btn icon @click="open=!open">
          <r-icon v-html="open?$r.icons.close:$r.icons.menu"></r-icon>
        </r-btn>
      </r-col>
      <r-col class="col-12 md-3 pa-0"
             :class="{
        'side-bar-mobile':!$r.breakpoint.mdAndUp,
        'side-bar-open':open}">
        <r-card class="pa-3 br-lg" tile>
          <div class="d-flex v-center mb-3">
            <r-avatar size="55">
              <r-img
                :src="`/api/user/img/profile/${$r.store.user.info.id}`"
                alt="user profile"
                width="50"
                :query="`r=${Math.random()}&`"
                height="50"
              ></r-img>
            </r-avatar>
            <span class="px-3">{{ $r.store.user.info.name }}</span>
            <r-spacer></r-spacer>
            <r-btn icon text class="color-info-text" :to="{name:'profile'}">
              <r-icon v-html="$r.icons.edit"></r-icon>
            </r-btn>
          </div>
          <div v-for="(item, i) in menu" :key="i">
            <div
              @click.prevent="select === i ? (select = null) : (select = i)"
            >
              <r-card
                class="side-bar-item title-3 d-flex h-space-between px-1 py-2"
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
                class="side-bar-sub-item-link d-block label-2 px-1 py-2 mb-1"
                v-for="(child, j) in item.childs"
                :key="`${i}-${j}`"
                flat
                ripple
                :to="child.to"
              >
                <r-icon v-html="$r.icons.minus"></r-icon>
                {{ $t(child.name) }}
              </r-card>
            </div>
          </div>
          <r-btn-confirm
            class="side-bar-item title-3 d-flex px-1 py-2 color-error-text d-flex h-start"
            text
            block
            @click.prevent="logout" v-if="$r.store.user.login">
            <r-icon v-html="$r.icons.logout"></r-icon>
            {{ $t('logout') }}
          </r-btn-confirm>
        </r-card>
      </r-col>
      <r-col class="col-12 md-9 pt-0">
        <router-view v-slot="{ Component }">
          <transition name="scale" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </r-col>
    </r-row>
  </r-container>
</template>

<script>

export default {
  data() {
    return {
      open: false,
      select: null,
      menu: [
        {
          name: 'dashboard',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M21 14V4H3v10h18m0-12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7l2 3v1H8v-1l2-3H3a2 2 0 0 1-2-2V4c0-1.11.89-2 2-2h18M4 5h11v5H4V5m12 0h4v2h-4V5m4 3v5h-4V8h4M4 11h5v2H4v-2m6 0h5v2h-5v-2Z"/></svg>',
          to: { name: 'dashboard' }
        },
        {
          name: 'settings',
          icon: '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12.013 2.25c.734.008 1.465.093 2.181.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.928 1.116l1.4-.615a.75.75 0 0 1 .85.174a9.793 9.793 0 0 1 2.204 3.792a.75.75 0 0 1-.271.825l-1.242.916a1.38 1.38 0 0 0 .001 2.226l1.243.915a.75.75 0 0 1 .271.826a9.798 9.798 0 0 1-2.203 3.792a.75.75 0 0 1-.849.175l-1.406-.617a1.38 1.38 0 0 0-1.927 1.114l-.169 1.526a.75.75 0 0 1-.572.647a9.518 9.518 0 0 1-4.405 0a.75.75 0 0 1-.572-.647l-.17-1.524a1.382 1.382 0 0 0-1.924-1.11l-1.407.616a.75.75 0 0 1-.849-.175a9.798 9.798 0 0 1-2.203-3.796a.75.75 0 0 1 .271-.826l1.244-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.272-.826a9.793 9.793 0 0 1 2.205-3.792a.75.75 0 0 1 .849-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.718-.159 1.45-.243 2.202-.252Zm0 1.5a9.135 9.135 0 0 0-1.355.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.798.588c.32.842.775 1.626 1.347 2.322l.906-.397a2.882 2.882 0 0 1 4.017 2.318l.108.984c.89.15 1.799.15 2.689 0l.108-.984a2.88 2.88 0 0 1 4.02-2.322l.904.396a8.299 8.299 0 0 0 1.347-2.318l-.798-.588a2.88 2.88 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.99 8.99 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5a3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5Z"/></svg>',
          to: { name: 'userSettings' }
        }
      ]
    }
  },
  created() {
    this.$r.icons.logout = '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m16.56 5.44l-1.45 1.45A5.969 5.969 0 0 1 18 12a6 6 0 0 1-6 6a6 6 0 0 1-6-6c0-2.17 1.16-4.06 2.88-5.12L7.44 5.44A7.961 7.961 0 0 0 4 12a8 8 0 0 0 8 8a8 8 0 0 0 8-8c0-2.72-1.36-5.12-3.44-6.56M13 3h-2v10h2"/></svg>'
  },
  watch: {
    '$route': function() {
      this.open = false
    }
  },
  methods: {
    logout() {
      this.$axios.post('/user/logout')
      this.$r.store.user = {
        login: false,
        info: {}
      }
      this.$storage.remove('user_login')
      this.$router.push({ name: 'base' })
    }
  }
}
</script>
<style lang="scss">
.side-bar {
  &-mobile {
    max-height: 0;
    padding: 0 !important;
    overflow: hidden;
    transition: .3s ease max-height;
  }

  &-open {
    max-height: 100vh;
    overflow: auto;
  }

  &-item {
    cursor: pointer;
  }

  &-icon-active {
    transition: 0.5s all ease;
    transform: rotateZ(180deg) !important;
  }

  &-sub-item {
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
