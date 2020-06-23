<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title class="center">
                  Login Sapa JDS
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  id="login-form"
                  ref="form"
                  v-model="valid"
                  lazy-validation
                >
                  <v-text-field
                    id="username"
                    v-model="loginForm.username"
                    :rules="usernameRules"
                    label="Email/Username"
                    name="username"
                    append-icon="mdi-account"
                    type="text"
                    required
                  />
                  <v-text-field
                    v-model="loginForm.password"
                    :rules="passwordRules"
                    :append-icon="typePassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="typePassword ? 'password' : 'text'"
                    label="Password"
                    name="password"
                    @click:append="() => (typePassword = !typePassword)"
                    @keyup.enter.native="handleLogin"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-row>
                  <v-col>
                    <v-btn
                      color="blue"
                      block
                      @click="signInGoogle"
                    >
                      <img
                        height="30"
                        class="mr-2"
                        src="@/assets/icons8-google.svg"
                      >
                      Login With Google
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      color="primary"
                      block
                      @click="handleLogin"
                    >
                      Login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: 'LoginPage',
    props: {
      source: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        valid: true,
        typePassword: String,
        loading: false,
        loginForm: {
          username: '',
          password: '',
        },
        usernameRules: [
          v => !!v || 'Username harus diisi',
        ],
        passwordRules: [
          v => !!v || 'Password harus diisi',
          v => (v && v.length >= 5) || 'Password harus lebih dari 5 karakter',
        ],
      }
    },
    methods: {
      handleLogin () {
        if (this.$refs.form.validate()) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(async (response) => {
              await this.$router.push({ path: '/' })
              this.loading = false
            })
            .catch((e) => {
              this.loading = false
              this.$refs.form.reset()
            })
        }
      },
      signInGoogle: function () {
        Vue.googleAuth().signIn(this.onSignInSuccess, this.onSignInError)
      },
      onSignInSuccess: function (authorizationCode) {
        console.log(authorizationCode)
        const data = {
          access_token: authorizationCode,
        }
        this.$store.dispatch('user/loginSocialOauth', data).then(() => {
          this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          this.loading = false
        }).catch(() => {
          this.$store.dispatch('toast/errorToast', 'Login dengan google gagal')
          this.loading = false
        })
      },
      onSignInError: function () {
        this.$store.dispatch('toast/errorToast', 'Login dengan google gagal')
      },
    },
  }
</script>
