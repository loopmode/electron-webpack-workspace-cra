const glob = require('glob')
const path = require('path')
const watchDirs = glob.sync(`../*/lib`).map(dir => path.resolve(__dirname, dir))
module.exports = function(config) {
  return Object.assign(config, {
    devServer: {
      ...config.devServer,
      contentBase: watchDirs,
      watchContentBase: true
    }
  })
}
