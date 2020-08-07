
import request from '@/utils/request.js'

export function submit(data) {
  return request({
    url: '/pay/qrcode',
    method: 'post',
    data
  })
}
