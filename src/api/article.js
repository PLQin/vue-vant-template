
import request from '@/utils/request.js'

/**
 * 列表
 * @param {*} params
 */
export function articleList(params) {
  return request({
    url: '/client/article/list',
    method: 'get',
    params
  })
}

/**
 * 添加
 * @param {*} data
 */
export function articleAdd(data) {
  return request({
    url: '/client/article/add',
    method: 'post',
    data
  })
}

/**
 * 详情
 * @param {*} data
 */
export function articleDetail(params) {
  return request({
    url: '/client/article/detail',
    method: 'get',
    params
  })
}

/**
 * 更新
 * @param {*} data
 */
export function articleEdit(data) {
  return request({
    url: '/client/article/edit',
    method: 'post',
    data
  })
}

/**
 * 删除
 * @param {*} data
 */
export function articleDelete(data) {
  return request({
    url: '/client/article/delete',
    method: 'post',
    data
  })
}
