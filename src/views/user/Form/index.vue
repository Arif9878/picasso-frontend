<template>
  <div class="form-user">
    <el-row :gutter="20">
      <el-col :xs="24">
        <el-form
          ref="formUser"
          :model="formUser"
          :status-icon="true"
          label-width="130px"
          label-position="left"
        >
          <el-row>
            <el-col :span="6">
              <UploadPicture />
            </el-col>
            <el-col :span="18">
              <el-form-item label="NIK" class="userForm">
                <el-input type="text" />
              </el-form-item>
              <el-form-item label="Nama" class="userForm">
                <el-input v-model="formUser.nama_lengkap" type="text" />
              </el-form-item>
              <el-form-item label="Role" class="userForm">
                <el-select placeholder="Pilih Role">
                  <el-option label="" />
                </el-select>
              </el-form-item>
              <el-form-item label="Tanggal" class="userForm">
                <el-date-picker
                  type="date"
                />
              </el-form-item>
              <el-form-item label="Divisi" class="userForm">
                <el-select placeholder="Pilih Divisi">
                  <el-option
                    v-for="item in listDivisi"
                    :key="item.id"
                    :label="item.name_satuan_kerja"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="tab">
              <h2 class="title">Personal Data
              </h2>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Tempat Lahir" class="userForm">
                <el-input type="text" class="fieldForm" />
              </el-form-item>
              <el-form-item label="Tanggal Lahir" class="userForm">
                <el-date-picker
                  type="date"
                />
              </el-form-item>
              <el-form-item label="Gender" class="userForm">
                <el-radio-group>
                  <el-radio label="Laki-laki" />
                  <el-radio label="Perempuan" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Status" class="userForm">
                <el-radio-group>
                  <el-radio label="Belum Menikah" />
                  <el-radio label="Menikah" />
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Jumlah Anak" class="userForm">
                <el-input type="text" class="fieldForm" />
              </el-form-item>
              <el-form-item label="No Hp Aktif" class="userForm">
                <el-input type="text" class="fieldForm" />
              </el-form-item>
              <el-form-item label="Email" class="userForm">
                <el-input v-model="formUser.email" type="text" class="fieldForm" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Agama" class="userForm">
                <el-select placeholder="Pilih Agama">
                  <el-option label="" />
                </el-select>
              </el-form-item>
              <el-form-item label="Golongan Darah" class="userForm">
                <el-select placeholder="Pilih Golongan Darah">
                  <el-option label="" />
                </el-select>
              </el-form-item>
              <el-form-item label="Alamat Lengkap" class="userForm">
                <el-row>
                  <el-col :span="12">
                    <el-select placeholder="Pilih Provinsi" class="fieldAlamat">
                      <el-option label="" />
                    </el-select>
                    <el-select placeholder="Pilih Kecamatan" class="fieldAlamat">
                      <el-option label="" />
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-select placeholder="Pilih Kota/Kab" class="fieldAlamat">
                      <el-option label="" />
                    </el-select>
                    <el-select placeholder="Pilih Kelurahan" class="fieldAlamat">
                      <el-option label="" />
                    </el-select>
                  </el-col>
                </el-row>
                <el-row class="fieldAlamat">
                  <el-input placeholder="Alamat Lengkap" type="textarea" />
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item>
                <el-button type="success" class="btn" @click="handleSave">Save</el-button>
                <el-button type="danger" class="btn" @click="handleCancel">Cancel</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchListDivisi
} from '@/api/divisi'
import UploadPicture from './upload'

export default {
  name: 'FormUser',
  components: {
    UploadPicture
  },
  data() {
    return {
      listDivisi: null,
      formUser: {
        email: '',
        nama_lengkap: '',
        username: ''
      }
    }
  },
  mounted() {
    this.getNamaDivisi()
  },
  methods: {
    async getNamaDivisi() {
      const response = await fetchListDivisi()
      this.listDivisi = response.results
    },
    handleSave() {

    },
    handleCancel() {
      this.$router.push('/hero')
    }
  }
}
</script>

<style>
.fieldForm {
  width: 90%;
}
.fieldAlamat {
  margin-bottom: 20px;
}
</style>
