<template>
  <div>
    <costume-card
      icon="mdi-clipboard-text"
      title="Dashboard"
      class="pa-0 px-5 py-0"
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
