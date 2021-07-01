<template>
  <v-dialog
    v-model="show"
    max-width="70%"
    :fullscreen="$vuetify.mobileBreakpoint"
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
              :class="{'center py-2': $vuetify.breakpoint. smAndDown}"
            >
              <label class="required">Tanggal Hari Libur</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                name="Tanggal Hari Libur"
              >
                <input-date-picker
                  :format-date="formatDateTime"
                  :date-value="formBody.holiday_date"
                  :value-date.sync="formBody.holiday_date"
                  :required="true"
                  @changeDate="formBody.holiday_date = $event"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="3"
              sm="12"
              :class="{'center py-2': $vuetify.breakpoint. smAndDown}"
            >
              <label class="required">Jenis Hari Libur</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Jenis Hari Libur"
                rules="required"
              >
                <v-radio-group
                  v-model="formBody.holiday_type"
                  :error-messages="errors"
                >
                  <v-radio
                    v-for="n in holidayType"
                    :key="n"
                    :label="`${n}`"
                    :value="n"
                  />
                </v-radio-group>
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="3"
              sm="12"
              :class="{'center py-2': $vuetify.breakpoint. smAndDown}"
            >
              <label class="required">Nama Hari Libur</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nama Hari Libur"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.holiday_name"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-card-actions>
            <v-col>
              <v-btn
                class="mr-5"
                block
                @click="handleCancel"
              >
                Batal
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                block
                @click="handleSave"
              >
                Simpan
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>
<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { holidayType } from '@/utils/constantVariable'
  export default {
    name: 'DialogFormHoliday',
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
        formatDateTime: 'YYYY-MM-DDTHH:MM:SSZ',
        holidayType: holidayType,
      }
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
      handleCancel () {
        this.$emit('update:show', false)
        this.$emit('update:form', {})
      },
      async handleSave () {
        const valid = await this.$refs.observer.validate()
        if (!valid) {
          return
        }
        if (!this.isEdit) {
          await this.$store.dispatch('holiday/createHolidayDate', this.formBody)
        } else {
          const data = {
            id: this.formBody._id,
            body: this.formBody,
          }
          await this.$store.dispatch('holiday/updateHolidayDate', data)
        }
        this.$emit('update:show', false)
        this.$emit('update:refreshPage', true)
        // this.$emit('update:form', {})
      },
    },
  }
</script>
