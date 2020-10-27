import { get as getLanguage } from '@/utils/language.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

const data = {}
const Locale = [
  'en_US',
  'zh_CN',
  'th_TH'
]
const locale = Locale[0] || getLanguage()
for (let i = 0; i < Locale.length; i++) {
  data[Locale[i]] = require(`@/locales/${Locale[i]}.json`)
}

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: locale, // 语言环境中不存在相应massage键时回退到指定语言
  messages: data
})

export default i18n
