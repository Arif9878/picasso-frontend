<template>
  <div class="app-container">
    <div class="filter-container">
      <search
        :value-search="listQuery"
        :handle-search="getListProject"
      />
      <el-button class="filter-item" type="primary" @click="handleFilter">
        Cari
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">
        Tambah
      </el-button>
    </div>

    <el-table :data="listProject" border stripe fit highlight-current-row>
      <el-table-column type="index" width="50" align="center" label="#" :index="getTableRowNumbering" />

      <el-table-column prop="projectName" label="Nama Project" min-width="150" />

      <el-table-column prop="projectDescription" label="Deskripsi" min-width="150" />

      <el-table-column align="center" label="Actions" min-width="150px">
        <template slot-scope="scope">
          <router-link :to="'/editJabatan/' +scope.row._id">
            <el-button type="white" size="mini">
              Edit
            </el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row._id)">
            Hapus
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getListProject"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchListProject, removeProject } from '@/api/project'
import Search from '@/components/Search'
import { mapGetters } from 'vuex'

export default {
  name: 'ListProject',
  components: {
    Pagination,
    Search
  },
  data() {
    return {
      total: 0,
      listQuery: {
        search: '',
        page: 1,
        limit: 10
      }
    }
  },
  computed: {
    ...mapGetters([
      'listProject'
    ])
  },
  async mounted() {
    await this.$store.dispatch('project/getListProject', this.listQuery)
  },
  methods: {
    async getListProject() {
      const response = await fetchListProject(this.listQuery)
      this.listProject = response.results
    },
    handleEdit() {
      this.$router.push('/editProject')
    },
    async handleDelete(id) {
      try {
        await removeProject(id)
        await this.$message.success('Data Berhasil Dihapus')
        this.getListJabatan()
      } catch (e) {
        this.$message.success('Data Tidak Berhasil Dihapus')
      }
    },
    handleView() {
      this.$router.push('/detailProject')
    },
    handleFilter() {
    },
    handleCreate() {
      this.$router.push('/formProject')
    },
    getTableRowNumbering(index) {
      return ((this.listQuery.page - 1) * this.listQuery.limit) + (index + 1)
    }
  }
}
</script>

<style>
.app-container {
  overflow-x: auto;
  width: 100%;
  margin: auto;
}
.table-jabatan {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}
.filter-container {
  float: right;
  width: 200px;
}
</style>
