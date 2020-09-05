
const webpackConfig = require('./config/webpack.config.js')
const isProd = process.env.NODE_ENV === 'production'

// gzip
const CompressionWebpackPlugin = require('compression-webpack-plugin')

// Configure the proxy address, which can also be set .env
// When used with mock services, devServerProxyTarget is required. Otherwise, TypeError: Cannot read property 'upgrade' of undefined
// https://segmentfault.com/q/1010000020916388
const devServerProxyTarget = 'http://149.129.114.76:9000'

module.exports = {
  configureWebpack: config => {
    if (isProd) {
      // 配置webpack 压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          test: /\.js$|\.css$/, //  匹配文件名
          threshold: 102400, //  对超过100kb进行压缩
          deleteOriginalAssets: false // 是否删除原文件
        })
      )
    }
  },

  chainWebpack: config => {
    // 项目标题
    config.plugin('html').tap(args => {
      args[0].title = '首页'
      return args
    })
    webpackConfig(config)
  },

  // 生产环境不需要 source map
  // https://cli.vuejs.org/zh/config/#productionsourcemap
  productionSourceMap: false,

  // sass-loader
  // https://vue-loader.vuejs.org/zh/guide/pre-processors.html#sass
  css: {
    extract: false,
    sourceMap: true,
    loaderOptions: {
      sass: {
        sassOptions: {
          //
        }
      }
    }
  },

  devServer: {
    proxy: {
      '^/mock': {
        target: process.env.VUE_APP_MOCK_BASE_URL || devServerProxyTarget,
        changeOrigin: false,
        pathRewrite: {
          '^/mock': '/mock'
        }
      },
      '^/': {
        target: devServerProxyTarget,
        changeOrigin: false,
        pathRewrite: {
          '^/': ''
        }
      }
    }
  },

  // 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  // https://cli.vuejs.org/zh/config/#runtimecompiler
  runtimeCompiler: true
}
