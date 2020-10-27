<template>
  <v-dialog
    v-model="show"
    :fullscreen="$vuetify.breakpoint.xs"
    max-width="90%"
  >
    <v-card id="cardPreview">
      <iframe
        id="pdfPreview"
        style="width:100%; height:800px;"
      />
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'DialogPreviewPdf',
    props: {
      showDialog: {
        type: Boolean,
        default: false,
      },
      pdfUrl: {
        type: String,
        default: '',
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
        this.setPdfPreview()
        this.$emit('update:show', value)
      },
    },
    async mounted () {
      this.setPdfPreview()
    },
    methods: {
      async setPdfPreview (callback) {
        await document.querySelector('#cardPreview')
        const element = await document.querySelector('#pdfPreview')
        if (element) {
          element.src = this.pdfUrl
        }
      },
    },
  }
</script>
