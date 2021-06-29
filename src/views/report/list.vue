<template>
  <div class="ma-3">
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
        sm="4"
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
        sm="4"
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
      <v-col
        cols="12"
        sm="4"
      >
        <v-btn
          block
          color="primary"
          @click="handleDialogDownloadExcel"
        >
          {{ $t('export_excel_attendance') }}
        </v-btn>
      </v-col>
    </v-row>
    <costume-card
      icon="mdi-clipboard-text"
      title="Laporan"
      class="px-5 py-0"
    >
      <v-progress-linear
        v-if="listDivisiTab.length === 0"
        indeterminate
        color="green"
      />
      <v-tabs
        v-else
        v-model="tab"
        background-color="primary"
        :loading="isLoading"
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
              :is-loading="isLoading"
              :table-headers="tableHeader"
              :on-preview-pdf-click="handlePreviewPdf"
              :on-download-pdf-click="handleDownloadPdf"
              :on-preview-empty-days="onPreviewEmptyDays"
            />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </costume-card>
    <loading-bar
      :loading="isLoadingBar"
      :loading-modal.sync="isLoadingBar"
    />
    <dialog-download-excel
      :show-dialog="isDownloadExecl"
      :show.sync="isDownloadExecl"
      :on-export="onExport"
      :on-reset="onReset"
      :list-query="listQueryUser"
    />
    <dialog-preview-pdf
      :show-dialog="isPreviewPdf"
      :show.sync="isPreviewPdf"
      :pdf-url="previewPdf"
    />
    <dialog-preview-report-empty-day
      :show-dialog="isPreviewEmptyDays"
      :show.sync="isPreviewEmptyDays"
      :list-empty-days="listReportEmptyDays"
    />
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters,
  } from 'vuex'
  import FileSaver from 'file-saver'
  export default {
    name: 'ListReport',
    data () {
      return {
        listDivisiTab: [],
        tab: null,
        isLoading: false,
        isLoadingBar: false,
        formatDate: 'DD-MM-YYYY',
        isDownloadExecl: false,
        isPreviewPdf: false,
        isPreviewEmptyDays: false,
        previewPdf: '',
        listUser: [],
        listReportEmptyDays: [],
        listQueryUser: {
          search: '',
          start_date: '',
          end_date: '',
          id_divisi: '',
          category_export: true,
          divisi: null,
          manager_category: null,
          page_size: 100,
        },
        listQueryDivisi: {},
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
    computed: {
      ...mapState('app', {
        barColor: state => state.barColor,
        barImage: state => state.barImage,
      }),
      ...mapState('user', {
        detailUser: state => state.detailUser,
      }),
      ...mapGetters('permissions', [
        'permission_routes',
      ]),
    },
    watch: {
      'listQueryUser.search' (value) {
        if ((value === undefined) && (value.length <= 2)) return
        this.handleSearchUser()
      },
      async '$route.params' (value) {
        this.listQueryDivisi.divisi = ''
        if (value.koorMonthly === 'koorMonthly') {
          this.listQueryDivisi.search = this.detailUser.divisi
        }
        await this.handleGetDivisi()
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
        if (this.$route.params.koorMonthly === 'koorMonthly') {
          this.listQueryDivisi.search = this.detailUser.divisi
        }
        const response = await this.$store.dispatch('divisi/getListDivisi', this.listQueryDivisi)
        this.listDivisiTab = response.results
      },
      async handleSearchUser () {
        this.isLoading = true
        this.listUser = []
        const response = await this.$store.dispatch('report/getListReportByUser', this.listQueryUser)
        if (!response) return
        if (this.listQueryUser.end_date.length > 1 && this.tableHeader.length === 6) {
          this.tableHeader.push({ text: 'Keterisian Laporan', value: 'precentage_logbook_data_filling' })
        }
        this.listUser = response
        this.isLoading = false
      },
      async onSearch () {
        await this.handleSearchUser()
      },
      async onReset () {
        this.listQueryUser.search = ''
        this.listQueryUser.id_divisi = ''
        this.listQueryUser.manager_category = ''
        this.listQueryUser.start_date = ''
        this.listQueryUser.end_date = ''
        await this.handleSearchUser()
        if (this.tableHeader.length === 7) {
          this.tableHeader.pop()
        }
      },
      async handleDownloadPdf (item) {
        this.isLoadingBar = true
        if ((this.listQueryUser.start_date.length < 1) || (this.listQueryUser.end_date.length < 1)) {
          this.$store.dispatch('toast/errorToast', 'Masukkan rentang laporan yang akan di print')
          this.isLoadingBar = false
          return
        }
        const query = {
          userId: item.id,
          params: {
            start_date: this.listQueryUser.start_date,
            end_date: this.listQueryUser.end_date,
          },
        }
        const response = await this.$store.dispatch('report/downloadReportPdf', query)
        if (response) this.isLoadingBar = false
        const year = new Date().getFullYear()
        const fileName = `LaporanPLD_${year}_${item.fullname.split(' ').join('_')}_${item.jabatan.split(' ').join('_')}.pdf`
        FileSaver.saveAs(response, fileName)
      },
      async handlePreviewPdf (item) {
        this.isLoadingBar = true
        if ((this.listQueryUser.start_date.length < 1) || (this.listQueryUser.end_date.length < 1)) {
          this.$store.dispatch('toast/errorToast', 'Masukkan rentang laporan yang akan di print')
          this.isLoadingBar = false
          return
        }
        const query = {
          userId: item.id,
          params: {
            start_date: this.listQueryUser.start_date,
            end_date: this.listQueryUser.end_date,
          },
        }
        const response = await this.$store.dispatch('report/viewReportPdf', query)
        if (response) {
          this.isLoadingBar = false
          this.isPreviewPdf = true
          this.previewPdf = response
        }
      },
      handleDialogDownloadExcel () {
        this.isDownloadExecl = true
      },
      onExport () {
        this.isDownloadExecl = false
        if (this.listQueryUser.category_export) {
          this.handleDownloadExcelDivisi(this.listQueryUser.id_divisi.id, this.listQueryUser.id_divisi.name_satuan_kerja)
        } else {
          this.handleDownloadExcelManagerCategory(this.listQueryUser.manager_category)
        }
      },
      async handleDownloadExcelDivisi (idDivisi, nameDivisi) {
        this.isLoadingBar = true
        if ((this.listQueryUser.start_date.length < 1) || (this.listQueryUser.end_date.length < 1)) {
          this.$store.dispatch('toast/errorToast', 'Masukkan rentang laporan yang akan di print')
          this.isLoadingBar = false
          return
        }
        const params = {
          divisi: idDivisi,
          search: this.listQueryUser.search,
          start_date: this.listQueryUser.start_date,
          end_date: this.listQueryUser.end_date,
        }
        const response = await this.$store.dispatch('report/exportExcelByCategory', params)
        this.onReset()
        if (response) this.isLoadingBar = false
        const fileName = `${nameDivisi.split(' ').join('_')}.xlsx`
        FileSaver.saveAs(response, fileName)
      },
      async handleDownloadExcelManagerCategory (managerCategory) {
        this.isLoadingBar = true
        if ((this.listQueryUser.start_date.length < 1) || (this.listQueryUser.end_date.length < 1)) {
          this.$store.dispatch('toast/errorToast', 'Masukkan rentang laporan yang akan di print')
          this.isLoadingBar = false
          return
        }
        const params = {
          manager_category: managerCategory,
          search: this.listQueryUser.search,
          start_date: this.listQueryUser.start_date,
          end_date: this.listQueryUser.end_date,
        }
        const response = await this.$store.dispatch('report/exportExcelByCategory', params)
        this.onReset()
        if (response) this.isLoadingBar = false
        const fileName = `${managerCategory.split(' ').join('_')}.xlsx`
        FileSaver.saveAs(response, fileName)
      },
      onPreviewEmptyDays (value) {
        const blackListPrecentage = [0, 100]
        if (blackListPrecentage.includes(value.precentage_logbook_data_filling)) return
        this.isPreviewEmptyDays = !this.isPreviewEmptyDays
        this.listReportEmptyDays = value.logbook_list_empty_days
      },
    },
  }
</script>
