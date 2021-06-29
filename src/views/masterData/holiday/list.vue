<template>
  <div class="ma-3">
    <v-row>
      <v-col class="ma-4">
        <search
          :list-query="listQuery"
          :handle-search="handleSearch"
        />
      </v-col>
    </v-row>
    <costume-card
      icon="mdi-clipboard-text"
      title="Hari Libur List"
      class="px-5 py-0"
      :on-add="handleAdd"
    >
      <v-tabs
        v-model="tab"
      >
        <v-tab href="#tab-1">
          Kalender
        </v-tab>
        <v-tab href="#tab-2">
          List
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="i in 2"
          :key="i"
          :value="'tab-' + i"
        >
          <v-card
            v-if="tab === 'tab-1'"
            flat
          >
            <calendar
              :list="list"
              :query-year="listQuery.year"
              :year.sync="listQuery.year"
              :selected-open.sync="selectedCalender"
              :edit-form.sync="form"
            />
          </v-card>
          <v-card
            v-else
            flat
          >
            <v-row class="mr-0">
              <v-col class="pa-0 pb-0">
                <div class="float-right">
                  <v-select
                    v-model="listQuery.year"
                    :items="items"
                    hide-details
                    outlined
                    label="Pilih Tahun"
                  />
                </div>
              </v-col>
            </v-row>
            <table-component
              :list="list"
              :query="listQuery"
              :limit="listQuery.limit"
              :is-loading="isLoading"
              :table-headers="tableHeader"
              :on-delete-click="handleDelete"
              :on-update-click="handleUpdate"
            />
            <pagination
              :total="totalPage"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              :on-next="onNext"
            />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </costume-card>
    <dialog-form-holiday
      :show-dialog="showForm"
      :show.sync="showForm"
      :refresh-page.sync="isRefresh"
      :is-edit="isEdit"
      :form-body="form"
      :form.sync="form"
    />
    <dialog-delete
      :show-dialog="showDelete"
      :show.sync="showDelete"
      :refresh-page.sync="isRefresh"
      :store-path-delete="'holiday/deleteHolidayDate'"
      :id-data="idData"
    />
  </div>
</template>

<script>
  export default {
    name: 'ListHoliday',
    data: () => ({
      list: [],
      totalPage: 0,
      showForm: false,
      showDelete: false,
      isRefresh: false,
      isLoading: false,
      isEdit: false,
      idData: null,
      form: {},
      tab: null,
      selectedCalender: false,
      listQuery: {
        year: '',
        limit: 10,
        page: 1,
      },
      tableHeader: [
        { text: 'Nama Hari Libur', value: 'holiday_name', sortable: false },
        { text: 'Jenis Hari Libur', value: 'holiday_type' },
        { text: 'Tanggal Hari Libur', value: 'holiday_date' },
        { text: 'Aksi', width: 150, value: 'actions' },
      ],
    }),
    computed: {
      items () {
        const year = new Date().getFullYear()
        return Array.from({ length: year - 2000 }, (value, index) => 2018 + index)
      },
    },
    watch: {
      isRefresh (value) {
        if (value) {
          this.handleSearch()
          this.isRefresh = false
        }
      },
      'listQuery.search' (value) {
        if ((value === undefined) && (value.length <= 2)) return
        this.listQuery.page = 1
        this.handleSearch()
      },
      'listQuery.year' (value) {
        this.listQuery.year = value
        this.handleSearch()
      },
      selectedCalender (value) {
        this.showForm = true
        this.isEdit = true
      },
      'form' (value) {
        console.log(value)
      },
    },
    async mounted () {
      const d = new Date()
      this.listQuery.year = d.getFullYear()
      await this.handleSearch()
    },
    methods: {
      async handleSearch () {
        this.isLoading = true
        if (this.tab === 'tab-1') {
          this.listQuery.limit = 100
        }
        const response = await this.$store.dispatch('holiday/getListHolidayDate', this.listQuery)
        this.totalPage = response._meta.totalPage
        this.list = []
        this.isLoading = false
        if (response.results) {
          this.list = response.results
        }
      },
      async onNext () {
        await this.handleSearch()
      },
      handleAdd () {
        this.isEdit = false
        this.form = {
          holiday_date: '',
        }
        this.showForm = true
      },
      handleUpdate (item) {
        console.log(item)
        this.showForm = true
        this.form = item
        this.isEdit = true
      },
      handleDelete (item) {
        this.idData = item._id
        this.showDelete = true
      },
    },
  }
</script>
