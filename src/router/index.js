import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

// 为了首屏加载快，所以首页不使用懒加载
import Home from '../views/home'

/* Router Modules */
import carpool from './modules/carpool.js'
import user from './modules/user.js'

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
    permission:  ['login']       permission control, if you do not log in, it will jump to '/'.
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
        // webview项目中最好不要给首页写死title，最好通过接口或者配置调用获得最新的title
        meta: { title: '', icon: '' }
      }
    ]
  },

  // 拼车信息
  ...carpool,

  // 我的信息/ 用户中心
  ...user,

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
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
  // mode: 'history', // router.vuejs.org/zh/guide/essentials/history-mode.html
  // scrollBehavior: () => ({ x: 0, y: 0 }), // 页面滚动行为不再被默认支持， 见：https://github.com/vuejs/vue-router/issues/675
  routes
})

router.beforeEach((to, from, next) => {
  if (router.history.list) {
    router.history.list.push(to)
  } else {
    router.history.list = [to]
  }
  store.commit('history/SET_LIST', to)

  document.body.scrollTop = 0
  next()
})

// https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
router.afterEach((to, from) => {
  if (to.meta.title) {
    // 在 src\locales\index.js 中已针对 document.title 进行了国际化的处理
  } else {
    document.title = '\u200E'
    setTimeout(() => { document.title = '\u200E' }, 100)
    setTimeout(() => { document.title = '\u200E' }, 300)
    setTimeout(() => { document.title = '\u200E' }, 600)
  }
})

export default router
