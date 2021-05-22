<template>
  <div class="ma-3">
    <costume-card
      icon="mdi-clipboard-text"
      :title="formPersonal.fullname"
      :on-back="handleBack"
    >
      <v-tabs
        background-color="#f7fafc"
        left
      >
        <v-tab>
          Data Pegawai
        </v-tab>
        <v-tab>
          Pendidikan
        </v-tab>
        <v-tab>
          Kontak Darurat
        </v-tab>
        <v-tab>
          Info Lain
        </v-tab>
        <v-tab>
          Berkas Pegawai
        </v-tab>
        <!-- Tab Item -->
        <v-tab-item>
          <v-card
            flat
            class="pl-6"
          >
            <personal-form :form-body="formPersonal" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
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
            <other-information-user-form :form-body="formOtherPersonal" />
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <v-card flat>
            <files-user />
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
        formOtherPersonal: {},
      }
    },
    async mounted () {
      const respUser = await this.$store.dispatch('user/detailUser', this.$route.params.id)
      this.formPersonal = respUser

      const respOtherInformation = await this.$store.dispatch('userOtherInformation/getUserOtherInformation', this.$route.params.id)
      this.formOtherPersonal = respOtherInformation
    },
    methods: {
      handleBack () {
        this.$router.go(-1)
      },
    },
  }
</script>
