import Layout from '@/layout'

const dashboardRouter = {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    meta: {
        icon: 'dashboard',
        roles: ['superadmin'],
    },
    active: false,
    children: [{
        path: '/',
        component: () => import('@/views/dashboard/index'),
        meta: {
            title: 'dashboard',
            icon: 'dashboard',
            noCache: true,
            affix: true,
        },
    }],
}

export default dashboardRouter
