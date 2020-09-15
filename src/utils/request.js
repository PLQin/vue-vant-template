import axios from 'axios'
import { Toast } from 'vant'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API || '/', // url = baseURL + request url
  // withCredentials: true, // send cookies when cross-domain requests
  // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // 在请求发出之前进行一些操作
    // config.headers['x-access-appid'] = 'ty9fd2848a039abbbb'

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

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 20000) {
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
