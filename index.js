if (process.env.NODE_ENV === 'production') { // 通过环境变量来决定入口文件
  module.exports = require('./lib/editer.umd.min')
} else {
  module.exports = require('./lib/editerSource.umd')
}
