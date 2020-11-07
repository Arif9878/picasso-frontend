<template>
  <div class="ma-3">
    <v-row>
      <v-col />
      <v-col>
        <div class="float-right">
          <v-btn
            color="primary"
            @click="handleAdd"
          >
            <v-icon v-text="'mdi-plus'" />
            {{ $t('add') }}
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-card>
      <v-row>
        <v-col class="ma-4">
          <search
            :list-query="listQuery"
            :handle-search="handleSearch"
          />
        </v-col>
      </v-row>
    </v-card>
    <costume-card
      icon="mdi-clipboard-text"
      title="Hari Libur List"
      class="px-5 py-3"
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
              :selected-open.sync="selectedCalender"
              :edit-form.sync="form"
            />
          </v-card>
          <v-card
            v-else
            flat
          >
            <table-component
              :list="list"
              :query="listQuery"
              :limit="listQuery.limit"
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
      isEdit: false,
      idData: null,
      form: {
        holiday_date: '',
      },
      tab: null,
      selectedCalender: false,
      listQuery: {
        limit: 10,
        page: 1,
      },
      tableHeader: [
        { text: 'Nama Hari Libur', value: 'holiday_name', sortable: false },
        { text: 'Jenis Hari Libur', value: 'holiday_type' },
        { text: 'Tanggal Hari Libur', value: 'holiday_date' },
        { text: 'Aksi', value: 'actions' },
      ],
    }),
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
      selectedCalender (value) {
        this.showForm = true
        this.isEdit = true
      },
    },
    async mounted () {
      await this.handleSearch()
    },
    methods: {
      async handleSearch () {
        if (this.tab === 'tab-1') {
          this.listQuery.limit = 100
        }
        const response = await this.$store.dispatch('holiday/getListHolidayDate', this.listQuery)
        this.totalPage = response._meta.totalPage
        if (response.results) {
          this.list = response.results
        }
      },
      async onNext () {
        await this.handleSearch()
      },
      handleAdd () {
        this.isEdit = false
        this.showForm = true
      },
      handleUpdate (item) {
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
