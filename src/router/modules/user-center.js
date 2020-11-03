/** When your routing table is too long, you can split it into small modules **/
const router = [
  {
    path: '/user-center',
    name: 'user-center',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '用户中心'
    }
  },
  {
    path: '/user-center/unbound-ga',
    name: 'user-center-unbound-ga',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: 'GA解绑'
    }
  },
  {
    path: '/user-center/unblock-account',
    name: 'user-center-unblock-account',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '解封帐号'
    }
  },
  {
    path: '/user-center/processed-status',
    name: 'user-center-processed-status',
    component: () => import('@/layout/index.vue'),
    meta: {
      title: '申请已受理'
    }
  }
]
export default router
