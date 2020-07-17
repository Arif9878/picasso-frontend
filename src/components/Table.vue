<template>
  <v-col
    class="auto"
  >
    <v-data-table
      :key="list.length"
      :headers="tableHeaders"
      :items="list"
      :no-data-text="$t('data_empty')"
      :items-per-page="limit"
      hide-default-footer
    >
      <template v-slot:item.actions="props">
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="blue"
          @click="onUpdateClick(props.item)"
        >
          <v-icon dark>
            mdi-table-edit
          </v-icon>
        </v-btn>
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="red"
          @click="onDeleteClick(props.item)"
        >
          <v-icon dark>
            mdi-delete-forever
          </v-icon>
        </v-btn>
      </template>
      <template v-slot:item.print="props">
        <v-btn
          class="mx-2"
          fab
          dark
          small
          color="blue"
          @click="onPrintClick(props.item)"
        >
          <v-icon dark>
            mdi-printer
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
      limit: {
        type: Number,
        default: 0,
      },
      tableHeaders: {
        type: Array,
        default: null,
      },
      onUpdateClick: {
        type: Function,
        default: null,
      },
      onDeleteClick: {
        type: Function,
        default: null,
      },
      onPrintClick: {
        type: Function,
        default: null,
      },
    },
  }
</script>
