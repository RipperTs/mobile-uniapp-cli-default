// vue.config.js，如没有此文件则手动创建
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  transpileDependencies: ['uview-ui'],
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/static/icons'))
      .end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/static/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'myicon-[name]'
      });
  }
}
