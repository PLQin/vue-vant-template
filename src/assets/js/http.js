import axios from 'axios'
import { Toast } from 'vant'
const baseURL = window.PLATFORM_CONFIG.baseUrl

/**
 * 创建请求
 * @param {string} URL 请求地址
 */
export function createdAxios(URL) {
  var instance = axios.create()
  instance.defaults.baseURL = baseURL + URL
  instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  instance.defaults.withCredentials = true
  instance.defaults.transformRequest = [
    function(data) {
      const newData = []
      for (const k in data) {
        newData.push(encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      }
      return newData.join('&')
    }
  ]
  instance.defaults.transformResponse = [
    function(res) {
      // TODO 需要补上错误处理，参考门户平台
      // TODO 数据库里的数据，手工删除后还能找回么
      res = JSON.parse(res)
      if (res.state !== 1) {
        Toast.fail('服务器开小差了~稍后重试')
        throw Error('请求失败')
      }
      return res.data
    }
  ]
  return instance
}
/**
 * 创建请求
 * @param {string} URL 请求地址
 */
export function createdFormDataAxios(URL, params) {
  const formData = new FormData()
  for (var variable in params) {
    formData.append(variable, params[variable])
  }
  return axios.post(baseURL + URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  })
}
