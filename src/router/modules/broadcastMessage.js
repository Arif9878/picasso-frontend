import Layout from '@/layout'

const broadcastMessageRouter = {
    path: '/broadcast-message',
    component: Layout,
    redirect: 'broadcast-message',
    meta: {
        icon: 'mdi-send',
        roles: ['admin'],
    },
    active: false,
    children: [{
        path: '/broadcast-message',
        component: () => import('@/views/broadcastMessage/index'),
        meta: {
            title: 'broadcast_message',
            icon: 'mdi-send',
            noCache: true,
            affix: true,
        },
    }],
}

export default broadcastMessageRouter
