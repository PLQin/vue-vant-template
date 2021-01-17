const Mock = require('mockjs')
const Random = Mock.Random

module.exports = {
  'login': {
    code: 20000,
    data: {
      ...Mock.mock({
        'openid|1': [
          '',
          Random.id()
        ]
      })
    }
  }
}

