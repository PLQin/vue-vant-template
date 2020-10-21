import Vue from 'vue'

/**
 * `@click` 事件防抖/节流
 * https://forum.vuejs.org/t/vue-click-debounce/64492/5
 */
(function() {
  const on = Vue.prototype.$on
  Vue.prototype.$on = function(event, func) {
    let previous = -1
    let newFunc = func
    if (event === 'click') {
      newFunc = function() {
        const now = new Date().getTime()
        if (previous + 700 <= now) {
          func.apply(this, arguments)
          previous = now
        }
      }
    }
    on.call(this, event, newFunc)
  }
})()

