<template>
  <div class="ma-3">
    <costume-card
      icon="mdi-clipboard-text"
      title="Laporan"
      class="px-5 py-3"
    >
      <v-tabs
        v-model="tab"
        background-color="primary"
        dark
      >
        <v-tab
          v-for="item in listDivisiTab"
          :key="item.id"
          @change="handleChangeTab(item.id)"
        >
          {{ item.name_satuan_kerja }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in listDivisiTab"
          :key="item.id"
        >
          <v-card flat>
            <table-component
              :list="listUser"
              :query="listQueryUser"
              :limit="listQueryUser.page_size"
              :table-headers="tableHeader"
              :on-print-click="handlePrint"
            />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </costume-card>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  export default {
    name: 'ListReport',
    data () {
      return {
        listDivisiTab: [],
        tab: null,
        listUser: [],
        listQueryUser: {
          idDivisi: null,
          page_size: 100,
        },
        tableHeader: [
          { text: 'Email', value: 'email', sortable: false },
          { text: 'Nama Lengkap', value: 'nama_lengkap' },
          { text: 'Divisi', value: 'divisi' },
          { text: 'Jabatan', value: 'jabatan' },
          { text: 'Print', value: 'print' },
        ],
      }
    },
    async mounted () {
      await this.handleGetDivisi()
      if (this.listDivisiTab.length > 0) {
        this.listQueryUser.idDivisi = this.listDivisiTab[0].id
      }
      await this.handleSearchUser()
    },
    methods: {
      async handleChangeTab (idDivisi) {
        this.listQueryUser.idDivisi = idDivisi
        await this.handleSearchUser()
      },
      async handleGetDivisi () {
        const response = await this.$store.dispatch('divisi/getListDivisi')
        this.listDivisiTab = response.results
      },
      async handleSearchUser () {
        const response = await this.$store.dispatch('user/getListUser', this.listQueryUser)
        this.listUser = response.results
      },
      async handlePrint (item) {
        const response = await this.$store.dispatch('report/printReport', item.id)
        const fileName = `LaporanPLD_2020_${item.nama_lengkap.split(' ').join('_')}_${item.jabatan.split(' ').join('_')}.pdf`
        FileSaver.saveAs(response, fileName)
      },
    },
  }
</script>
