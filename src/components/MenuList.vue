<template>
  <v-dialog
    v-model="show"
    max-width="70%"
  >
    <v-card
      class="mx-auto"
    >
      <v-container>
        <v-row>
          <v-col>
            <h2 class="ml-12">
              List Menu
            </h2>
          </v-col>
          <v-col>
            <div class="float-right">
              <v-btn
                color="primary"
                @click="handleAddMenu"
              >
                <v-icon v-text="'mdi-plus'" />
                Tambah Menu
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <v-card-text class="px-5">
        <v-treeview
          :items="listMenu"
        >
          <template v-slot:prepend="{ item }">
            <v-icon
              v-if="item.icon"
              v-text="`${item.icon}`"
            />
            {{ item.title }}
          </template>
          <template v-slot:append="{ item }">
            <v-btn
              v-if="item.children"
              color="primary"
              class="mr-2"
              fab
              dark
              small
              @click="handleAddChildrenMenu(item.id)"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
              color="red"
              fab
              dark
              small
              @click="handleAddDeleteMenu(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-treeview>
      </v-card-text>
      <dialog-form-master-menu
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
        :store-path-delete="'menu/deleteMenu'"
        :id-data="idData"
      />
    </v-card>
  </v-dialog>
</template>
<script>
  export default {
    name: 'ListMenu',
    props: {
      listMenu: {
        type: Array,
        default: null,
      },
      menuTypeId: {
        type: Number,
        default: null,
      },
      showDialog: {
        type: Boolean,
        default: false,
      },
    },
    data () {
      return {
        show: this.showDialog,
        isRefresh: false,
        showForm: false,
        isEdit: false,
        showDelete: false,
        idData: '',
        form: {},
      }
    },
    computed: {
      dialshowgPopup: {
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
      menuTypeId (val) {
        console.log(val)
      },
      isRefresh (value) {
        if (value) {
          this.$emit('update:refreshPage', true)
          this.isRefresh = false
        }
      },
    },
    methods: {
      handleCancel () {
        this.$emit('update:show', false)
      },
      handleAddMenu () {
        this.form.menu_type = this.menuTypeId
        this.form.parent = null
        this.showForm = true
      },
      handleAddChildrenMenu (id) {
        this.form.menu_type = this.menuTypeId
        this.form.parent = id
        this.showForm = true
      },
      handleAddDeleteMenu (item) {
        this.idData = item.id
        this.showDelete = true
      },
    },
  }
</script>
