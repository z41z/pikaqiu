const fs = require('fs')
const chalk = require('chalk')

// 根据化境变量参数判断内外网
const isIntranet = process.argv.indexOf('--intranet') > -1
const isNotDingtalk = process.argv.indexOf('--nodingtalk') > -1
let regx = /let isIntranet = (false|true)/
let replacer = `let isIntranet = ${isIntranet}`
let regxDingtalk = /let isNotDingtalk = (false|true)/
let replacerDingtalk = `let isNotDingtalk = ${isNotDingtalk}`

// 是否是贵州内网并控制台打印
module.exports.Intranet = {
  isIntranet,
  console: () => {
    console.log(chalk.green('<===========') + chalk.bgGreen.black(` 当前环境:${isIntranet ? '贵州内网' : '贵州外网'} - ${isNotDingtalk ? '钉钉非授权' : '钉钉授权'}`) + chalk.green('===========>'), '\n')
  }
}

// 根据当前内外网参数修改前端配置
module.exports.generateConfig = () => {
  const frontendConfigPath = './src/config/index.js'
  let frontendConfig = fs.readFileSync(frontendConfigPath).toString().replace(regx, replacer)
  fs.writeFileSync(frontendConfigPath, `${frontendConfig}`)
  // 钉钉
  let frontendConfigDing = fs.readFileSync(frontendConfigPath).toString().replace(regxDingtalk, replacerDingtalk)
  fs.writeFileSync(frontendConfigPath, `${frontendConfigDing}`)
}

// 根据当前内外网参数修改开发proxy配置
module.exports.generateProxy = () => {
  const proxyConfigPath = `./config/webpack.proxy.js`
  let proxyConfig = fs.readFileSync(proxyConfigPath).toString().replace(regx, replacer)
  fs.writeFileSync(proxyConfigPath, `${proxyConfig}`)
}