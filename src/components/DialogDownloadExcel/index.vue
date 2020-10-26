<template>
  <v-dialog
    v-model="show"
    :fullscreen="$vuetify.breakpoint.xs"
    max-width="80%"
  >
    <v-card class="pa-7">
      <v-form
        ref="form"
        lazy-validation
      >
        <v-row>
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
          >
            <label>Export Excel Berdasarkan</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <v-radio-group
              v-model="listQuery.category_export"
              row
            >
              <v-radio
                label="Divisi"
                :value="true"
              />
              <v-radio
                label="Kategori Pengelola"
                :value="false"
              />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
          >
            <label>Tanggal Awal</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <date-picker
              :format-date="formatDate"
              :label="'Tanggal Awal'"
              :date-value="listQuery.start_date"
              :value-date.sync="listQuery.start_date"
              @changeDate="listQuery.start_date = $event"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
          >
            <label>Tanggal Akhir</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <date-picker
              :format-date="formatDate"
              :label="'Tanggal Akhir'"
              :date-value="listQuery.end_date"
              :value-date.sync="listQuery.end_date"
              @changeDate="listQuery.end_date = $event"
            />
          </v-col>
        </v-row>
        <v-row
          v-if="listQuery.category_export"
        >
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
          >
            <label>Divisi</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <v-select
              v-model="listQuery.id_divisi"
              :items="divisiList"
              :return-object="true"
              item-text="name_satuan_kerja"
              menu-props="auto"
              solo
            />
          </v-col>
        </v-row>
        <v-row
          v-else
        >
          <v-col
            cols="12"
            md="3"
            sm="12"
            :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
          >
            <label>Kategori Pengelola</label>
          </v-col>
          <v-col
            cols="12"
            md="9"
            sm="12"
            :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
          >
            <v-select
              v-model="listQuery.manager_category"
              :items="managerCategory"
              menu-props="auto"
              solo
            />
          </v-col>
        </v-row>
        <v-row class="ma-1">
          <v-col
            cols="12"
            sm="6"
          >
            <v-btn
              block
              color="primary"
              @click="onExport"
            >
              {{ $t('export') }}
            </v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="6"
          >
            <v-btn
              block
              color="#4f4f4f"
              class="btn-reset"
              @click="onReset"
            >
              {{ $t('reset') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-dialog>
</template>
<script>
  import { managerCategory } from '@/utils/constantVariable'
  export default {
    name: 'DialogDownloadExcel',
    props: {
      showDialog: {
        type: Boolean,
        default: false,
      },
      listQuery: {
        type: Object,
        default: null,
      },
      onExport: {
        type: Function,
        default: null,
      },
      onReset: {
        type: Function,
        default: null,
      },
    },
    data () {
      return {
        show: this.showDialog,
        managerCategory: managerCategory,
        formatDate: 'DD-MM-YYYY',
        divisiList: [],
      }
    },
    computed: {
      dialogShowPopup: {
        get () {
          return this.showDialog
        },
        set (val) {
          this.$emit('update:show', val)
        },
      },
    },
    watch: {
      showDialog (value) {
        this.show = value
      },
      show (value) {
        this.$emit('update:show', value)
      },
    },
    async mounted () {
      await this.handleGetListDivisi()
    },
    methods: {
      async handleGetListDivisi () {
        const response = await this.$store.dispatch('divisi/getListDivisi')
        this.divisiList = response.results
      },
    },
  }
</script>
