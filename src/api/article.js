
import request from '@/utils/request.js'

/**
 * 商品列表
 * @param {*} params
 */
export function articleList(params) {
  return request({
    url: '/mock/article/list',
    method: 'get',
    params
  })
}
