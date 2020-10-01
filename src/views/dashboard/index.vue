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
    <costume-card
      icon="mdi-clipboard-text"
      title="Dashboard"
      class="px-5 py-3"
    >
      <div id="vizContainer" />
    </costume-card>
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
    mounted () {
      window.addEventListener('load', () => {
        this.initViz()
      })
    },
    methods: {
      initViz () {
        const containerDiv = document.getElementById('vizContainer')
        const url = 'http://dashboard.jabarprov.go.id/views/DashboardGroupware/DashboardRingkasanKaryawan'
        const options = {
          hideTabs: true,
          onFirstInteractive: () => { },
        }
        this.viz = new window.tableau.Viz(containerDiv, url, options)
      },
    },
  }
</script>
