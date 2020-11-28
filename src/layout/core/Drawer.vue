<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== '#16A75C, #A1D5AB'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-breakpoint="960"
    cla
    app
    absolute
    rounded="lg"
    width="200"
    v-bind="$attrs"
    style="border-radius: 5px;left:15px;top:100px;height:80vh;position:fixed;"
  >
    <v-list
      expand
      nav
      class="pl-0"
    >
      <template v-for="(item, i) in computedItems">
        <item-group
          v-if="item.children && item.group !== null"
          :key="`group-${i}`"
          :class="$vuetify.theme.dark ? 'theme--dark':'theme--light'"
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
    },
  }
</script>
