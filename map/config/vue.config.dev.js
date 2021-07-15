const configureWebpack = require('./webpack.config')
module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    ...configureWebpack
  },
  devServer: {
    // host: '192.168.10.222',
    // port: 8080,
    progress: false
  },
  css: {
    // modules: true,
    loaderOptions: {
      less: {
        options: {
          strictMath: false,
          noIeCompat: true
        },
        modifyVars: {
          /** Less变量注入
           * 'primary-color': '#1DA57A',
           * 'link-color': '#1DA57A',
           * 'border-radius-base': '2px',
           */
        },
        // 启用行内Javascript:Inline JavaScript is not enabled. Is it set in your options
        javascriptEnabled: true
      },
      // postcss: {
      //   plugins: [
      //     require('postcss-px2rem')({
      //       remUnit: 37.5
      //     })
      //   ]
      // }
    },
  }
}