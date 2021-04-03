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
  import request from '@/utils/request'
  import {
    mapState,
  } from 'vuex'
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        dashboard: 'Dashboard',
      }
    },
    computed: {
      ...mapState('user', {
        detailUser: state => state.detailUser,
      }),
    },
    mounted () {
      this.initViz()
    },
    methods: {
      async initViz () {
        const containerDiv = document.getElementById('vizContainer')
        const token = await this.getTokenTableu()
        console.log(token)
        if (!token || token !== -1) return
        const url = `${process.env.VUE_APP_TABLEU_API}/trusted/${token}/views/DashboardGroupware/DashboardRingkasanKaryawan?:showVizHome=no&:embed=true`
        const options = {
          hideTabs: true,
          onFirstInteractive: () => { },
        }
        this.viz = new window.tableau.Viz(containerDiv, url, options)
      },
      async getTokenTableu () {
        let typeTableuDashboard
        if (this.detailUser.menu === 2) {
          typeTableuDashboard = process.env.VUE_APP_TABLEU_TYPE_HR
        } else if (this.detailUser.menu === 3) {
          typeTableuDashboard = process.env.VUE_APP_TABLEU_TYPE_KOOR
        } else if (this.detailUser.menu === 4) {
          typeTableuDashboard = process.env.VUE_APP_TABLEU_TYPE_STRUKTURAL
        }
        const resp = await request(process.env.VUE_APP_TABLEU_TOKEN_API + typeTableuDashboard)
        return resp?.data?.token || null
      },
    },
  }
</script>
