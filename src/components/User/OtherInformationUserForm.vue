<template>
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
          :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
        >
          <label>Hobi</label>
        </v-col>
        <v-col
          cols="12"
          md="10"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Hobbi"
          >
            <v-text-field
              v-model="formBody.hobby"
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
          :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
        >
          <label>Keahlian Yang Dimiliki</label>
        </v-col>
        <v-col
          cols="12"
          md="10"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Keahlian Yang Dimiliki"
          >
            <v-text-field
              v-model="formBody.other_skills_possessed"
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
          :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
        >
          <label>Cita-Cita</label>
        </v-col>
        <v-col
          cols="12"
          md="10"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Cita-Cita"
          >
            <v-text-field
              v-model="formBody.future_goals"
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
          :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
        >
          <label>Motto Hidup</label>
        </v-col>
        <v-col
          cols="12"
          md="10"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Motto Hidup"
          >
            <v-text-field
              v-model="formBody.life_motto"
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
          :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
        >
          <label>Makanan Favorit</label>
        </v-col>
        <v-col
          cols="12"
          md="10"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Makanan Favorit"
          >
            <v-text-field
              v-model="formBody.favorite_food"
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
          :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
        >
          <label>Minuman Favorit</label>
        </v-col>
        <v-col
          cols="12"
          md="10"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Minuman Favorit"
          >
            <v-text-field
              v-model="formBody.favorite_drink"
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
          :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
        >
          <label>Link Instagram</label>
        </v-col>
        <v-col
          cols="12"
          md="10"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Link Instagram"
            rules="isURL"
          >
            <v-text-field
              v-model="formBody.instagram"
              placeholder="https://"
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
          :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
        >
          <label>Link Facebook</label>
        </v-col>
        <v-col
          cols="12"
          md="10"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Link Facebook"
            rules="isURL"
          >
            <v-text-field
              v-model="formBody.facebook"
              placeholder="https://"
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
          :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
        >
          <label>Link Linkedin</label>
        </v-col>
        <v-col
          cols="12"
          md="10"
          sm="12"
          :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
        >
          <validation-provider
            v-slot="{ errors }"
            name="Link Linkedin"
            rules="isURL"
          >
            <v-text-field
              v-model="formBody.linkedin"
              placeholder="https://"
              :error-messages="errors"
              solo
            />
          </validation-provider>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col
          cols="12"
          md="6"
          sm="12"
        >
          <v-btn
            color="primary"
            block
            :loading="isLoading"
            @click="handleUpdate"
          >
            Simpan
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </validation-observer>
</template>
<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  export default {
    name: 'OtherInformationUserForm',
    components: { ValidationObserver, ValidationProvider },
    props: {
      formBody: {
        type: Object,
        default: null,
      },
    },
    data () {
      return {
        isLoading: false,
      }
    },
    methods: {
      async handleUpdate () {
        const valid = await this.$refs.observer.validate()
        if (!valid) {
          return
        }
        this.isLoading = true
        const data = {
          id: this.$route.params.id,
          body: this.formBody,
        }
        const resp = await this.$store.dispatch('userOtherInformation/updateUserEducation', data)
        if (resp) {
          this.isLoading = false
          await this.$store.dispatch('toast/successToast', 'Mengubah data berhasil')
        }
      },
    },
  }
</script>
