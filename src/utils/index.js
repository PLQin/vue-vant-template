
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
