/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const userRouter = {
  path: '/hero',
  component: Layout,
  redirect: 'noRedirect',
  name: 'DataHero',
  meta: {
    title: 'Data Hero',
    icon: 'table',
    roles: ['admin']
  },
  children: [
    {
      path: '/list',
      component: () => import('@/views/user/listUser'),
      name: 'Hero',
      meta: {
        title: 'Hero',
        icon: 'user'
      }
    },
    {
      path: '/formUser',
      component: () => import('@/views/user/formUser'),
      name: 'formUser',
      meta: {
        title: 'Tambah User'
      },
      hidden: true
    }
  ]
}
export default userRouter
