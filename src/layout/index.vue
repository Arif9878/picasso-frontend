<template>
  <div>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-settings />
  </div>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('./core/AppBar'),
      DashboardCoreDrawer: () => import('./core/Drawer'),
      DashboardCoreSettings: () => import('./core/Settings'),
      DashboardCoreView: () => import('./core/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
