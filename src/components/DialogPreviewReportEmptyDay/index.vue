<template>
  <v-dialog
    v-model="show"
    :fullscreen="$vuetify.breakpoint.xs"
    max-width="20%"
  >
    <v-card
      class="mx-auto"
    >
      <v-card-text class="py-2">
        <div class="text-center font-weight-black">
          Daftar hari laporan kosong
        </div>
      </v-card-text>
      <v-list-item
        v-for="(item, i) in listEmptyDays"
        :key="i"
      >
        <v-list-item-content>
          <v-list-item-title class="text-center">
            {{ i+1 }}. {{ item }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'DialogPreviewReportEmptyDay',
    props: {
      showDialog: {
        type: Boolean,
        default: false,
      },
      listEmptyDays: {
        type: Array,
        default: () => [],
      },
    },
    data () {
      return {
        show: this.showDialog,
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
    methods: {
      //
    },
  }
</script>
