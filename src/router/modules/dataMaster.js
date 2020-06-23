import Layout from '@/layout'

const dataMasterRouter = {
    path: '/master',
    component: Layout,
    redirect: 'dashboard',
    meta: {
        icon: 'dashboard',
        roles: ['admin'],
    },
    children: [
      {
        path: '/master/divisi',
        component: () => import('@/views/underConstruction/index'),
        meta: {
            noCache: true,
        },
      },
      {
        path: '/master/jabatan',
        component: () => import('@/views/underConstruction/index'),
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
    ],
}

export default dataMasterRouter
