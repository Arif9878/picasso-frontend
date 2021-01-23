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
      :loading="isLoading"
      hide-default-footer
    >
      <template v-slot:item.holiday_date="{ item }">
        {{ formatDate(item.holiday_date) }}
      </template>
      <template v-slot:item.actions="props">
        <v-btn
          v-if="onMainDuties"
          class="mx-2"
          dark
          small
          color="primary"
          @click="onMainDuties(props.item)"
        >
          Tambah Tupoksi Jabatan
        </v-btn>
        <v-btn
          v-if="onMenuSetupClick"
          class="mx-2"
          fab
          dark
          small
          color="primary"
          @click="onMenuSetupClick(props.item)"
        >
          <v-icon dark>
            mdi-menu
          </v-icon>
        </v-btn>
        <v-btn
          v-if="onUpdateClick"
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
          v-if="onDeleteClick"
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
        <v-card-actions>
          <v-menu
            :close-on-content-click="false"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn
                fab
                dark
                small
                color="blue"
                v-on="on"
              >
                <v-icon dark>
                  mdi-printer
                </v-icon>
              </v-btn>
            </template>
            <v-card class="ma-0">
              <v-list-item @click="onPreviewPdfClick(props.item)">
                Preview
              </v-list-item>
              <v-list-item @click="onDownloadPdfClick(props.item)">
                Download
              </v-list-item>
            </v-card>
          </v-menu>
        </v-card-actions>
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
      isLoading: {
        type: Boolean,
        default: false,
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
      onMenuSetupClick: {
        type: Function,
        default: null,
      },
      onPreviewPdfClick: {
        type: Function,
        default: null,
      },
      onDownloadPdfClick: {
        type: Function,
        default: null,
      },
      onMainDuties: {
        type: Function,
        default: null,
      },
    },
    methods: {
      formatDate (date) {
        date = date ? this.$moment(date).format('DD MMMM YYYY') : '-'
        return date
      },
    },
  }
</script>
