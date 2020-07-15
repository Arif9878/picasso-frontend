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
      title="Jabatan List"
      class="px-5 py-3"
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
    </costume-card>
    <dialog-form-master-jabatan
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
      :store-path-delete="'jabatan/deleteJabatan'"
      :id-data="idData"
    />
  </div>
</template>

<script>
  export default {
    name: 'ListJabatan',
    data: () => ({
      list: [],
      totalPage: 0,
      showForm: false,
      showDelete: false,
      isRefresh: false,
      isEdit: false,
      idData: null,
      form: {},
      listQuery: {
        limit: 10,
        page: 1,
      },
      tableHeader: [
        { text: 'Divisi', value: 'name_satuan_kerja', sortable: false },
        { text: 'Nama Jabatan', value: 'name_jabatan', sortable: false },
        { text: 'Deskripsi Jabatan', value: 'description' },
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
        this.handleSearch()
      },
    },
    async mounted () {
      await this.handleSearch()
    },
    methods: {
      async handleSearch () {
        const response = await this.$store.dispatch('jabatan/getListJabatan', this.listQuery)
        this.totalPage = response._meta.totalPage
        this.list = response.results
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
        this.idData = item.id
        this.showDelete = true
      },
    },
  }
</script>
