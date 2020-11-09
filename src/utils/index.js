
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
export function getDevice() {
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
export function easeout(A, B, rate, callback = () => { }) {
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

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 将以base64的图片url数据转换为Blob
 * https://www.jianshu.com/p/e45984306df4
 * @param base64Data
 */
export function convertBase64UrlToBlob(base64Data) {
  // 如果包含data:image/png;base64,串，需要去掉url的头，并转换为byte
  var bd = base64Data.includes(';base64,') ? (base64Data.split(',')[1]) : base64Data
  var bytes = window.atob(bd) // 去掉url的头，并转换为byte
  // 处理异常,将ascii码小于0的转换为大于0
  var ab = new ArrayBuffer(bytes.length)
  var ia = new Uint8Array(ab)
  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }

  return new File([ab], `${Date.now()}.png`, {
    type: 'image/png'
  })
}
