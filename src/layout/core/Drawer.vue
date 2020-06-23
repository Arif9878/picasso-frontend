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
            class="display-1"
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
          v-if="item.children"
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

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'dashboard',
          to: '/',
        },
        {
          icon: 'mdi-account',
          title: 'user',
          to: '/user',
        },
        {
          icon: 'mdi-microsoft',
          title: 'master',
          group: '/master',
          children: [
            {
              icon: 'mdi-book-open-page-variant',
              title: 'divisi',
              to: 'divisi',
            },
            {
              icon: 'mdi-book-open-variant',
              title: 'jabatan',
              to: 'jabatan',
            },
            {
              icon: 'mdi-keyboard',
              title: 'project',
              to: 'project',
            },
          ],
        },
      ],
    }),

    computed: {
      ...mapState('app', {
        barColor: state => state.barColor,
        barImage: state => state.barImage,
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
        return this.items.map(this.mapItem)
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
