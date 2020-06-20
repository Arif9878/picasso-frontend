<template>
  <v-container
    fluid
    class="py-0 mb-5"
  >
    <v-row>
      <v-col
        cols="12"
        class="pb-0"
      >
        <h3><strong>{{ dashboard }}</strong></h3>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        dashboard: 'Dashboard',
      }
    },

    methods: {
      //
    },
  }
</script>
