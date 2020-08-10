
// https://webpack.js.org/guides/dependency-management/#requirecontext
const pay = require('./api/pay.js')
const goods = require('./api/goods.js')
const detail = require('./api/detail.js')
const create = require('./api/create.js')

module.exports = function() {
  return {
    pay,
    goods,
    detail,
    create
  }
}
