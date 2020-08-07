import Vue from 'vue'

// 用于控制浏览器前进后退 使用keep-alive
// import Navigation from 'vue-navigation'

import App from './App.vue'
import store from './store'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'

// 安装基础组件
import BaseComponent from './base'
Vue.use(BaseComponent, {})
Vue.use(Vant)
// Vue.prototype.$toast

// 业务自定义组件
import '@/components/index.js'

// 时间日期
import dayjs from 'dayjs'
const dayjsUtc = require('dayjs/plugin/utc')
dayjs.extend(dayjsUtc)
Vue.prototype.$moment = dayjs

// 剪切板 ： https://github.com/Inndy/vue-clipboard2
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

Vue.config.productionTip = false

// 用于控制浏览器前进后退缓存
// Vue.use(Navigation, {
//   router,
//   store
// })

// 开发环境下面使用vConsole进行调试
if (process.env.NODE_ENV === 'development') {
  const VConsole = require('vconsole')
  new VConsole()
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
