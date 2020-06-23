<template>
  <table-component
    :list="list"
    :query="listQuery"
    :table-headers="tableHeader"
  />
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
          { text: '#', value: '_id', sortable: false },
        ],
      }
    },
    async mounted () {
      // const response = await this.$store.dispatch('project/getListProject')
    },
  }
</script>
