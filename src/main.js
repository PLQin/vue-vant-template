import Vue from 'vue'

// Vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

import '@/style/custom.scss'

import i18n from '@/locales/index.js'

import '@/utils/vue-click.js' // vue click

import './directive/index.js' // vue directive

import App from './App.vue'
import store from './store'
import router from './router'

// 安装基础组件
import BaseComponent from './base'
Vue.use(BaseComponent, {})

// 业务自定义组件
import '@/components/index.js'

// register global utility filters
import * as filters from './filters' // global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 时间日期
import dayjs from 'dayjs'
const dayjsUtc = require('dayjs/plugin/utc')
dayjs.locale('zh')
dayjs.extend(dayjsUtc)
Vue.prototype.$moment = dayjs

// 剪切板 ： https://github.com/Inndy/vue-clipboard2
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// 开发环境下面使用vConsole进行调试
if (process.env.VUE_APP_ENV_SIGN !== 'production') {
  const VConsole = require('vconsole')
  new VConsole()

  console.log(`--------> process.env`, process.env)
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
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
