<template>
  <v-main class="grey lighten-3 px-4">
    <v-row>
      <v-col cols="2">
        <v-sheet rounded="lg">
          <dashboard-core-drawer />
        </v-sheet>
      </v-col>

      <v-col>
        <v-sheet
          min-height="80vh"
          rounded="lg"
        >
          <router-view />
        </v-sheet>
      </v-col>
    </v-row>
  </v-main>
  <!-- <v-main>
  </v-main> -->
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreDrawer: () => import('./Drawer'),
    },

  }
</script>
