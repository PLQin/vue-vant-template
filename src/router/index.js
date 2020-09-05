
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

// 处理路由跳转会报错的问题
VueRouter.prototype.push = function push(...rest) {
  return originalPush.apply(this, rest).catch(err => err)
}

// 为了首屏加载快，所以首页不使用懒加载
import Home from '../views/home'

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/goods/detail',
    name: 'GoodsDetail',
    component: () => import('@/views/goods/detail/index.vue'),
    meta: {
      title: 'Goods Detail'
    }
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import('@/views/address/index.vue'),
    meta: {
      title: 'Shipping address'
    }
  },
  {
    path: '/order/confirm',
    name: 'OrderConfirm',
    component: () => import('@/views/order/confirm/index.vue'),
    meta: {
      title: 'Order Confirm'
    }
  },
  {
    path: '/order/detail',
    name: 'OrderDetail',
    component: () => import('@/views/order/detail/index.vue'),
    meta: {
      title: 'Order Details'
    }
  },
  {
    path: '/order/list',
    name: 'OrderList',
    component: () => import('@/views/order/list/index.vue'),
    meta: {
      title: 'My Orders'
    }
  },
  // 无权限页面
  {
    path: '/no-permission',
    name: 'NoPermission',
    component: () => import('@/views/error-page/no-permission'),
    meta: {
      title: '访问无权限'
    }
  },
  // 404 页面路由
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/error-page/404'),
    meta: {
      title: '页面走丢了'
    }
  }
]

const router = new VueRouter({
  routes,
  // 页面滚动行为
  scrollBehavior: () => ({ x: 0, y: 0 })
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
