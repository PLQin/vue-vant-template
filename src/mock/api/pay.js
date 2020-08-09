
const Mockjs = require('mockjs')
const Random = Mockjs.Random
const _ = require('lodash')

module.exports = {
  'status': 1,
  'message': 'ok!',
  'data': {
    'total': 136539,
    'limit': 12,
    'result': _.times(100, function(n) {
      return {
        'title': Random.csentence(3, 5),
        'picurl': Random.image('200x100'),
        'pic_id': Random.natural(50000, 90000),
        ...Mockjs.mock({ 'format|1': ['ps', 'ai', 'jpg'] })
      }
    })
  }
}
