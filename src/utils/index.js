
/**
 * 脱敏手机号
 *
 * @param number tel
 * @returns string tel
 */
export function dataDesensitization(tel = '') {
  var len = tel.length
  if (len && len > 4) {
    return tel.substring(0, 3) + '****' + tel.substring(len - 4, len)
  }
}

/**
 * 判断是否是微信
 *
 * @returns boolean
 */
export function isWeixin() {
  var ua = navigator.userAgent.toLowerCase()
  return ua.search(/MicroMessenger/i) !== -1
}

/**
 * 判断是移动设备还是还是web
 *
 * @returns boolean
 */
export function isDevice() {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.search(/iPhone\sOS/i) !== -1 || ua.search(/iPad/i) !== -1) { // ios
    return 'iOS'
  }
  if (ua.search(/Android/i) !== -1) {
    return 'Android'
  }
  return 'Web'
}

/**
 * 缓动算法 | 平滑滚动
 * https://www.zhangxinxu.com/wordpress/2017/01/share-a-animation-algorithm-js/
 * @param A 起始位置；
 * @param B 目标位置；
 * @param rate 缓动速率；
 * @param rate callback 变化的位置回调，支持两个参数，value和isEnding，表示当前的位置值（数值）以及是否动画结束了（布尔值）；
 *
 */
export function easeout(A, B, rate, callback = () => {}) {
  if (A === B || typeof A !== 'number') {
    return
  }
  B = B || 0
  rate = rate || 2

  var step = function() {
    A = A + (B - A) / rate
    if (A < 1) {
      callback(B, true)
      return
    }
    callback(A, false)
    requestAnimationFrame(step)
  }
  step()
}
