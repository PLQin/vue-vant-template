const isProd = process.env.NODE_ENV === 'production'

// gzip
const CompressionWebpackPlugin = require('compression-webpack-plugin')

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
    config
      .plugin('html')
      .tap(args => {
        args[0].template = './static/index.html'
        args[0].favicon = './static/favicon.ico'
        args[0].title = '首页'
        return args
      })
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
        // https://webpack.docschina.org/loaders/sass-loader/#options
        // https://webpack.docschina.org/loaders/sass-loader/#additionaldata
        // https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        additionalData: '@import "~@/style/variables.scss";'
      }
    }
  },

  devServer: {
    // proxy: {
    //   '^/': {
    //     target: process.env.VUE_APP_BASE_API,
    //     changeOrigin: false, // 是否在本地虚拟一个服务器接受并代发请求
    //     secure: false, // 是否拒绝使用了无效证书（ssl）的后端服务器
    //     pathRewrite: {
    //       '^/': ''
    //     }
    //   }
    // }
  },

  // 设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
  // https://cli.vuejs.org/zh/config/#runtimecompiler
  runtimeCompiler: true
}
