module.exports = {
  plugins: {
    'postcss-pxtorem': {
      selectorBlackList: [],
      propList: ['*'],
      minPixelValue: 1,
      rootValue: 192, // 根元素字体大小 16/1.25
      unitPrecision: 2, // 转换成rem后保留的小数点位数
      exclude: /(node_module)/,
      mediaQuery: false,
    },
  },
};
