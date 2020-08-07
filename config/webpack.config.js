const path = require('path')
const resolve = dir => path.resolve(__dirname, '../', dir)

module.exports = config => {
  // 通用配置
  // 设置路径别名
  config.resolve.alias.set('@', resolve('./src'))

  // NPM引入的模块之间有共同的依赖 , 如何进行删减压缩，See：https://segmentfault.com/q/1010000023113947/a-1020000023206379
  // config.resolve.alias.set('bn.js', path.resolve(process.cwd(), 'node_modules', 'bn.js'))

  // 根据环境不同，执行不同的配置
  if (process.env.NODE_ENV === 'production') {
    require('./webpack.config.prod.js')(config)
  } else {
    require('./webpack.config.dev.js')(config)
  }
}
