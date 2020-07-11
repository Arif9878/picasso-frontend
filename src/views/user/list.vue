<template>
  <div class="ma-3">
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
      />
      <pagination
        :total="totalPage"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.page_size"
        :on-next="onNext"
      />
    </costume-card>
  </div>
</template>

<script>
  export default {
    name: 'ListUser',
    data () {
      return {
        list: [],
        totalPage: 0,
        listQuery: {
          page_size: 10,
          page: 1,
          search: '',
        },
        tableHeader: [
          { text: 'Email', value: 'email', sortable: false },
          { text: 'Nama Lengkap', value: 'nama_lengkap' },
          { text: 'Divisi', value: 'divisi' },
          { text: 'Jabatan', value: 'jabatan' },
          // { text: 'Aksi', value: 'actions' },
        ],
      }
    },
    watch: {
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
        const response = await this.$store.dispatch('user/getListUser', this.listQuery)
        this.totalPage = response._meta.totalPage
        this.list = response.results
      },
      async onNext () {
        await this.handleSearch()
      },
    },
  }
</script>
