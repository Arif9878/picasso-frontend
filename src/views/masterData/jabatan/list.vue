<template>
  <div class="ma-3">
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
      />
      <pagination
        :total="totalPage"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :on-next="onNext"
      />
    </costume-card>
  </div>
</template>

<script>
  export default {
    name: 'ListJabatan',
    data () {
      return {
        list: [],
        totalPage: 0,
        listQuery: {
          limit: 10,
          page: 1,
        },
        tableHeader: [
          { text: 'Divisi', value: 'name_satuan_kerja', sortable: false },
          { text: 'Nama Jabatan', value: 'name_jabatan', sortable: false },
          { text: 'Deskripsi Jabatan', value: 'description' },
        ],
      }
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
    },
  }
</script>
