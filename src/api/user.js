
import request from '@/utils/request.js'

/**
 *
 * @param {*} data
 */
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 *
 * @param {*} data
 */
export function wxLogin(data) {
  return request({
    url: '/user/get_access_token',
    method: 'post',
    data
  })
}

/**
 *
 * @param {*} params
 */
export function wxReplace(params) {
  return request({
    url: '/user/wx_login',
    method: 'get',
    params
  })
}
