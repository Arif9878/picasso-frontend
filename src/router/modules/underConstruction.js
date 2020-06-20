import Layout from '@/layout'

const underConstructionRouter = {
    path: '/under/',
    component: Layout,
    redirect: 'dashboard',
    meta: {
        icon: 'dashboard',
        roles: ['superadmin'],
    },
    active: false,
    children: [{
        path: '/under/construction',
        component: () => import('@/views/underConstruction/index'),
        meta: {
            title: 'dashboard',
            icon: 'dashboard',
            noCache: true,
            affix: true,
        },
    }],
}

export default underConstructionRouter
