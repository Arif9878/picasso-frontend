<template>
  <v-snackbar
    v-model="isShow"
    class="v-snackbar--material"
    :color="color"
    :top="top"
    dark
  >
    <v-row>
      <v-col class="auto">
        <v-icon
          color="white"
          class="mr-3"
        >
          mdi-bell-plus
        </v-icon>
      </v-col>
      <v-col
        cols="12"
        sm="8"
      >
        <div>{{ message }}</div>
      </v-col>
      <v-col class="auto">
        <v-icon
          size="16"
          class="icon-close-toast"
          @click="closeToast"
        >
          mdi-close-circle
        </v-icon>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'ToastNotification',
    data: () => ({
      top: true,
    }),
    computed: {
      ...mapGetters({
        show: 'toast/show',
        color: 'toast/color',
        message: 'toast/message',
      }),
      isShow: {
        set (show) {
          this.$store.dispatch('toast/inactiveToast')
        },
        get () {
          return this.show
        },
      },
    },
    methods: {
      closeToast () {
        this.$store.dispatch('toast/inactiveToast')
      },
    },
  }
</script>

<style lang="sass">
  .v-alert--material
    margin-top: 32px

    .v-alert__icon
      top: -36px

    .v-alert__dismissible
      align-self: flex-start
      margin: 0 !important
      padding: 0 !important
</style>
