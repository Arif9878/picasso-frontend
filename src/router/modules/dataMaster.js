import Layout from '@/layout'

const dataMasterRouter = {
    path: '/master',
    component: Layout,
    meta: {
        icon: 'dashboard',
        roles: ['admin'],
    },
    children: [
      {
        path: '/master/divisi',
        component: () => import('@/views/masterData/divisi/list'),
        meta: {
            noCache: true,
        },
      },
      {
        path: '/master/jabatan',
        component: () => import('@/views/masterData/jabatan/list'),
        meta: {
            noCache: true,
        },
      },
      {
          path: '/master/project',
          component: () => import('@/views/masterData/project/list'),
          meta: {
              noCache: true,
          },
      },
      {
          path: '/master/holiday',
          component: () => import('@/views/masterData/holiday/list'),
          meta: {
              noCache: true,
          },
      },
      {
          path: '/master/menu',
          component: () => import('@/views/masterData/menu/list'),
          meta: {
              noCache: true,
          },
      },
    ],
}

export default dataMasterRouter
