<template>
  <v-dialog
    v-model="show"
    max-width="70%"
  >
    <costume-card
      icon="mdi-clipboard-text"
      :title="`Tupoksi Jabatan ${detailJabatan.name_jabatan}`"
      class="px-5 py-10"
      :on-add="handleAdd"
    >
      <table-component
        :list="list"
        :query="listQuery"
        :limit="listQuery.limit"
        :table-headers="tableHeader"
        :on-delete-click="handleDelete"
        :on-update-click="handleUpdate"
      />
      <v-card-actions>
        <v-col>
          <v-btn
            class="mr-5"
            block
            color="primary"
            @click="handleCancel"
          >
            Batal
          </v-btn>
        </v-col>
      </v-card-actions>
    </costume-card>
    <dialog-form-tupoksi-jabatan
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
      :store-path-delete="'tupoksiJabatan/deleteTupoksiJabatan'"
      :id-data="idData"
    />
  </v-dialog>
</template>
<script>
  export default {
    name: 'DialogListTupoksiJabatan',
    props: {
      showDialog: {
        type: Boolean,
        default: false,
      },
      detailJabatan: {
        type: Object,
        default () {
          return {
            id: '',
            name_jabatan: '',
          }
        },
      },
    },
    data () {
      return {
        show: this.showDialog,
        list: [],
        showForm: false,
        isEdit: false,
        form: {},
        showDelete: false,
        isRefresh: false,
        idData: null,
        listQuery: {
          limit: 30,
        },
        tableHeader: [
          { text: 'Urutan Tupoksi Jabatan', value: 'sequence' },
          { text: 'Nama Tupoksi Jabatan', value: 'name_tupoksi', sortable: false },
          { text: 'Aksi', width: 300, value: 'actions' },
        ],
      }
    },
    watch: {
      detailJabatan: {
        handler: function (value) {
          if (value === undefined) return
          this.handleSearch(value.id)
        },
        deep: true,
      },
      isRefresh (value) {
        if (value) {
          this.handleSearch(this.detailJabatan.id)
          this.isRefresh = false
        }
      },
      showDialog (value) {
        this.show = value
      },
      show (value) {
        if (!value) this.$emit('update:jabatanDetail', {})
        this.$emit('update:show', value)
      },
    },
    async mounted () {
      //
    },
    methods: {
      async handleSearch (idJabatan) {
        this.listQuery.jabatan_id = idJabatan
        this.form.jabatan_id = idJabatan
        const response = await this.$store.dispatch('tupoksiJabatan/getListTupoksiJabatan', this.listQuery)
        this.totalPage = response._meta.totalPage
        if (response.results) {
          this.list = response.results
        }
      },
      handleAdd () {
        this.form.jabatan_id = this.detailJabatan.id
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
      handleCancel () {
        this.show = false
      },
    },
  }
</script>
