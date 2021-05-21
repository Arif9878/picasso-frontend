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
              <label class="required">Nama Institusi Pendidikan</label>
            </v-col>
            <v-col
              cols="12"
              md="9 "
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nama Institusi Pendidikan"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.name_educational_institution"
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
              <label class="required">Jurusan</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Jurusan"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.majors"
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
              <label class="required">Jenjang Pendidikan</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Jenjang Pendidikan"
                rules="required"
              >
                <v-select
                  v-model="formBody.educational_level"
                  :items="listEducationLevel"
                  :error-messages="errors"
                  menu-props="auto"
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
              <label class="required">Gelar Pendidikan</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Gelar Pendidikan"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.education_degree"
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
              <label class="required">Tahun Lulus</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Tahun Lulus"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.graduation_year"
                  type="number"
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
              <label>File</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                name="File"
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
  import { listEducationLevel } from '@/utils/constantVariable'
  export default {
    name: 'DialogFormUserEducation',
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
        listEducationLevel,
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
          formData.append('name_educational_institution', this.formBody.name_educational_institution)
          formData.append('education_degree', this.formBody.education_degree)
          formData.append('educational_level', this.formBody.educational_level)
          formData.append('graduation_year', this.formBody.graduation_year)
          formData.append('majors', this.formBody.majors)
          if (typeof this.formBody.file.file !== 'string') formData.append('file.file', this.formBody.file)
          if (!this.isEdit) {
            await this.$store.dispatch('userEducation/createUserEducation', formData)
          } else {
            this.formBody.account = this.$route.params.id
            const data = {
              id: this.formBody.id,
              body: formData,
            }
            await this.$store.dispatch('userEducation/updateUserEducation', data)
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
