I have a workspace setup with `@local` scope in package names and roughly this structure:

```
packages/app
packages/electron
packages/web
```

In this setup

- `packages/app` is watched by babel and transpiled to `packages/app/lib`
- `packages/web´ is a standard create-react-app, but it imports the actual app from`@local/app/lib/App` and renders it
- `packages/electron` is basically electron-webpack-quick-start with a simple custom `renderer/index.js` - it imports the app from `@local/app/lib/App` as well and renders it
- since it's a yarn workspace, there are symlinks in root-level node modules, so e.g `node_modules/@local/app` is a symlink to `packages/app`

So, when I edit and save `packages/app/src/App.js`, it is immediatly transpiled to `packages/app/lib/App.js`.
The web app, running the unejected setup from create-react-app (webpack, babel etc), detects the change in the imported `@local/app/lib`, which triggers a reload. I can see the result in the browser.

With the electron part, it's a bit weird :)

First, no change was detected whatsoever. This is probably because the electron-webpack setup doesn't see and doesn't care what's outside of the folder it's running in.

So, then I tried with this custom renderer webpack config:

```
const glob = require('glob')
const path = require('path')
const dirsToWatch = glob.sync(`../*/lib`).map(dir => path.resolve(__dirname, dir))
module.exports = function(config) {
  return Object.assign(config, {
    devServer: {
      ...config.devServer,
      contentBase: dirsToWatch,
      watchContentBase: true
    }
  })
}
```

And now, when there is a change in `@local/app/lib`, the webpack dev server detects that and reloads, but it then renders with the old module - I never see the change.

# electron-webpack-quick-start

> A bare minimum project structure to get started developing with [`electron-webpack`](https://github.com/electron-userland/electron-webpack).

Thanks to the power of `electron-webpack` this template comes packed with...

- Use of [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) for development
- HMR for both `renderer` and `main` processes
- Use of [`babel-preset-env`](https://github.com/babel/babel-preset-env) that is automatically configured based on your `electron` version
- Use of [`electron-builder`](https://github.com/electron-userland/electron-builder) to package and build a distributable electron application

Make sure to check out [`electron-webpack`'s documentation](https://webpack.electron.build/) for more details.

## Getting Started

Simply clone down this repository, install dependencies, and get started on your application.

The use of the [yarn](https://yarnpkg.com/) package manager is **strongly** recommended, as opposed to using `npm`.

```bash
# create a directory of your choice, and copy template using curl
mkdir new-electron-webpack-project && cd new-electron-webpack-project
curl -fsSL https://github.com/electron-userland/electron-webpack-quick-start/archive/master.tar.gz | tar -xz --strip-components 1

# or copy template using git clone
git clone https://github.com/electron-userland/electron-webpack-quick-start.git
cd electron-webpack-quick-start
rm -rf .git

# install dependencies
yarn
```

### Development Scripts

```bash
# run application in development mode
yarn dev

# compile source code and create webpack output
yarn compile

# `yarn compile` & create build with electron-builder
yarn dist

# `yarn compile` & create unpacked build with electron-builder
yarn dist:dir
```
