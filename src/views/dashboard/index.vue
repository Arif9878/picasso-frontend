<template>
  <div class="ma-3">
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
      <div
        id="vizContainer"
        style="min-height: 100vh;"
      />
    </costume-card>
  </div>
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
      this.initViz()
    },
    methods: {
      initViz () {
        const containerDiv = document.getElementById('vizContainer')
        const url = 'https://dashboard.jabarprov.go.id/views/DashboardGroupware/DashboardRingkasanKaryawan?:showVizHome=no&:embed=true'
        const options = {
          hideTabs: true,
          onFirstInteractive: () => { },
        }
        this.viz = new window.tableau.Viz(containerDiv, url, options)
      },
    },
  }
</script>
