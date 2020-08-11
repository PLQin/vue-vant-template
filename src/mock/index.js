
// TODO : https://webpack.js.org/guides/dependency-management/#requirecontext

const create = require('./api/create.js')
const detail = require('./api/detail.js')
const goods = require('./api/goods.js')
const list = require('./api/list.js')
const order = require('./api/order.js')
const pay = require('./api/pay.js')
const qrcode = require('./api/qrcode.js')

module.exports = function() {
  return {
    create,
    detail,
    goods,
    list,
    order,
    pay,
    qrcode
  }
}
