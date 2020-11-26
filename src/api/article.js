
import request from '@/utils/request.js'

/**
 * 列表
 * @param {*} params
 */
export function articleList(params) {
  return request({
    url: '/article/list',
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
    url: '/article/add',
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
    url: '/article/detail',
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
    url: '/article/edit',
    method: 'post',
    data
  })
}
