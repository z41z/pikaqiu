/**
 * Babel配置
 */

module.exports = {
  test: /\.js$/,
  exclude: /(node_modules)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        ['@vue/app', {
          useBuiltIns: "usage",
          polyfills: [
            'es6.promise',
            'es6.symbol'
          ]
        }]
      ],
      plugins: ['dynamic-import-webpack', '@babel/plugin-proposal-optional-chaining']
    }
  }

}