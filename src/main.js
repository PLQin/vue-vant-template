import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// Vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 安装基础组件
import BaseComponent from './base'
Vue.use(BaseComponent, {})

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

// 开发环境下面使用vConsole进行调试
if (process.env.NODE_ENV === 'development') {
  const VConsole = require('vconsole')
  new VConsole()
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
