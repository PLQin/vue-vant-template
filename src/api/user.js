
import request from '@/utils/request.js'

/**
 * 商品列表
 * @param {*} params
 */
export function login(params) {
  return request({
    url: '/login',
    method: 'post',
    params
  })
}
