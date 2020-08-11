<template>
  <div class="ma-3">
    <v-card>
      <v-row class="mb-n14 ma-1">
        <v-col
          cols="12"
          sm="6"
        >
          <v-label
            class="title"
          >
            {{ $t('input_date_report') }}:
          </v-label>
          <date-picker
            :format-date="formatDate"
            :label="'Tanggal Awal'"
            :date-value="listQueryUser.start_date"
            :value-date.sync="listQueryUser.start_date"
            @changeDate="listQueryUser.start_date = $event"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <br>
          <date-picker
            :format-date="formatDate"
            :label="'Tanggal Akhir'"
            :date-value="listQueryUser.end_date"
            :value-date.sync="listQueryUser.end_date"
            @changeDate="listQueryUser.end_date = $event"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="mb-n10 ma-4">
          <search
            :list-query="listQueryUser"
            :handle-search="handleSearchUser"
          />
        </v-col>
      </v-row>
      <v-row class="ma-1">
        <v-col
          cols="12"
          sm="6"
        >
          <v-btn
            block
            color="primary"
            class="btn-search"
            @click="onSearch"
          >
            {{ $t('search') }}
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-btn
            block
            color="#4f4f4f"
            class="btn-reset"
            @click="onReset"
          >
            {{ $t('reset') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
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
          <v-row>
            <v-col>
              <v-btn
                class="float-right"
                color="primary"
                @click="handleDownloadExcel(item.id, item.name_satuan_kerja)"
              >
                {{ $t('export_excel_attendance') }}
              </v-btn>
            </v-col>
          </v-row>
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
    <loading-bar
      :loading="isLoading"
      :loading-modal.sync="isLoading"
    />
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
        isLoading: false,
        listUser: [],
        formatDate: 'DD-MM-YYYY',
        listQueryUser: {
          search: '',
          start_date: '',
          end_date: '',
          divisi: null,
          page_size: 100,
        },
        tableHeader: [
          { text: 'Nama Lengkap', value: 'fullname' },
          { text: 'Divisi', value: 'divisi' },
          { text: 'Jabatan', value: 'jabatan' },
          { text: 'Total Jam Kerja', value: 'total_hours' },
          { text: 'Total Laporan', value: 'total_report' },
          { text: 'Print', value: 'print' },
        ],
      }
    },
    watch: {
      'listQueryUser.search' (value) {
        if ((value === undefined) && (value.length <= 2)) return
        this.handleSearchUser()
      },
    },
    async mounted () {
      await this.handleGetDivisi()
      if (this.listDivisiTab.length > 0) {
        this.listQueryUser.divisi = this.listDivisiTab[0].id
      }
      await this.handleSearchUser()
    },
    methods: {
      async handleChangeTab (idDivisi) {
        this.listQueryUser.divisi = idDivisi
        await this.handleSearchUser()
      },
      async handleGetDivisi () {
        const response = await this.$store.dispatch('divisi/getListDivisi')
        this.listDivisiTab = response.results
      },
      async handleSearchUser () {
        const response = await this.$store.dispatch('report/getListReportByUser', this.listQueryUser)
        this.listUser = response
      },
      async onSearch () {
        await this.handleSearchUser()
      },
      async onReset () {
        this.listQueryUser.search = ''
        this.listQueryUser.start_date = ''
        this.listQueryUser.end_date = ''
        await this.handleSearchUser()
      },
      async handlePrint (item) {
        this.isLoading = true
        if ((this.listQueryUser.start_date.length < 1) || (this.listQueryUser.end_date.length < 1)) {
          this.$store.dispatch('toast/errorToast', 'Masukkan rentang laporan yang akan di print')
          this.isLoading = false
          return
        }
        const query = {
          userId: item.id,
          params: {
            start_date: this.listQueryUser.start_date,
            end_date: this.listQueryUser.end_date,
          },
        }
        const response = await this.$store.dispatch('report/printReport', query)
        if (response) this.isLoading = false
        const fileName = `LaporanPLD_2020_${item.fullname.split(' ').join('_')}_${item.jabatan.split(' ').join('_')}.pdf`
        FileSaver.saveAs(response, fileName)
      },
      async handleDownloadExcel (idDivisi, nameDivisi) {
        this.isLoading = true
        if ((this.listQueryUser.start_date.length < 1) || (this.listQueryUser.end_date.length < 1)) {
          this.$store.dispatch('toast/errorToast', 'Masukkan rentang laporan yang akan di print')
          this.isLoading = false
          return
        }
        const params = {
          divisi: idDivisi,
          start_date: this.listQueryUser.start_date,
          end_date: this.listQueryUser.end_date,
        }
        const response = await this.$store.dispatch('report/exportExcel', params)
        if (response) this.isLoading = false
        const fileName = `${nameDivisi.split(' ').join('_')}.xlsx`
        FileSaver.saveAs(response, fileName)
      },
    },
  }
</script>
