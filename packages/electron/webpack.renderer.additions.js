const glob = require('glob');

const watchDirs = glob.sync(`../*/lib`);

module.exports = {
  devServer: {
    contentBase: watchDirs
  }
};
