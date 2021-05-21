<template>
  <base-card
    class="v-card-profile mt-0"
    flat
    :avatar="userPhoto"
    :avatar-img.sync="userPhoto"
    :update-profile="handleAdd"
  >
    <dialog-form-change-profile
      :show-dialog="showForm"
      :show.sync="showForm"
      :refresh-page.sync="isRefresh"
      :photo-user.sync="userPhoto"
      :form-body="form"
      :form.sync="form"
    />
  </base-card>
</template>
<script>
  export default {
    name: 'FotoProfileUser',
    props: {
      photo: {
        type: String,
        default: '',
      },
    },
    data () {
      return {
        form: {},
        showForm: false,
        isRefresh: false,
        showDelete: false,
        isEdit: false,
        idData: null,
      }
    },
    computed: {
      userPhoto: {
        get () {
          return this.photo
        },
        set (val) {
          this.$emit('update:avatarUpdate', val)
        },
      },
    },
    methods: {
      handleAdd () {
        this.isEdit = false
        this.form = {}
        this.showForm = true
      },
    },
  }
</script>
<style></style>
