import { get as getLanguage } from '@/utils/language.js'
import axios from 'axios'
import Vue from 'vue'
import { Toast, Dialog } from 'vant'
import store from '@/store/index.js'

// 这样的话就可以使用 this.$axios 方法
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/'
axios.defaults.headers.common['Accept-Language'] = getLanguage()
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_API : '/', // url = baseURL + request url

  // 参考 : https://blog.csdn.net/HermitSun/article/details/100797223
  // withCredentials: true, // send cookies when cross-domain requests

  // axios 其实会给请求自动转码, 一般来说不需要进行额外的设置
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  // },

  timeout: process.env.NODE_ENV === 'production' ? 3000 : 15000 // request timeout
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
    config.headers['x-access-login_token'] = localStorage.getItem('login_token')

    console.log(`--------> http ajax request`, config)
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

    // 判断字符串而不是数值, 因为code可能是字母加数字组合
    // 移动端（客户端）的code判断负责，不同场景即便code值相同但提示用户的message未必相同，因此
    // 具体的message提示由接口调用出进行处理
    switch (String(res.code)) {
      case '200':
        return res
      case '100004':
        store.commit('user/SET_LOGOUT')
        return res
      default:
        Toast.clear()
        Dialog.alert({
          title: '提示',
          message: res.message || '服务器异常，请稍后再试'
        })
        return Promise.reject(res.message || 'Error')
    }
  },
  error => {
    console.error(error) // for debug
    Toast.fail('服务器异常\n请稍后再试')
    return Promise.reject(error)
  }
)

export default service
