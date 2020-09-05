
const prodPlugin = []

// 如果是生产环境，则自动清理掉打印的日志，但保留error 与 warn
if (process.env.NODE_ENV === 'production') {
  prodPlugin.push([
    'transform-remove-console',
    {
      exclude: ['error', 'warn']
    }
  ])
}

module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    // 让系统支持可选链
    // https://www.babeljs.cn/docs/babel-plugin-proposal-optional-chaining
    '@babel/plugin-proposal-optional-chaining',

    ...prodPlugin
  ]
}
