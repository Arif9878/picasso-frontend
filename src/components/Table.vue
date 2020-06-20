<template>
  <v-col
    class="auto"
  >
    <v-data-table
      :key="list.length"
      :headers="headers"
      :items="list"
      :mobile-breakpoint="NaN"
      :no-data-text="$t('label.data_empty')"
      :items-per-page="limit"
      hide-default-footer
    />
  </v-col>
</template>
<script>
  export default {
    name: 'TableComponent',
  }
</script>
