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
              :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
            >
              <label class="required">Nama Tipe Menu</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nama Tipe Menu"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.menu_type"
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
              :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
            >
              <label>Deskripsi Tipe Menu</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Deskripsi"
              >
                <v-textarea
                  v-model="formBody.description"
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
                :loading="isLoading"
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
  export default {
    name: 'DialogFormMasterMenuType',
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
        this.$refs.observer.reset()
      },
      async handleSave () {
        const valid = await this.$refs.observer.validate()
        this.isLoading = true
        if (!valid) {
          return
        }
        if (!this.isEdit) {
          await this.$store.dispatch('menu/createMenuType', this.formBody)
        } else {
          const data = {
            id: this.formBody.id,
            body: this.formBody,
          }
          await this.$store.dispatch('menu/updateMenuType', data)
        }
        this.$emit('update:show', false)
        this.$emit('update:refreshPage', true)
        this.$emit('update:form', {})
        this.isLoading = false
      },
    },
  }
</script>
