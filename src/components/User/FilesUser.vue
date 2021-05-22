<template>
  <div>
    <table-component
      :list="list"
      :limit="100"
      :on-delete-click="handleDelete"
      :on-update-click="handleUpdate"
      :table-headers="tableHeader"
    />
    <v-row>
      <v-spacer />
      <v-col
        cols="12"
        md="3"
        sm="12"
      >
        <v-btn
          color="primary"
          block
          @click="handleAdd"
        >
          Tambah
        </v-btn>
      </v-col>
    </v-row>
    <dialog-form-file-user
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
      :store-path-delete="'userFiles/deleteUserFiles'"
      :id-data="idData"
    />
  </div>
</template>
<script>
  export default {
    name: 'FilesUser',
    data () {
      return {
        list: [],
        form: {},
        showForm: false,
        isRefresh: false,
        showDelete: false,
        isEdit: false,
        idData: null,
        tableHeader: [
          { text: 'Nama Berkas', value: 'file.file_name', sortable: false },
          { text: 'Nomor Berkas', value: 'file.file_number' },
          { text: 'Catatan', value: 'file.note' },
          { text: 'Link File', value: 'file' },
          { text: 'Aksi', width: 200, value: 'actions' },
        ],
      }
    },
    watch: {
      isRefresh (value) {
        if (value) {
          this.handleGetList()
          this.isRefresh = false
        }
      },
    },
    mounted () {
      this.handleGetList()
    },
    methods: {
      async handleGetList () {
        const resp = await this.$store.dispatch('userFiles/getListUserFiles', this.$route.params.id)
        this.list = resp.results
      },
      handleAdd () {
        this.isEdit = false
        this.form = {}
        this.showForm = true
      },
      handleUpdate (item) {
        this.isEdit = true
        this.form = {
          id: item.id,
          file_name: item.file.file_name,
          file_number: item.file.file_number,
          note: item.file.note,
          file: item.file,
        }
        this.showForm = true
      },
      handleDelete (item) {
        this.idData = item.id
        this.showDelete = true
      },
    },
  }
</script>
