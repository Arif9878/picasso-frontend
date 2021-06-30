<template>
  <div class="ma-3">
    <v-row>
      <v-col class="ma-4">
        <search
          :list-query="listQuery"
          :handle-search="handleSearch"
        />
      </v-col>
    </v-row>
    <costume-card
      icon="mdi-clipboard-text"
      title="Tipe Menu List"
      class="px-5 py-0"
      :on-add="handleAdd"
    >
      <table-component
        :list="list"
        :query="listQuery"
        :limit="listQuery.limit"
        :is-loading="isLoading"
        :table-headers="tableHeader"
        :on-delete-click="handleDelete"
        :on-update-click="handleUpdate"
        :on-menu-setup-click="handleMenuList"
      />
      <pagination
        :total="totalPage"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        :on-next="onNext"
      />
    </costume-card>
    <dialog-form-master-menu-type
      :show-dialog="showForm"
      :show.sync="showForm"
      :refresh-page.sync="isRefresh"
      :is-edit="isEdit"
      :form-body="form"
      :form.sync="form"
    />
    <dialog-delete
      :show-dialog="showDelete"
      :show.sync="showDelete"
      :refresh-page.sync="isRefresh"
      :store-path-delete="'project/deleteProject'"
      :id-data="idData"
    />
    <list-menu
      :show-dialog="showListMenu"
      :show.sync="showListMenu"
      :refresh-page.sync="isRefresh"
      :menu-type-id="menuTypeId"
      :list-menu="listMenu"
    />
  </div>
</template>

<script>
  export default {
    name: 'ListProject',
    data: () => ({
      list: [],
      totalPage: 0,
      showForm: false,
      showDelete: false,
      isLoading: false,
      isRefresh: false,
      isEdit: false,
      showListMenu: false,
      idData: null,
      form: {},
      listQuery: {
        limit: 10,
        page: 1,
      },
      listMenu: [],
      menuTypeId: null,
      tableHeader: [
        { text: 'Menu Type', value: 'menu_type', sortable: false },
        { text: 'Deskripsi Menu', value: 'description' },
        { text: 'Aksi', value: 'actions' },
      ],
    }),
    watch: {
      isRefresh (value) {
        if (value) {
          this.handleSearch()
          this.handleGetMenu(this.menuTypeId)
          this.isRefresh = false
        }
      },
      'listQuery.search' (value) {
        if ((value === undefined) && (value.length <= 2)) return
        this.listQuery.page = 1
        this.handleSearch()
      },
    },
    async mounted () {
      await this.handleSearch()
    },
    methods: {
      async handleSearch () {
        this.isLoading = true
        const response = await this.$store.dispatch('menu/getListMenuType', this.listQuery)
        this.totalPage = response._meta.totalPage
        if (response.results) {
          this.list = response.results
        }
        this.isLoading = false
      },
      async handleGetMenu (menuTypeId) {
        const params = {
          menu_type: menuTypeId,
        }
        const response = await this.$store.dispatch('menu/getListMenu', params)
        this.listMenu = response
      },
      async onNext () {
        await this.handleSearch()
      },
      handleAdd () {
        this.isEdit = false
        this.showForm = true
      },
      handleMenuList (item) {
        this.handleGetMenu(item.id)
        this.menuTypeId = item.id
        this.showListMenu = true
      },
      handleUpdate (item) {
        this.showForm = true
        this.form = item
        this.isEdit = true
      },
      handleDelete (item) {
        this.idData = item.id
        this.showDelete = true
      },
    },
  }
</script>
