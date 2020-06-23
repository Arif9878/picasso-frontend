import Layout from '@/layout'

const userRouter = {
    path: '/',
    component: Layout,
    redirect: 'user',
    active: false,
    children: [{
        path: '/user',
        component: () => import('@/views/user/list'),
    }],
}

export default userRouter
