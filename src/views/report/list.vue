<template>
  <div class="ma-3">
    <costume-card
      icon="mdi-clipboard-text"
      title="Laporan"
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
    name: 'ListReport',
    data () {
      return {
        list: [],
        listQuery: {
          limit: 10,
        },
        tableHeader: [
          { text: 'Nama Task', value: 'nameTask', sortable: false },
          { text: 'Nama Project', value: 'projectName' },
          { text: 'Tanggal Task', value: 'dateTask', type: Date },
        ],
      }
    },
    async mounted () {
      const response = await this.$store.dispatch('report/getListReport')
      this.list = response.results
    },
  }
</script>
