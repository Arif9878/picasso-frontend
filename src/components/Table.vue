<template>
  <v-col
    class="auto"
  >
    <v-data-table
      :key="list.length"
      :headers="tableHeaders"
      :items="list"
      :no-data-text="$t('data_empty')"
      :items-per-page="query.limit"
      hide-default-footer
    />
  </v-col>
</template>
<script>
  export default {
    name: 'TableComponent',
    props: {
      list: {
        type: Array,
        default: null,
      },
      query: {
        type: Object,
        default: null,
      },
      tableHeaders: {
        type: Array,
        default: null,
      },
    },
  }
</script>
