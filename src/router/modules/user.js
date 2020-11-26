/** When your routing table is too long, you can split it into small modules **/
const router = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index.vue'),
    meta: {
      title: '我的'
    }
  },
  {
    path: '/my-car-sharing',
    name: 'my-car-sharing',
    component: () => import('@/views/my-car-sharing/index.vue'),
    meta: {
      title: '我的拼车'
    }
  },
  {
    path: '/user-agreement',
    name: 'user-agreement',
    component: () => import('@/views/user-agreement/index.vue'),
    meta: {
      title: '用户协议'
    }
  }

]
export default router
