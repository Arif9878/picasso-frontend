<template>
  <v-dialog
    v-model="show"
    max-width="70%"
  >
    <v-card class="pa-7">
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
              <label class="required">Email</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Email"
                rules="required|email"
              >
                <v-text-field
                  v-model="formBody.email"
                  type="email"
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
              <label class="required">Username</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Username"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.username"
                  :rules="allowSpaces"
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
              <label class="required">Nama</label>
            </v-col>
            <v-col
              cols="12"
              md="5"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nama Depan"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.first_name"
                  placeholder="Nama Depan"
                  type="text"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
            <v-col
              cols="12"
              md="5"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nama Belakang"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.last_name"
                  placeholder="Nama Belakang"
                  type="text"
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
              :class="{'center py-4': $vuetify.breakpoint. smAndDown}"
            >
              <label class="required">TTL</label>
            </v-col>
            <v-col
              cols="12"
              md="5"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint. smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Tempat Lahir"
                rules="required"
              >
                <v-text-field
                  v-model="formBody.birth_place"
                  placeholder="Tempat Lahir"
                  type="text"
                  :error-messages="errors"
                  solo
                />
              </validation-provider>
            </v-col>
            <v-col
              cols="12"
              md="5"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <input-date-picker
                :format-date="formatDate"
                :required="true"
                :date-value="formBody.birth_date"
                :value-date.sync="formBody.birth_date"
                @changeDate="formBody.birth_date = $event"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6"
              sm="12"
            >
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                  sm="12"
                  :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
                >
                  <label class="required">Jenis Kelamin</label>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                  :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Jenis Kelamin"
                    rules="required"
                  >
                    <v-radio-group
                      v-model="formBody.gender"
                      :error-messages="errors"
                      row
                      class="mt-0"
                    >
                      <v-radio
                        label="Pria"
                        value="Pria"
                      />
                      <v-radio
                        label="Wanita"
                        value="Wanita"
                      />
                    </v-radio-group>
                  </validation-provider>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="2"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label class="required">Divisi</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Divisi"
                rules="required"
              >
                <v-select
                  v-model="formBody.divisiObject"
                  :items="divisiList"
                  :error-messages="errors"
                  :return-object="true"
                  item-value="id"
                  item-text="name_satuan_kerja"
                  menu-props="auto"
                  solo
                  @change="handleChangeDivisi"
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
              <label class="required">Jabatan</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Jabatan"
                rules="required"
              >
                <v-select
                  v-model="formBody.jabatanObject"
                  :items="jabatanList"
                  :error-messages="errors"
                  :return-object="true"
                  item-value="id"
                  item-text="name_jabatan"
                  menu-props="auto"
                  solo
                  @change="handleChangeJabatan"
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
              <label>Kategori Pengelola</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Kategori Pengelola"
              >
                <v-select
                  v-model="formBody.manager_category"
                  :items="managerCategory"
                  :error-messages="errors"
                  menu-props="auto"
                  clearable
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
              <label>Tanggal Bergabung</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                name="Tanggal Bergabung"
              >
                <input-date-picker
                  :format-date="formatDateTime"
                  :date-value="formBody.join_date"
                  :value-date.sync="formBody.join_date"
                  @changeDate="formBody.join_date = $event"
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
              <label class="required">Pegawai Aktif ?</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Pegawai Aktif ?"
              >
                <v-switch
                  v-model="formBody.is_active"
                  :error-messages="errors"
                  inset
                  class="ma-0 pa-0"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              md="6"
              sm="12"
            >
              <v-btn
                class="mr-5"
                block
                @click="handleCancel"
              >
                Batal
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              md="6"
              sm="12"
            >
              <v-btn
                color="primary"
                block
                :loading="isLoading"
                @click="handleSave"
              >
                Simpan
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </validation-observer>
    </v-card>
  </v-dialog>
</template>
<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { managerCategory } from '@/utils/constantVariable'
  export default {
    name: 'DialogCreateFormUser',
    components: {
      ValidationObserver,
      ValidationProvider,
    },
    props: {
      showDialog: {
        type: Boolean,
        default: false,
      },
      formBody: {
        type: Object,
        default: null,
      },
      isEdit: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        show: this.showDialog,
        divisiList: [],
        jabatanList: [],
        typeMenuList: [],
        managerCategory,
        isLoading: false,
        formatDate: 'YYYY/MM/DD',
        formatDateTime: 'YYYY/MM/DD HH:MM:SS',
        allowSpaces: [
          v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
        ],
      }
    },
    computed: {
      dialogShowPopUp: {
        get () {
          return this.showDialog
        },
        set (val) {
          this.$emit('update:show', val)
        },
      },
    },
    watch: {
      showDialog (value) {
        this.show = value
      },
      show (value) {
        this.$emit('update:show', value)
      },
      'formBody.id_divisi' (value) {
        if (value === undefined) return
        if (value) {
          this.formBody.divisiObject = value
        }
      },
      'formBody.id_jabatan' (value) {
        if (value === undefined) return
        if (value) {
          this.formBody.jabatanObject = value
        }
      },
    },
    async mounted () {
      await this.handleGetListDivisi()
      await this.getListMenuType()
    },
    methods: {
      async handleGetListDivisi () {
        const response = await this.$store.dispatch('divisi/getListDivisi')
        this.divisiList = response.results
      },
      async handleChangeDivisi (item) {
        this.getListJabatanByDivisi(item.id)
        this.formBody.id_divisi = item.id
        this.formBody.divisi = item.name_satuan_kerja
      },
      async handleChangeJabatan (item) {
        this.formBody.id_jabatan = item.id
        this.formBody.jabatan = item.name_jabatan
      },
      async getListJabatanByDivisi (item) {
        const response = await this.$store.dispatch('jabatan/getListJabatan', { satuan_kerja_id: item })
        this.jabatanList = response.results
      },
      async getListMenuType () {
        const response = await this.$store.dispatch('menu/getListMenuType')
        this.typeMenuList = response.results
      },
      handleCancel () {
        this.$emit('update:show', false)
        this.$emit('update:form', {})
        this.$refs.observer.reset()
      },
      async handleSave () {
        const valid = await this.$refs.observer.validate()
        if (!valid) {
          return
        }
        this.isLoading = true
        try {
          if (!this.isEdit) {
            await this.$store.dispatch('user/createUser', this.formBody)
          } else {
            delete this.formBody.divisiObject
            delete this.formBody.jabatanObject
            const data = {
              id: this.formBody.id,
              body: this.formBody,
            }
            await this.$store.dispatch('user/updateUser', data)
          }
        } finally {
          this.isLoading = false
          this.$emit('update:show', false)
          this.$emit('update:refreshPage', true)
          this.$emit('update:form', {})
        }
      },
    },
  }
</script>
