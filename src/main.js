import Vue from 'vue'

// Vant
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/style/variables.scss'
Vue.use(Vant)

import App from './App.vue'
import store from './store'
import router from './router'

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

// 初始化clientId
if (!store.getters.clientId) {
  let clientId = (new Date().getTime() + '' + Math.round(Math.random() * 100))
  clientId = clientId.substr(clientId.length - 10, clientId.length - 1)
  store.dispatch('client/setClientId', clientId)
  console.log('初始化设备ID', clientId)
} else {
  console.log('设备ID', store.getters.clientId)
}
Vue.prototype.$clientId = store.getters.clientId

import { Locale } from 'vant'
import enUS from 'vant/lib/locale/lang/en-US'
Locale.use('en-US', enUS)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
