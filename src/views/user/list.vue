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
      title="Users"
      class="px-5 py-0"
      :on-add="handleAdd"
    >
      <table-component
        :list="list"
        :query="listQuery"
        :limit="listQuery.page_size"
        :is-loading="isLoading"
        :table-headers="tableHeader"
        :on-delete-click="handleDelete"
        :on-update-click="handleUpdate"
        :on-password-click="handlePassword"
      />
      <pagination
        :total="totalPage"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.page_size"
        :on-next="onNext"
      />
    </costume-card>
    <dialog-create-form-user
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
    <change-password-form
      :show-dialog="showChangePassword"
      :show.sync="showChangePassword"
      :id-data="idData"
      :form-body="formPassword"
      :form.sync="formPassword"
    />
  </div>
</template>

<script>
  import {
    mapState,
  } from 'vuex'
  export default {
    name: 'ListUser',
    data () {
      return {
        list: [],
        totalPage: 0,
        showForm: false,
        isEdit: false,
        isLoading: false,
        isRefresh: false,
        showDelete: false,
        showChangePassword: false,
        idData: null,
        form: {
          birth_date: null,
          join_date: null,
          resign_date: null,
        },
        formPassword: {},
        listQuery: {
          page_size: 10,
          page: 1,
          is_active: true,
          struktural: '',
          search: '',
        },
        tableHeader: [
          { text: 'Email', value: 'email', sortable: false },
          { text: 'Nama Lengkap', value: 'fullname' },
          { text: 'Divisi', value: 'divisi' },
          { text: 'Jabatan', value: 'jabatan' },
          { text: 'Aksi', width: 200, value: 'actions' },
        ],
      }
    },
    computed: {
      ...mapState('user', {
        detailUser: state => state.detailUser,
      }),
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
        this.listQuery.struktural = ''
        if (value.asn === 'asn') {
          this.listQuery.struktural = true
          this.listQuery.is_active = true
        } else if (value.asn === 'alumni') {
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
        this.isLoading = true
        this.listQuery.struktural = ''
        if (this.$route.params.asn === 'asn') {
          this.listQuery.struktural = true
          this.listQuery.is_active = true
        } else if (this.$route.params.asn === 'alumni') {
          this.listQuery.is_active = false
        } else {
          this.listQuery.is_active = true
        }
        const response = await this.$store.dispatch('user/getListUser', this.listQuery)
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
        this.form = {
          birth_date: null,
          join_date: null,
          resign_date: null,
          photo: '',
        }
        this.showForm = true
      },
      handleUpdate (item) {
        const path = `/user/detail/${item.id}`
        if (this.$route.path !== path) this.$router.push(path)
      },
      handlePassword (item) {
        this.showChangePassword = true
        this.idData = item.id
        this.formPassword = {
          password: null,
          repeat_password: null,
        }
      },
      handleDelete (item) {
        this.idData = item.id
        this.showDelete = true
      },
    },
  }
</script>
