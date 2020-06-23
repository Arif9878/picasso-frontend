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
        :table-headers="tableHeader"
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
        listQuery: {
          limit: 10,
        },
        tableHeader: [
          { text: 'Nama Project', value: 'projectName', sortable: false },
          { text: 'Deskripsi Project', value: 'projectDescription' },
        ],
      }
    },
    async mounted () {
      const response = await this.$store.dispatch('project/getListProject')
      this.list = response.results
    },
  }
</script>
