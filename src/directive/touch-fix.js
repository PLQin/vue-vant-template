/**
 * Usage : <div v-touch-fix />
 * Notice : ios 设备中, 元素内的input聚焦唤起键盘导致页面被顶上去的bug
 */

export default {
  bind: (el, binding) => {
    el.scrollIntoView()
  },
  inserted: (el) => {
    el.scrollIntoView()
    const ipt = el.querySelectorAll('input')
    const ipts = ipt.length
    if (ipts) {
      for (let index = 0; index < ipts; index++) {
        const element = ipt[index]
        element.addEventListener('blur', function(event) {
          el.scrollIntoView()
        }, false)
      }
    }
  }
}
