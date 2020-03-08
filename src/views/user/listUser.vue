<template>
  <div class="app-container">
    <div class="filter-container">
      <search
        :value-search="listQuery"
        :handle-search="getListUser"
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

      <el-table-column prop="email" label="Email" min-width="150" />

      <el-table-column prop="username" label="Username" min-width="150" />

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
      @pagination="getListUser"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { fetchListUser } from '@/api/user'
import Search from '@/components/Search'
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
    this.getListUser()
  },
  methods: {
    async getListUser() {
      const response = await fetchListUser(this.listQuery)
      this.listDivisi = response.results
    },
    async handleDelete(id) {
      try {
        await this.$message.success('Data Berhasil Dihapus')
        await this.getListUser()
      } catch (e) {
        this.$message.success('Data Tidak Berhasil Dihapus')
      }
    },
    handleView() {
      this.$router.push('/detailDivisi')
    },
    handleFilter() {
      this.getListUser()
    },
    handleCreate() {
      this.$router.push('/formUser')
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
