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
    >
      <template v-slot:item.actions="props">
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="primary"
          @click="onButtonClick(props.item)"
        >
          <v-icon dark>
            mdi-eye
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="blue"
          @click="onButtonClick(props.item)"
        >
          <v-icon dark>
            mdi-table-edit
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
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
    methods: {
      onButtonClick (item) {
        return item
      },
    },
  }
</script>
