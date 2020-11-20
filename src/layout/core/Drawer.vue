<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== '#525252, #525252'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="favicon.ico"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="display-1 ma-2 py-2"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <div />
      <template v-for="(item, i) in computedItems">
        <item-group
          v-if="item.children && item.group !== null"
          :key="`group-${i}`"
          :item="item"
        />
        <item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>
      <div />
    </v-list>
    <template v-slot:append>
      <v-list-item
        @click="handleLogout"
      >
        <v-list-item-icon>
          <v-icon v-text="'mdi-logout'" />
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="$t('logout')" />
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
    mapGetters,
  } from 'vuex'
  // import {
  //   menuItems,
  // } from '@/utils/constantVariable'
  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    // data: () => ({
    //   menuItems,
    // }),

    computed: {
      ...mapState('app', {
        barColor: state => state.barColor,
        barImage: state => state.barImage,
      }),
      ...mapState('user', {
        menuItems: state => state.menuItems,
      }),
      ...mapGetters('permissions', [
        'permission_routes',
      ]),
      drawer: {
        get () {
          return this.$store.state.app.drawer
        },
        set (val) {
          this.$store.commit('app/SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.menuItems.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: this.$t('avatar'),
        }
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
      handleLogout () {
        this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      },
    },
  }
</script>
