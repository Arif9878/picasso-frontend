/* eslint-disable no-tabs */
import Layout from '@/layout'

const userRouter = {
    path: '/user',
    component: Layout,
    redirect: '',
    active: false,
    children: [
		{
			path: '/user/magang',
			component: () => import('@/views/underConstruction/index'),
			meta: {
				noCache: true,
			},
		},
		{
			path: '/user/non-asn',
			component: () => import('@/views/user/list'),
			meta: {
				noCache: true,
			},
		},
		{
			path: '/user/:asn',
			component: () => import('@/views/user/list'),
			meta: {
				noCache: true,
			},
		},
		{
			path: '/user/:alumni',
			component: () => import('@/views/user/list'),
			meta: {
				noCache: true,
			},
		},
    ],
}

export default userRouter
