/**
 * Vue-cli 配置
 */
let { Intranet, generateConfig, generateProxy } = require('./config/generate')
// 是否是贵州内网并控制台打印
Intranet.console()
// 根据当前内外网参数修改前端配置
generateConfig()
// 根据当前内外网参数修改开发proxy配置
generateProxy()
require('events').EventEmitter.defaultMaxListeners = 100; // 内存泄露
const dev = require('./config/vue.config.dev')
const prod = require('./config/vue.config.prod')
const env = process.env.NODE_ENV
// 是否是生产环境
const isProduction = env === 'production'
const config = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0] = {
          template: './static/index.html',
          hash: isProduction,
          // 通用script
          common: isProduction ? `
            <script>
            let OLD_VERSION = localStorage.APP_VERSION;
            let CURRENT_VERSION = ${(new Date).getTime()};
            if(OLD_VERSION!=CURRENT_VERSION){
              localStorage.clear();
              localStorage.APP_VERSION = CURRENT_VERSION;
              console.log('new version');
            }
            </script>`: ``
        }
        return args
      })
    // if (!isProduction) {
    //   config.module
    //     .rule('images')
    //     .use("url-loader")
    //     .loader("url-loader")
    //     .options({
    //       limit: 10
    //     })
    //     .end();
    // }
  }
}

module.exports = isProduction ? { ...config, ...prod } : { ...config, ...dev }
// module.exports = env === 'development' ? dev : prod