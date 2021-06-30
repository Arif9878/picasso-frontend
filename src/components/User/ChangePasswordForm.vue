<template>
  <v-dialog
    v-model="show"
    max-width="70%"
  >
    <v-card class="pa-7">
      <v-card-title>
        <h3 class="text-uppercase">
          Set password user
        </h3>
        <v-icon @click="show = false">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-divider />
      <validation-observer ref="observer">
        <v-form
          id="change-password-form"
          ref="form"
          lazy-validation
        >
          <v-text-field
            v-model="formBody.password"
            :rules="passwordRules"
            :append-icon="typePassword ? 'visibility' : 'visibility_off'"
            :type="typePassword ? 'password' : 'text'"
            label="Password"
            name="password"
            solo
            @click:append="() => (typePassword = !typePassword)"
          />
          <v-text-field
            v-model="formBody.repeat_password"
            :rules="repeatPasswordRules"
            :append-icon="typeRepeatPassword ? 'visibility' : 'visibility_off'"
            :type="typeRepeatPassword ? 'password' : 'text'"
            label="Konfirmasi password"
            name="repeat_password"
            solo
            @click:append="() => (typeRepeatPassword = !typeRepeatPassword)"
            @keyup.enter.native="handleChangePassword"
          />
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
                @click="handleChangePassword"
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
  import { ValidationObserver } from 'vee-validate'
  export default {
    name: 'ChangePasswordForm',
    components: { ValidationObserver },
    props: {
      showDialog: {
        type: Boolean,
        default: false,
      },
      idData: {
        type: String,
        default: null,
      },
      formBody: {
        type: Object,
        default: null,
      },
    },
    data () {
      return {
        show: this.showDialog,
        isLoading: false,
        typePassword: String,
        typeRepeatPassword: String,
        passwordRules: [
          v => !!v || 'Password baru harus diisi',
          v => (v && v.length >= 4) || 'Password baru minimal 4 karakter',
        ],
        repeatPasswordRules: [
          v => !!v || 'Konfirmasi password baru harus diisi',
          v => (v && v.length >= 4) || 'Konfirmasi password baru minimal 4 karakter',
          v => (v && v === this.formBody.password) || 'Konfirmasi password tidak sama',
        ],
      }
    },
    watch: {
      showDialog (value) {
        if (this.$refs.form) this.$refs.form.reset()
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
      handleCancel () {
        this.$emit('update:show', false)
        this.$emit('update:form', {})
        this.$refs.form.reset()
      },
      async handleChangePassword () {
        const data = {
          id: this.idData,
          body: this.formBody,
        }
        if (this.$refs.form.validate()) {
          this.isLoading = true
          this.$store.dispatch('user/changePasswordUser', data)
            .then(async (response) => {
              this.$store.dispatch('toast/successToast', response.message)
              this.$emit('update:show', false)
              this.$emit('update:refreshPage', true)
              this.$emit('update:form', {})
            })
            .catch((e) => {
              this.$store.dispatch('toast/errorToast', 'Ganti password gagal')
            })
          this.isLoading = false
        }
      },
    },
  }
</script>
