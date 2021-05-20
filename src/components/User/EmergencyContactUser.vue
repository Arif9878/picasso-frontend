<template>
  <table-component
    :list="list"
    :table-headers="tableHeader"
  />
</template>
<script>
  export default {
    name: 'EmergencyContactUser',
    data () {
      return {
        list: [],
        tableHeader: [
          { text: 'Nama kontak darurat', value: 'email', sortable: false },
          { text: 'Hubungan dengan kontak darurat', value: 'fullname' },
          { text: 'Nomor kontak darurat', value: 'divisi' },
          { text: 'Aksi', width: 200, value: 'actions' },
        ],
      }
    },
  }
</script>
