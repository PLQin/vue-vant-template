import request from '@/utils/request'

/**
 * 创建订单
 * @param {*} data -
 * - *goodsSn - 商品ID
 * - *consignee - 收货人名称
 * - *mobile - 收货人手机号
 * - *address - 收货具体地址
 * - *goodsPrice - 商品金额
 * - *currency - 币种
 * - message - 留言
 */
export function createOrder(data) {
  return request({
    url: '/order/create',
    method: 'post',
    data
  })
}

/**
 * 订单详情
 * @param {*} orderSn 订单编号
 */
export function detail(orderSn) {
  return request({
    url: '/order/detail/' + orderSn,
    method: 'get'
  })
}
