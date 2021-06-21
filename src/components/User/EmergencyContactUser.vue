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
    <dialog-form-emergency-contact
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
      :store-path-delete="'userEmergencyContact/deleteEmergencyContact'"
      :id-data="idData"
    />
  </div>
</template>
<script>
  export default {
    name: 'EmergencyContactUser',
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
          { text: 'Nama kontak darurat', value: 'emergency_contact_name', sortable: false },
          { text: 'Hubungan dengan kontak darurat', value: 'relationship_emergency_contacts' },
          { text: 'Nomor kontak darurat', value: 'emergency_contact_number' },
          { text: 'Keterangan', value: 'note' },
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
        const resp = await this.$store.dispatch('userEmergencyContact/getListEmergencyContact', this.$route.params.id)
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
