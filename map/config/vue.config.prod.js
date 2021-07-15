const configureWebpack = require('./webpack.config')
module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    ...configureWebpack
  },
  css: {
    // modules: true,
    loaderOptions: {
      postcss: {
        config: {
          path: './config/postcss.config'
        }
      },
      less: {
        // 编译打包启用Javascript:Inline JavaScript is not enabled. Is it set in your options
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    progress: false
  }
}