<template>
  <div class="app-container">
    <div class="filter-container">
      <search
        :value-search="listQuery"
        :handle-search="getListDivisi"
      />
      <el-button class="filter-item" type="primary" @click="handleFilter">
        Cari
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">
        Tambah
      </el-button>
    </div>

    <el-table :data="listDivisi" border stripe fit highlight-current-row>
      <el-table-column type="index" width="50" align="center" label="#" :index="getTableRowNumbering" />

      <el-table-column prop="name_parent" label="Induk Divisi" min-width="150" />

      <el-table-column prop="name_satuan_kerja" label="Nama Divisi" min-width="150" />

      <el-table-column align="center" label="Actions" min-width="150px">
        <template slot-scope="scope">
          <router-link :to="'/editDivisi/' +scope.row.id">
            <el-button type="white" size="mini">
              Edit
            </el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">
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
      @pagination="getListDivisi"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchListDivisi, removeDivisi } from '@/api/divisi'
import Search from '@/components/Search'
// import { mapGetters } from 'vuex'

export default {
  name: 'ListDivisi',
  components: {
    Pagination,
    Search
  },
  data() {
    return {
      listDivisi: [],
      total: 0,
      listQuery: {
        search: '',
        page: 1,
        limit: 10
      }
    }
  },
  mounted() {
    this.getListDivisi()
  },
  methods: {
    async getListDivisi() {
      const response = await fetchListDivisi(this.listQuery)
      this.listDivisi = response.results
    },
    async handleDelete(id) {
      try {
        await removeDivisi(id)
        await this.$message.success('Data Berhasil Dihapus')
        await this.getListDivisi()
      } catch (e) {
        this.$message.success('Data Tidak Berhasil Dihapus')
      }
    },
    handleView() {
      this.$router.push('/detailDivisi')
    },
    handleFilter() {
      this.getListDivisi()
    },
    handleCreate() {
      this.$router.push('/formDivisi')
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
.table-divisi {
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
