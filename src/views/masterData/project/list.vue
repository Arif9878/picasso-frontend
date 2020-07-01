<template>
  <div class="ma-3">
    <costume-card
      icon="mdi-clipboard-text"
      title="Project List"
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
    name: 'ListProject',
    data () {
      return {
        list: [],
        totalPage: 0,
        listQuery: {
          limit: 10,
          page: 1,
        },
        tableHeader: [
          { text: 'Nama Project', value: 'projectName', sortable: false },
          { text: 'Deskripsi Project', value: 'projectDescription' },
        ],
      }
    },
    async mounted () {
      await this.handleSearch()
    },
    methods: {
      async handleSearch () {
        const response = await this.$store.dispatch('project/getListProject', this.listQuery)
        this.totalPage = response._meta.totalPage
        this.list = response.results
      },
      async onNext () {
        await this.handleSearch()
      },
    },
  }
</script>
