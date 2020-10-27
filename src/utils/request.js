import { get as getLanguage } from '@/utils/language.js'
import axios from 'axios'
import Vue from 'vue'
import { Toast } from 'vant'

// 这样的话就可以使用 this.$axios 方法
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/'
axios.defaults.headers.common['Accept-Language'] = getLanguage()
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/', // url = baseURL + request url

  // https://blog.csdn.net/HermitSun/article/details/100797223
  // withCredentials: true, // send cookies when cross-domain requests

  // axios 其实会给请求自动转码, 一般来说不需要进行额外的设置
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  // },

  timeout: 5000 // request timeout
})
Vue.prototype.$axios = axios

const defaultParams = {
  api_version: '1.0.0',
  ts: Math.round(new Date() / 1000)
}

// request interceptor
service.interceptors.request.use(
  config => {
    // 在请求发出之前进行一些操作
    // config.headers['x-access-appid'] = 'ty9fd2848a039abbbb'

    console.log(`--------> request`, config)
    config.data = Object.assign({}, defaultParams, config.data)

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 200, it is judged as an error.
    // 判断字符串而不是数值, 因为code可能是字母加数字组合
    if (String(res.code) !== '200') {
      Toast(res.msg)
      // return Promise.reject(new Error(res.message || 'Error'))
      return Promise.reject(res.message || 'Error')
    } else {
      return res
    }
  },
  error => {
    console.error(error) // for debug
    return Promise.reject(error)
  }
)

export default service
