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
              md="2"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
            >
              <label class="required">Nama Menu</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nama Menu"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.title"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="2"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
            >
              <label>Icon Menu</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Icon Menu"
              >
                <v-text-field
                  v-model="formBody.icon"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="2"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
            >
              <label class="required">Url Menu</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Url Menu"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.furl"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="2"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
            >
              <label class="required">Urutan Menu</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Urutan Menu"
                rules="required"
              >
                <v-text-field
                  v-model.number="formBody.seq"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="2"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
            >
              <label>Menu Aktif ?</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Menu Aktif ?"
              >
                <v-switch
                  v-model="formBody.enable"
                  :error-messages="errors"
                  inset
                  class="ma-0 pa-0"
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
  export default {
    name: 'DialogFormMasterMenu',
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
      }
    },
    computed: {
      dialshowgPopup: {
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
        if (!this.isEdit) {
          await this.$store.dispatch('menu/createMenu', this.formBody)
        }
        this.$emit('update:show', false)
        this.$emit('update:refreshPage', true)
        this.$emit('update:form', {})
      },
    },
  }
</script>
