module.exports = {
  plugins: {
    autoprefixer: {},
    cssnano: {
      preset: [
        'advanced',
        { zindex: false } //取消CSS z-index自动计算
      ]
    },
    // 'postcss- px2rem': {
    //   remUnit: 37.5
    // }
  }
}
