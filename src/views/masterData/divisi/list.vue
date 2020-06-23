<template>
  <div class="ma-3">
    <costume-card
      icon="mdi-clipboard-text"
      title="Divisi List"
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
    name: 'ListDivisi',
    data () {
      return {
        list: [],
        listQuery: {
          limit: 10,
        },
        tableHeader: [
          { text: 'Nama Divisi', value: 'name_satuan_kerja', sortable: false },
          { text: 'Deskripsi Divisi', value: 'description' },
        ],
      }
    },
    async mounted () {
      const response = await this.$store.dispatch('divisi/getListDivisi')
      this.list = response.results
    },
  }
</script>
