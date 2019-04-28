# electron-webpack-cra-workspace

A `yarn` and `lerna` workspace boilerplate for an application that

- compiles for web using `create-react-app`
- compiles for desktop using `electron-webpack`

## Usage

### Development

#### `yarn start`

Run `yarn start` in the root. This will start two instances of `webpack-dev-server` - one for web, one for electron - and also watch and transpile shared packages using `babel`.

#### `yarn web`

Starts the dev server of `packages/web`.

#### `yarn start:electron`

Starts the dev server of `packages/electron`.

#### `yarn start:packages`

Start the babel transpilation for packages other than `packages/electron` and `packages/web` and watches for changes.  
Basically, this transpiles all non-app packages in the workspace, so they can be consumed within the app packages.

## problems encountered and solved

### yarn workspace and hoisting

In order to avoid hoisting problems and satisfy both the electron and the cra setups, a couple of tweaks were necessary:

- `webpack-dev-server` went into the `nohoist` field because both `electron-webpack` and `react-scripts` depend on different versions of it
- There are some packages that both `electron-webpack` and `react-scripts` depend on, but we can use the exact same version - like `webpack` or `babel-eslint`. These went into the workspace `devDependencies` instead of nohoist, because it's sufficient and avoids `node_modules` duplication. Basically, root-level dependencies are implicitly hoisted anyways.
