import { set as setLanguage, get as getLanguage } from '@/utils/language.js'
import { getParameterByName } from '@/utils/index.js'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

const data = {}
const Locale = [
  'en_us',
  'zh_cn',
  'th_th'
]

var locale = getParameterByName('language') || getLanguage() || Locale[0]
locale = locale.toLowerCase()

if (locale) setLanguage(locale)
for (let i = 0; i < Locale.length; i++) {
  data[Locale[i]] = require(`@/locales/${Locale[i]}.json`)
}

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: locale,
  fallbackLocale: locale, // 语言环境中不存在相应massage键时回退到指定语言
  messages: data
})

// 支持占位匹配
const regData = {}
Object.keys(data).forEach(lang => {
  const langData = data[lang]
  Object.keys(langData).forEach(key => {
    if (key.indexOf('{}') === -1) {
      return false
    }
    if (!regData[lang]) {
      regData[lang] = {}
    }
    regData[lang][key] = langData[key]
  })
})
Vue.prototype.$oriT = Vue.prototype.$t
Vue.prototype._i18n = i18n
Vue.prototype.$t = (str, ...vals) => {
  let result = ''
  const langData = regData[locale]
  if (langData) {
    for (const key of Object.keys(langData)) {
      if (!langData[key]) {
        continue
      }

      if (new RegExp(key.replace(/\{\}/g, '(.*)')).test(str)) {
        let args = str
        key.split('{}').forEach(item => {
          args = args.replace(item, '<@>')
        })
        args = args.split('<@>').filter(item => item)
        let i = 0
        langData[key].split('{}').forEach(item => {
          result += item + (args[i] || '')
          i++
        })
      }
      if (result) {
        return result
      }
    }
  }

  return Vue.prototype.$oriT(str, ...vals)
}

export default i18n
