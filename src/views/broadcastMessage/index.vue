<template>
  <div class="ma-3">
    <costume-card
      icon="mdi-clipboard-text"
      title="Broadcast Message"
      class="px-5 py-3"
      :on-add="handleAdd"
    >
      <table-component
        :list="list"
        :query="listQuery"
        :limit="listQuery.limit"
        :table-headers="tableHeader"
        :on-delete-click="handleDelete"
      />
      <pagination
        :total="totalPage"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :on-next="onNext"
      />
    </costume-card>
    <dialog-broadcast-message-form
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
      :store-path-delete="'broadcastMessage/deleteNotificationMessage'"
      :id-data="idData"
    />
  </div>
</template>

<script>
  export default {
    name: 'BroadcastMessage',
    data () {
      return {
        list: [],
        totalPage: 0,
        showForm: false,
        isEdit: false,
        isRefresh: false,
        showDelete: false,
        idData: null,
        form: {
          purpose_message: '',
          message: '',
        },
        listQuery: {
          limit: 10,
          page: 1,
        },
        tableHeader: [
          { text: 'Tujuan Pesan', value: 'purpose_message', sortable: false },
          { text: 'Message', value: 'message', sortable: false },
          { text: 'Aksi', value: 'actions' },
        ],
      }
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
    },
    async mounted () {
      await this.handleSearch()
    },
    methods: {
      async handleSearch () {
        const response = await this.$store.dispatch('broadcastMessage/getListNotificationMessage', this.listQuery)
        this.totalPage = response._meta.totalPage
        if (response.results) {
          this.list = response.results
        } else {
          this.list = []
        }
      },
      async onNext () {
        await this.handleSearch()
      },
      handleAdd () {
        this.isEdit = false
        this.showForm = true
      },
      handleDelete (item) {
        this.idData = item._id
        this.showDelete = true
      },
    },
  }
</script>
