<template>
  <div class="LoadingBar">
    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="success"
        dark
      >
        <v-card-text>
          {{ $t('please_wait') }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'LoadingBar',
    props: {
      loading: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      loadingModal: {
        get () {
          return this.loading
        },
        set (val) {
          this.$emit('update:loadingModal', val)
        },
      },
    },
  }
</script>
