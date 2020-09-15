
const user = require(`./user.js`)
const create = require(`./create.js`)
const detail = require(`./detail.js`)

module.exports = {
  login: user.login,
  create,
  detail
}

