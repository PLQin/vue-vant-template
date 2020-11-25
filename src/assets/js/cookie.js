/*
 * @Author: 599964870@qq.com
 * @Date: 2018-02-28 10:25:07
 * @Last Modified by: QingGuipeng
 * @Last Modified time: 2018-08-17 11:43:31
 */

/**
 * 平台标识【用于区别同一名下设置和获取不同cookie值，解决同一浏览器同一域名获取信息错乱bug】
 */
const PLATFORM_FLAG = window.PLATFORM_CONFIG.platformFlag
/**
 * 浏览器是否禁用cookie
 * @param return 返回布尔值标识是否禁用，true禁用
 */
function browserIsDisableCookie() {
  const isCookie = window.document.cookie || window.navigator.cookieEnabled
  if (!isCookie) {
    console.error('浏览器cookie被禁用')
    return false
  } else {
    return true
  }
}
export default {
  /**
   * 获取
   * @param {string} name 获取cookie名称
   * @return {string} cookie值
   */
  get: function(name) {
    if (!browserIsDisableCookie()) {
      return
    }
    const arrStr = document.cookie.split('; ')
    for (let i = 0; i < arrStr.length; i++) {
      const temp = arrStr[i].split('=')
      if (temp[0] === PLATFORM_FLAG + name) {
        if (temp[1] === undefined || temp[1] === null) {
          return null
        }
        return unescape(temp[1])
      }
    }
    return null
  },
  /**
   * 设置
   * @param {string} name 获取cookie名称
   * @param {string} value 设置cookie值
   */
  set: function(name, value) {
    if (!browserIsDisableCookie()) {
      return
    }
    if (!name || !value) {
      console.error('cookie的name或者value不能为空')
    }
    // 两分钟过时
    // let exp = new Date();
    // exp.setTime(exp.getTime() + 60 * 2000);
    document.cookie = PLATFORM_FLAG + name + '=' + escape(value) + ';path=/'
  },
  /**
   * 清除所有cookie内容
   */
  clear: function() {
    if (!browserIsDisableCookie()) {
      return
    }
    const arrStr = document.cookie.split('; ')
    for (let i = 0; i < arrStr.length; i++) {
      const temp = arrStr[i].split('=')
      const bf = PLATFORM_FLAG ? temp[0].indexOf(PLATFORM_FLAG) !== -1 : true
      if (bf) {
        // 设置过时时间
        document.cookie = temp[0] + '=0' + ';expires=' + new Date(0).toGMTString() + ';path=/'
      }
    }
  }
}
