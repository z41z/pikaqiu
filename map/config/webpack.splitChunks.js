/**
 * 根据pages目录下内容动态分割JS和CSS
 */

const fs = require('fs')
const pagesPath = './src/pages'
const comsPath = './src/components'
let splitPages = {}
let files = fs.readdirSync(pagesPath)
files.forEach(item => {
  let stats = fs.statSync(`${pagesPath}/${item}`);
  if (stats.isDirectory()) {
    splitPages[`${item}Styles`] = {
      name: `pages-${item}`,
      test: RegExp(`${item}.*.vue$`),
      chunks: 'all',
      minChunks: 1,
      reuseExistingChunk: true,
      enforce: true
    }
  }
  else {
    let itemName = item.split('.')[0]
    splitPages[`${itemName}Styles`] = {
      name: `pages-${itemName}`,
      test: RegExp(`${item}$`),
      chunks: 'all',
      minChunks: 1,
      reuseExistingChunk: true,
      enforce: true
    }
  }
})
let coms = fs.readdirSync(comsPath)
coms.forEach(item => {
  let stats = fs.statSync(`${comsPath}/${item}`);
  if (stats.isDirectory()) {
    splitPages[`${item}Styles`] = {
      name: `coms-${item}`,
      test: RegExp(`${item}.*.(vue|js)$`),
      chunks: 'all',
      minChunks: 1,
      reuseExistingChunk: true,
      enforce: true
    }
  }
  else {
    let itemName = item.split('.')[0]
    splitPages[`${itemName}Styles`] = {
      name: `coms-${itemName}`,
      test: RegExp(`${item}$`),
      chunks: 'all',
      minChunks: 1,
      reuseExistingChunk: true,
      enforce: true
    }
  }
})

let splitConfig = {
  chunks: 'all',
  cacheGroups: {
    ...splitPages,
    libs: {
      name: 'chunk-base',
      test: /[\\/]node_modules[\\/]/,
      priority: 10,
      chunks: 'initial',
      minChunks: 1
    },
    core: {
      name: 'chunk-core',
      priority: 50,
      test: /(core-js)|(corejs)|(runtime)/
    },
    sp: {
      name: 'chunk-sp',
      priority: 50,
      test: /[\\/]node_modules[\\/]sp\-.*[\\/]/
    },
    ui: {
      name: 'chunk-ui',
      priority: 20,
      test: /[\\/]node_modules[\\/]vant[\\/]/
    },
    third: {
      name: 'chunk-third',
      priority: 50,
      test: /[\\/]node_modules[\\/](vuedrag)|(sortablejs)|(swiper)|(html2canvas)[\\/]/
    },
    v3: {
      name: 'chunk-v3',
      priority: 40,
      test: /[\\/]src[\\/](api)[\\/]/
    },
    mix: {
      name: 'chunk-mix',
      priority: 40,
      test: /[\\/]src[\\/](mixins)[\\/]/
    },
    image: {
      name: 'chunk-image',
      priority: 40,
      chunks: 'all',
      minChunks: 1,
      reuseExistingChunk: true,
      enforce: true,
      test: /[\\/]images[\\/]/
    }
  }
}

module.exports = splitConfig