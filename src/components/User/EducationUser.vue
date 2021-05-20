<template>
  <table-component
    :list="list"
    :table-headers="tableHeader"
  />
</template>
<script>
  export default {
    name: 'EducationUser',
    data () {
      return {
        list: [],
        tableHeader: [
          { text: 'Nama Institusi Pendidikan', value: 'email', sortable: false },
          { text: 'Jurusan', value: 'fullname' },
          { text: 'Gelar Pendidikan', value: 'divisi' },
          { text: 'Tahun Lulus', value: 'jabatan' },
          { text: 'Aksi', width: 200, value: 'actions' },
        ],
      }
    },
  }
</script>
