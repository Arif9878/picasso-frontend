<template>
  <div class="form-divisi">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="16">
        <el-form
          ref="formDivisi"
          :model="formDivisi"
          :rules="divisiRules"
          :status-icon="true"
          label-width="210px"
          label-position="left"
        >
          <el-form-item label="Parent Divisi" class="divisiForm">
            <el-select v-model="formDivisi.parent_id" placeholder="Pilih Parent Divisi">
              <el-option
                v-for="item in listDivisi"
                :key="item.id"
                :label="item.name_satuan_kerja"
                :value="item.id"
              >
                <span>{{ item.name_satuan_kerja }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Nama Divisi" prop="name_satuan_kerja" class="divisiForm">
            <el-input v-model="formDivisi.name_satuan_kerja" type="text" />
          </el-form-item>
          <el-form-item label="Deskripsi" class="divisiForm">
            <el-input v-model="formDivisi.description" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" class="btn" @click="handleSave">Save</el-button>
            <el-button type="danger" class="btn" @click="handleCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  fetchListDivisi,
  detailDivisi,
  createDivisi,
  updateDivisi
} from '@/api/divisi'

export default {
  name: 'FormProject',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateNama = (rule, value, callback) => {
      if (!value.length > 0) {
        callback(new Error('Nama divisi tidak boleh kosong!'))
      } else {
        if (value.length < 3) {
          callback(new Error('Nama divisi minimal 3 karakter!'))
        }
        callback()
      }
    }
    return {
      listDivisi: null,
      formDivisi: {
        parent_id: '',
        name_satuan_kerja: '',
        description: ''
      },
      divisiRules: {
        name_satuan_kerja: [
          {
            required: true,
            message: 'Bidang ini tidak boleh kosong',
            trigger: 'blur'
          },
          {
            min: 3,
            trigger: 'blur',
            validator: validateNama
          }
        ]
      }
    }
  },
  mounted() {
    this.getNamaDivisi()
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.getDetail(id)
    }
  },
  methods: {
    async getNamaDivisi() {
      const response = await fetchListDivisi()
      this.listDivisi = response.results
    },
    async handleSave() {
      const valid = await this.$refs.formDivisi.validate()
      if (valid) {
        if (this.isEdit) {
          const id = this.$route.params && this.$route.params.id
          await updateDivisi(id, this.formDivisi)
        } else {
          await createDivisi(this.formDivisi)
        }
        this.$message.success('Data Divisi Berhasil dimasukkan')
        this.$router.push('/divisi')
      } else {
        this.$message.error('Data Divisi Gagal dimasukkan')
      }
      return true
    },
    async getDetail(id) {
      const response = await detailDivisi(id)
      Object.assign(this.formDivisi, response.results)
    },
    handleCancel() {
      this.$router.push('/divisi')
    }
  }
}
</script>
