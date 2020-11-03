import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

// 处理路由跳转会报错的问题
VueRouter.prototype.push = function push(...rest) {
  return originalPush.apply(this, rest).catch(err => err)
}

/* Layout */
import Layout from '@/layout'

// 为了首屏加载快，所以首页不使用懒加载
import Home from '../views/home'

/* Router Modules */
import userCenter from './modules/user-center.js'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home,
        // webview项目中不要给首页添加title
        meta: { title: '', icon: '' }
      }
    ]
  },

  // 用户中心
  ...userCenter,

  {
    path: '/publish-news',
    name: 'publish-news',
    component: () => import('@/views/publish-news/index.vue'),
    meta: {
      title: '发布信息'
    }
  },
  {
    path: '/user-agreement',
    name: 'user-agreement',
    component: () => import('@/views/user-agreement/index.vue'),
    meta: {
      title: '用户协议'
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
  scrollBehavior: () => ({ x: 0, y: 0 }) // 页面滚动行为
})

// router.beforeEach((to, from, next) => {
//   // For language Settings, check out app.vue
//
//   next()
// })

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
router.afterEach((to, from) => {
  if (to.meta.title) {
    document.title = to.meta.title
  } else {
    document.title = '\u200E'
    setTimeout(() => { document.title = '\u200E' }, 100)
    setTimeout(() => { document.title = '\u200E' }, 300)
    setTimeout(() => { document.title = '\u200E' }, 600)
  }
})

export default router
