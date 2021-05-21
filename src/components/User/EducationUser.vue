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
    <dialog-form-user-education
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
      :store-path-delete="'userEducation/deleteUserEducation'"
      :id-data="idData"
    />
  </div>
</template>
<script>
  export default {
    name: 'EducationUser',
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
          { text: 'Nama Institusi Pendidikan', value: 'name_educational_institution', sortable: false },
          { text: 'Jurusan', value: 'majors' },
          { text: 'Gelar Pendidikan', value: 'education_degree' },
          { text: 'Tahun Lulus', value: 'graduation_year' },
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
        const resp = await this.$store.dispatch('userEducation/getListUserEducation', this.$route.params.id)
        this.list = resp.results
      },
      handleAdd () {
        this.isEdit = false
        this.form = {}
        this.showForm = true
      },
      handleUpdate (item) {
        this.isEdit = true
        this.form = item
        this.showForm = true
      },
      handleDelete (item) {
        this.idData = item.id
        this.showDelete = true
      },
    },
  }
</script>
