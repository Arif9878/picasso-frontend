<template>
  <v-dialog
    v-model="show"
    max-width="70%"
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
              <label class="required">Nama Berkas</label>
            </v-col>
            <v-col
              cols="12"
              md="9 "
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nama Berkas"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.file_name"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="3"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label>Nomor Berkas (jika ada)</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nomor Berkas"
              >
                <v-text-field
                  v-model="formBody.file_number"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="3"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label>Catatan</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Catatan"
              >
                <v-text-field
                  v-model="formBody.note"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
          </v-row>
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
                <v-btn
                  v-if="linkFile"
                  icon
                  :href="linkFile"
                  target="_blank"
                  color="blue"
                >
                  <v-icon>mdi-link-variant</v-icon> {{ linkFile }}
                </v-btn>
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
    name: 'DialogFormFileUser',
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
      linkFile: {
        get () {
          return this.formBody.file?.file || ''
        },
        set () {
          return null
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
          // eslint-disable-next-line camelcase
          formData.append('file.file_name', this.formBody?.file_name || '')
          // eslint-disable-next-line camelcase
          formData.append('file.file_number', this.formBody?.file_number || '')
          formData.append('file.note', this.formBody?.note || '')
          if (typeof this.formBody.file.file !== 'string') formData.append('file.file', this.formBody.file)
          if (!this.isEdit) {
            await this.$store.dispatch('userFiles/createUserFiles', formData)
          } else {
            this.formBody.account = this.$route.params.id
            const data = {
              id: this.formBody.id,
              body: formData,
            }
            await this.$store.dispatch('userFiles/updateUserFiles', data)
          }
        } finally {
          this.isLoading = false
          this.$emit('update:show', false)
          this.$emit('update:refreshPage', true)
          this.$emit('update:form', {})
        }
      },
      linkRedirect (value) {
        window.open(value, '_blank')
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
