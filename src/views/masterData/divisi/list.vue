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
      title="Divisi List"
      class="px-5 py-0"
      :on-add="handleAdd"
    >
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
    </costume-card>
    <dialog-form-master-divisi
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
      :store-path-delete="'divisi/deleteDivisi'"
      :id-data="idData"
    />
  </div>
</template>

<script>
  export default {
    name: 'ListDivisi',
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
      listQuery: {
        limit: 10,
        page: 1,
      },
      tableHeader: [
        { text: 'Nama Divisi', value: 'name_satuan_kerja', sortable: false },
        { text: 'Deskripsi Divisi', value: 'description' },
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
    },
    async mounted () {
      await this.handleSearch()
    },
    methods: {
      async handleSearch () {
        this.isLoading = true
        const response = await this.$store.dispatch('divisi/getListDivisi', this.listQuery)
        this.totalPage = response._meta.totalPage
        if (response.results) {
          this.list = response.results
        }
        this.isLoading = false
      },
      async onNext () {
        await this.handleSearch()
      },
      handleAdd () {
        this.isEdit = false
        this.form = {}
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
