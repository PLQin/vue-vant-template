/** When your routing table is too long, you can split it into small modules **/
const router = [
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/user/index.vue'),
    meta: {
      permission: ['login'],
      title: '我的'
    }
  },
  {
    path: '/my-car-sharing',
    name: 'my-car-sharing',
    component: () => import('@/views/my-car-sharing/index.vue'),
    meta: {
      permission: ['login'],
      title: '我的拼车'
    }
  },
  {
    path: '/agreement/usage',
    name: 'agreement-privacy',
    component: () => import('@/views/agreement/usage/index.vue'),
    meta: {
      title: '用户协议'
    }
  },
  {
    path: '/agreement/privacy',
    name: 'agreement-privacy',
    component: () => import('@/views/agreement/privacy/index.vue'),
    meta: {
      title: '隐私政策'
    }
  }
]
export default router
