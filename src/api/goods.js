
import request from '@/utils/request.js'

/**
 * 商品列表
 * @param {*} params
 */
export function list(params) {
  return request({
    url: '/goods',
    method: 'get',
    params
  })
}

/**
 * 商品详情
 * @param {*} params
 *  - gid 商品gid
 */
export function detail(gId) {
  return request({
    url: '/goods/detail/' + gId,
    method: 'get'
  })
}
