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
        :table-headers="tableHeader"
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
        listQuery: {
          limit: 10,
        },
        tableHeader: [
          { text: 'Nama Jabatan', value: 'name_jabatan', sortable: false },
          { text: 'Deskripsi Jabatan', value: 'description' },
        ],
      }
    },
    async mounted () {
      const response = await this.$store.dispatch('jabatan/getListJabatan')
      this.list = response.results
    },
  }
</script>
