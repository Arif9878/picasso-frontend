import Layout from '@/layout'

const reportRouter = {
    path: '/report',
    component: Layout,
    meta: {
        icon: 'dashboard',
        roles: ['admin'],
    },
    children: [
        {
            path: '/report/monthly',
            component: () => import('@/views/report/list'),
            meta: {
                noCache: true,
            },
        },
        {
            path: '/report/spj',
            component: () => import('@/views/underConstruction/index'),
            meta: {
                noCache: true,
            },
        },
        {
            path: '/report/:koorMonthly',
            component: () => import('@/views/report/list'),
            meta: {
                noCache: true,
            },
        },
    ],
}

export default reportRouter
