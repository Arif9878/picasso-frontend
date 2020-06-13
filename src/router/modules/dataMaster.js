/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const dataMasterRouter = {
  path: '/dataMaster',
  component: Layout,
  redirect: 'noRedirect',
  name: 'DataMaster',
  meta: {
    title: 'Data Master',
    icon: 'table',
    roles: ['admin']
  },
  children: [
    {
      path: '/divisi',
      component: () => import('@/views/dataMaster/divisi/listDivisi'),
      name: 'Divisi',
      meta: {
        title: 'Divisi',
        icon: 'table'
      }
    },
    {
      path: '/formDivisi',
      component: () => import('@/views/dataMaster/divisi/formDivisi'),
      name: 'FormDivisi',
      meta: {
        title: 'Tambah Divisi'
      },
      hidden: true
    },
    {
      path: '/editDivisi/:id',
      component: () => import('@/views/dataMaster/divisi/editDivisi'),
      name: 'EditDivisi',
      meta: {
        title: 'Edit Divisi'
      },
      hidden: true
    },
    {
      path: '/detailDivisi',
      component: () => import('@/views/dataMaster/divisi/detailDivisi'),
      name: 'DetailDivisi',
      meta: {
        title: 'Detail Divisi',
        icon: 'table'
      },
      hidden: true
    },
    {
      path: '/jabatan',
      component: () => import('@/views/dataMaster/jabatan/listJabatan'),
      name: 'Jabatan',
      meta: {
        title: 'Jabatan',
        icon: 'table'
      }
    },
    {
      path: '/formJabatan',
      component: () => import('@/views/dataMaster/jabatan/formJabatan'),
      name: 'FormJabatan',
      meta: {
        title: 'Tambah Jabatan'
      },
      hidden: true
    },
    {
      path: '/editJabatan/:id',
      component: () => import('@/views/dataMaster/jabatan/editJabatan'),
      name: 'EditJabatan',
      meta: {
        title: 'Edit Jabatan'
      },
      hidden: true
    },
    {
      path: '/detailJabatan',
      component: () => import('@/views/dataMaster/jabatan/detailJabatan'),
      name: 'DetailJabatan',
      meta: {
        title: 'Detail Jabatan'
      },
      hidden: true
    },
    {
      path: '/project',
      component: () => import('@/views/dataMaster/project/listProject'),
      name: 'Project',
      meta: {
        title: 'Project',
        icon: 'table'
      }
    }
  ]
}
export default dataMasterRouter
