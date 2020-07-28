<template>
  <v-menu
    ref="open"
    v-model="openDatepicker"
    :close-on-content-click="false"
    min-width="290px"
    transition="scale-transition"
    offset-y
  >
    <template v-slot:activator="{ on }">
      <validation-provider
        v-slot="{ errors }"
        :rules="required ? 'required': ''"
      >
        <v-text-field
          v-model="setDate"
          :placeholder="label"
          :error-messages="errors"
          prepend-inner-icon="event"
          style="padding-bottom: 12px;"
          solo
          readonly
          v-on="on"
        />
      </validation-provider>
    </template>
    <v-date-picker
      v-model="date"
      @input="openDatepicker = false"
      @change="onChangeDate($event, 'changeDate')"
    />
  </v-menu>
</template>

<script>
  import { ValidationProvider } from 'vee-validate'

  export default {
    name: 'DatePicker',
    components: {
      ValidationProvider,
    },
    props: {
      label: {
        type: String,
        default: null,
      },
      required: {
        type: Boolean,
        default: false,
      },
      formatDate: {
        type: String,
        default: null,
      },
      dateValue: {
        type: String,
        default: null,
      },
    },
    data: () => ({
      date: null,
      openDatepicker: false,
    }),
    computed: {
      setDate: {
        // getter
        get: function () {
          return this.formatDateFunc(this.dateValue)
        },
        // setter
        set: function (newValue) {
          return this.formatDateFunc(newValue)
        },
      },
    },
    methods: {
      formatDateFunc (date) {
        if (!date) return null
        return this.$moment(date).format(this.formatDate)
      },
      onChangeDate (value, type) {
        if (value === '') {
          value = null
        }
        this.$emit(type, value)
      },
    },
  }
</script>
