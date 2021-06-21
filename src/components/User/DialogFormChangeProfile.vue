<template>
  <v-dialog
    v-model="show"
    max-width="30%"
  >
    <v-card class="pa-7">
      <validation-observer ref="observer">
        <v-form
          ref="form"
          lazy-validation
        >
          <v-row>
            <v-col
              cols="12"
              md="3"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label class="required">File</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="File"
                rules="required"
              >
                <v-file-input
                  v-model="formBody.file"
                  :error-messages="errors"
                  show-size
                  label="File input"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6"
              sm="12"
            >
              <v-btn
                class="mr-5"
                block
                @click="handleCancel"
              >
                Batal
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              md="6"
              sm="12"
            >
              <v-btn
                color="primary"
                block
                :loading="isLoading"
                @click="handleSave"
              >
                Simpan
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>
<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  export default {
    name: 'DialogFormChangeProfile',
    components: {
      ValidationObserver,
      ValidationProvider,
    },
    props: {
      showDialog: {
        type: Boolean,
        default: false,
      },
      formBody: {
        type: Object,
        default: null,
      },
      isEdit: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        show: this.showDialog,
        isLoading: false,
      }
    },
    computed: {
      dialogShowPopUp: {
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
      'formBody.file' () {
      },
    },
    async mounted () {
    },
    methods: {
      handleCancel () {
        this.$emit('update:show', false)
        this.$emit('update:form', {})
        this.$refs.observer.reset()
      },
      async handleSave () {
        const valid = await this.$refs.observer.validate()
        if (!valid) {
          return
        }
        this.isLoading = true
        try {
          const formData = new FormData()
          formData.append('account', this.$route.params.id)
          formData.append('photo', this.formBody.file)
          this.formBody.account = this.$route.params.id
          const resp = await this.$store.dispatch('user/updatePhotoProfile', formData)
          this.$emit('update:photoUser', resp.photo)
        } finally {
          this.isLoading = false
          this.$emit('update:show', false)
          this.$emit('update:refreshPage', true)
          this.$emit('update:form', {})
        }
      },
    },
  }
</script>
<style scoped>
.v-btn--icon.v-size--default {
    height: 0px !important;
    width: 80% !important;
}
</style>
