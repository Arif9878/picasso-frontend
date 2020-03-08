<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        autocomplete="on"
        label-position="left"
      >
        <img
          class="logo"
          alt="Logo sapa-jds"
          src="../../assets/img/logo_jds.png"
          style="width:80%;margin-bottom:40px"
        >

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="Username"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="Kata sandi"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>
        <el-button
          :loading="loading"
          type="primary"
          @click.native.prevent="handleLogin"
        >Masuk</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click="signInGoogle"
        >
          Sign in with Google
        </el-button>
      </el-form>

      <el-dialog title="Or connect with" :visible.sync="showDialog">
        Can not be simulated on local, so please combine you own business simulation! ! !
        <br>
        <br>
        <br>
        <social-sign />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import Vue from 'vue'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.length > 0) {
        callback(new Error('Username harus diisi'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value.length > 0) {
        callback(new Error('Kata sandi harus diisi'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.$message.error('Username atau kata sandi salah')
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    signInGoogle: function() {
      Vue.googleAuth().signIn(this.onSignInSuccess, this.onSignInError)
    },
    onSignInSuccess: function(authorizationCode) {
      const data = {
        'access_token': authorizationCode
      }
      this.$store.dispatch('user/loginSocialOauth', data).then(() => {
        this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
        this.loading = false
      }).catch(() => {
        this.$message.error('Login dengan google gagal')
        this.loading = false
      })
    },
    onSignInError: function() {
      this.$message.error('Login dengan google gagal')
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#f4f4f4;
$cursor: #000000;
$white: #ffffff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .box-card {
  width: 400px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 7%;
  border-radius: 10px;
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $bg;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $white inset !important;
        -webkit-text-fill-color: $bg !important; //$bg warna inputan
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    //background: rgba(0, 0, 0, 0.1);
    background : transparent;
    border-radius: 5px;
    border-color: #c8d2d6;
    //color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#f4f4f4;
$white:#ffffff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $light_gray;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 40px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  .logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
