
// https://webpack.js.org/guides/dependency-management/#requirecontext
const pay = require('./api/pay.js')

module.exports = function() {
  return {
    pay
  }
}
