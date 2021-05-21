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
              md="4"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label class="required">Nama Kontak Darurat</label>
            </v-col>
            <v-col
              cols="12"
              md="8"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nama Kontak Darurat"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.emergency_contact_name"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label class="required">Hubungan Dengan Kontak Darurat</label>
            </v-col>
            <v-col
              cols="12"
              md="8"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Hubungan Dengan Kontak Darurat"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.relationship_emergency_contacts"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="4"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label class="required">Nomor Kontak Darurat</label>
            </v-col>
            <v-col
              cols="12"
              md="8"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nomor Kontak Darurat"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.emergency_contact_number"
                  :error-messages="errors"
                  solo
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
    name: 'DialogFormEmergencyContact',
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
    },
    async mounted () {
      //
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
          if (!this.isEdit) {
            this.formBody.account = this.$route.params.id
            await this.$store.dispatch('userEmergencyContact/createEmergencyContact', this.formBody)
          } else {
            this.formBody.account = this.$route.params.id
            const data = {
              id: this.formBody.id,
              body: this.formBody,
            }
            await this.$store.dispatch('userEmergencyContact/updateEmergencyContact', data)
          }
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
