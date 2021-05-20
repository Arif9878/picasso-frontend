<template>
  <div class="ma-3">
    <costume-card
      icon="mdi-clipboard-text"
      title="Detail User"
      :on-back="handleBack"
    >
      <v-tabs
        vertical
        background-color="#f7fafc"
        left
      >
        <v-tab>
          Personal
        </v-tab>
        <v-tab>
          Education
        </v-tab>
        <v-tab>
          Emergency Contact
        </v-tab>
        <v-tab>
          Other Information
        </v-tab>
        <v-tab>
          Files
        </v-tab>
        <!-- Tab Item -->
        <v-tab-item>
          <v-card
            class="px-2 mt-0"
          >
            <personal-form :form-body="formPersonal" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card>
            <education-user />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <emergency-contact-user />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            Other file
          </v-card>
        </v-tab-item>
      </v-tabs>
    </costume-card>
  </div>
</template>
<script>
  export default {
    name: 'DetailUser',
    data () {
      return {
        formPersonal: {},
      }
    },
    async mounted () {
      const resp = await this.$store.dispatch('user/detailUser', this.$route.params.id)
      this.formPersonal = resp
    },
    methods: {
      handleBack () {
        this.$router.go(-1)
      },
    },
  }
</script>
