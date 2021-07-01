<template>
  <v-row>
    <v-col
      cols="12"
      md="8"
    >
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
                rules="required"
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
          <v-row
            v-for="(item, index) in formBody.account_identity"
            :key="index"
          >
            <v-col
              cols="12"
              md="2"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label class="required">Jenis Nomor Identitas</label>
            </v-col>
            <v-col
              cols="12"
              md="3"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Jenis Nomor Identitas"
                rules="required"
              >
                <v-select
                  v-model="item.type_identity"
                  :items="identityNumberTypeList"
                  :error-messages="errors"
                  item-value="id_number_type"
                  item-text="id_number_type"
                  menu-props="auto"
                  solo
                />
              </validation-provider>
            </v-col>
            <v-col
              cols="12"
              md="1"
              sm="12"
              class="px-0 center py-6"
            >
              <label class="required">Nomor</label>
            </v-col>
            <v-col
              cols="12"
              md="6"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nomor Identitas"
                rules="numeric|required"
              >
                <v-text-field
                  v-model="item.number"
                  v-mask="'##################'"
                  placeholder="Nomor Identitas"
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
                  <label>Golongan Darah</label>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                  :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Golongan Darah"
                  >
                    <v-select
                      v-model="formBody.blood_type"
                      :items="listBloodType"
                      :error-messages="errors"
                      menu-props="auto"
                      solo
                    />
                  </validation-provider>
                </v-col>
              </v-row>
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
                  <label class="required">Status Pernikahan</label>
                </v-col>
                <v-col
                  cols="12"
                  md="8"
                  sm="12"
                  :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Status Pernikahan"
                    rules="required"
                  >
                    <v-radio-group
                      v-model="formBody.marital_status"
                      :error-messages="errors"
                      row
                      class="mt-0"
                    >
                      <v-radio
                        label="Belum Menikah"
                        value="Belum Menikah"
                      />
                      <v-radio
                        label="Menikah"
                        value="Menikah"
                      />
                    </v-radio-group>
                  </validation-provider>
                </v-col>
              </v-row>
            </v-col>
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
                  <label>Agama</label>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                  sm="12"
                  :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Agama"
                  >
                    <v-select
                      v-model="formBody.religion"
                      :items="listReligion"
                      :error-messages="errors"
                      menu-props="auto"
                      solo
                    />
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
              <label>NPWP</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="NPWP"
              >
                <v-text-field
                  v-model="formBody.npwp"
                  v-mask="'##.###.###.#-###.###'"
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
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label class="required">No. Telepon</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="No. Telepon"
                rules="required|numeric"
              >
                <v-text-field
                  v-model="formBody.telephone"
                  v-mask="'#############'"
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
              <label>No. Rek Bank BJB</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="No. Rek Bank BJB"
                rules="numeric"
              >
                <v-text-field
                  v-model="formBody.account_bank.bank_account_number"
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
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label>Nama Akun Bank BJB</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Nama Akun Bank BJB"
              >
                <v-text-field
                  v-model="formBody.account_bank.bank_account_name"
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
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label>Cabang Bank BJB</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Cabang Bank BJB"
              >
                <v-text-field
                  v-model="formBody.account_bank.bank_branch"
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
              <label>Tipe Menu</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Tipe Menu"
              >
                <v-select
                  v-model="formBody.menu"
                  :items="typeMenuList"
                  :error-messages="errors"
                  :return-object="false"
                  item-value="id"
                  item-text="menu_type"
                  menu-props="auto"
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
              <label>Alamat Sesuai KTP</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Alamat Saat ini"
              >
                <v-textarea
                  v-model="formBody.id_card_address"
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
              <label>Alamat Saat ini</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Alamat Saat ini"
              >
                <v-textarea
                  v-model="formBody.current_address"
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
              md="3"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label class="required">Apakah Admin ?</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Apakah Admin ?"
              >
                <v-switch
                  v-model="formBody.is_admin"
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
              md="3"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label class="required">Pegawai Aktif ?</label>
            </v-col>
            <v-col
              cols="12"
              md="9"
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
          <v-row
            v-if="!formBody.is_active"
          >
            <v-col
              cols="12"
              md="2"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label :class="formBody.is_active ? '':'required'">Tanggal Pengunduran Diri</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                name="Tanggal Pengunduran Diri"
              >
                <input-date-picker
                  :format-date="formatDateTime"
                  :date-value="formBody.resign_date"
                  :value-date.sync="formBody.resign_date"
                  :required="formBody.is_active ? false:true"
                  @changeDate="formBody.resign_date = $event"
                />
              </validation-provider>
            </v-col>
          </v-row>
          <v-row
            v-if="!formBody.is_active"
          >
            <v-col
              cols="12"
              md="2"
              sm="12"
              :class="{'center py-4': $vuetify.breakpoint.smAndDown}"
            >
              <label>Alasan Pengunduran Diri</label>
            </v-col>
            <v-col
              cols="12"
              md="10"
              sm="12"
              :class="{'py-0 pb-3': $vuetify.breakpoint.smAndDown}"
            >
              <validation-provider
                v-slot="{ errors }"
                name="Alasan Pengunduran Diri"
              >
                <v-textarea
                  v-model="formBody.reason_resignation"
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
    </v-col>
    <v-col
      cols="12"
      md="4"
      class="pt-0"
    >
      <foto-profile-user
        :photo="formBody.photo"
        :avatar-update.sync="formBody.photo"
      />
    </v-col>
  </v-row>
</template>
<script>
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { managerCategory, listReligion, listBloodType } from '@/utils/constantVariable'
  export default {
    name: 'PersonalForm',
    components: { ValidationObserver, ValidationProvider },
    props: {
      formBody: {
        type: Object,
        default: null,
      },
    },
    data () {
      return {
        show: this.showDialog,
        isLoading: false,
        divisiList: [],
        jabatanList: [],
        typeMenuList: [],
        identityNumberTypeList: [],
        managerCategory,
        listReligion,
        listBloodType,
        formatDate: 'YYYY-MM-DD',
        formatDateTime: 'YYYY-MM-DD HH:MM:SS',
        allowSpaces: [
          v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed',
        ],
      }
    },
    watch: {
      'formBody.id_divisi' (value) {
        if (value === undefined) return
        if (value) {
          this.getListJabatanByDivisi(value)
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
      await this.getListIdentityNumberType()
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
        const response = await this.$store.dispatch('jabatan/getListJabatanByDivisi', item)
        this.jabatanList = response.results
      },
      async getListMenuType () {
        const response = await this.$store.dispatch('menu/getListMenuType')
        this.typeMenuList = response.results
      },
      async getListIdentityNumberType () {
        const response = await this.$store.dispatch('user/identityNumberType')
        this.identityNumberTypeList = response.results
      },
      async handleUpdate () {
        const valid = await this.$refs.observer.validate()
        if (!valid) {
          return
        }
        this.isLoading = true
        const data = {
          id: this.formBody.id,
          body: this.formBody,
        }
        const res = await this.$store.dispatch('user/updateUser', data)
        if (!(res.status >= 400)) {
          await this.$store.dispatch('toast/successToast', 'Mengubah data berhasil')
        }
        this.isLoading = false
      },
    },
  }
</script>
