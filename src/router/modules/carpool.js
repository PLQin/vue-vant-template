/** When your routing table is too long, you can split it into small modules **/
const router = [
  {
    path: '/publish-news',
    name: 'publish-news',
    component: () => import('@/views/publish-news/index.vue'),
    meta: {
      title: '发布拼车信息'
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/detail/index.vue'),
    meta: {
      title: '拼车详情'
    }
  }
]
export default router
