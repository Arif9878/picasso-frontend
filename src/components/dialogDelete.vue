<template>
  <v-row
    justify="center"
    class="dialog-delete"
  >
    <v-dialog
      v-model="show"
      max-width="340px"
    >
      <v-card>
        <v-card-text
          class="text-center font-weight-bold"
        >
          {{ $t('delete_dialog') }}
        </v-card-text>
        <v-card-actions
          class="justify-center"
          style="padding: 2rem"
        >
          <v-btn
            color="grey"
            outlined
            style="height: 40px;min-width: 120px;"
            @click="show = false"
          >
            {{ $t('canceled') }}
          </v-btn>
          <v-btn
            color="red"
            outlined
            style="height: 40px;min-width: 120px;"
            @click="deleteData"
          >
            {{ $t('deleted') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    name: 'DialogDelete',
    props: {
      showDialog: {
        type: Boolean,
        default: false,
      },
      storePathDelete: {
        type: String,
        default: null,
      },
      idData: {
        type: String,
        default: null,
      },
    },
    computed: {
      show: {
        get () {
          return this.showDialog
        },
        set (val) {
          this.$emit('update:show', val)
        },
      },
    },
    methods: {
      async deleteData () {
        await this.$store.dispatch(this.storePathDelete, this.idData)
        await this.$emit('update:show', false)
        await this.$emit('update:idData', null)
        await this.$emit('update:refreshPage', true)
      },
    },
  }
</script>
