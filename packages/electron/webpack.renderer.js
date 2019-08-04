const path = require('path')
const configureYarnWorkspaces = require('@loopmode/electron-webpack-config-yarn-workspaces')
console.log(configureYarnWorkspaces)
module.exports = function(config) {
  config = configureYarnWorkspaces(config, {
    root: path.resolve(__dirname, '../..'),
    libAlias: 'lib'
  })
  console.log(config)
  return config
}
