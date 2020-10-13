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
      title="Non ASN"
      class="px-5 py-3"
    >
      <table-component
        :list="list"
        :query="listQuery"
        :limit="listQuery.page_size"
        :table-headers="tableHeader"
        :on-delete-click="handleDelete"
        :on-update-click="handleUpdate"
      />
      <pagination
        :total="totalPage"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.page_size"
        :on-next="onNext"
      />
    </costume-card>
    <dialog-form-user
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
      :store-path-delete="'user/deleteUser'"
      :id-data="idData"
    />
  </div>
</template>

<script>
  export default {
    name: 'ListUser',
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
          birth_date: '',
          join_date: '',
        },
        listQuery: {
          page_size: 10,
          page: 1,
          is_active: true,
          search: '',
        },
        tableHeader: [
          { text: 'Email', value: 'email', sortable: false },
          { text: 'Nama Lengkap', value: 'fullname' },
          { text: 'Divisi', value: 'divisi' },
          { text: 'Jabatan', value: 'jabatan' },
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
      async '$route.params' (value) {
        if (value.alumni === 'alumni') {
          this.listQuery.is_active = false
        } else {
          this.listQuery.is_active = true
        }
        await this.handleSearch()
      },
    },
    async mounted () {
      await this.handleSearch()
    },
    methods: {
      async handleSearch () {
        const response = await this.$store.dispatch('user/getListUser', this.listQuery)
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
        this.idData = item.id
        this.showDelete = true
      },
    },
  }
</script>
