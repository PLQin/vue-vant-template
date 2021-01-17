
import Vue from 'vue'

// 扫描所有的组件
// console.log(files.keys())
// https://webpack.js.org/guides/dependency-management/#requirecontext
const files = require.context('./', true, /^\.\/[\w-_]+\/index\.(js|vue)$/)
const components = files.keys().map(key => {
  return files(key).default
})

components.forEach(component => {
  if (component.name) {
    Vue.component(component.name, component)
  }
})
