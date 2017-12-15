# ReactNativePractice
Example of React Native + TypeScript with [TSLint](https://palantir.github.io/tslint/) and [Prettier](https://prettier.io/)

## How did I setup
`react-native` version is `0.51.0`

### Create project
- `react-native init ReactNativePractice`
- `cd ReactNativePractice`
- Try to run `react-native run-ios` (or `run-android`)

### TypeScript
Almost the same as https://github.com/Microsoft/TypeScript-React-Native-Starter

- `cd ReactNativePractice`
- `mkdir src` 
- `mv index.js src` `mv App.js src` `mv ./__tests__/ ./src/__tests__/`
- `touch index.js` and write `import './src/index';` into the `index.js`
- Try to run `react-native run-ios` (or `run-android`)
- `yarn add typescript`
- `tsc --init --pretty --sourceMap --target es2015 --outDir ./lib --module commonjs --jsx react`
- Append `"include": ["./src/"]` into `tsconfig.json`
- Replace `import './src/index';` with `import './lib/index';` in `ReactNativePractice/index.js`
- Write the following code into `package.json`

    ```js
    "jest": {
        "preset": "react-native",
        "moduleFileExtensions": [
            "ts",
            "tsx",
            "js"
        ],
        "transform": {
            "^.+\\.(js)$": "<rootDir>/node_modules/babel-jest",
            "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
        },
        "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
        "testPathIgnorePatterns": [
            "\\.snap$",
            "<rootDir>/node_modules/",
            "<rootDir>/lib/"
        ],
        "cacheDirectory": ".jest/cache"
    }
    ```

- `yarn add @types/jest @types/react @types/react-native @types/react-test-renderer`
- Change the file extensions of `src/index.js`, `src/App.js` and `src/__tests__/App.js` from `.js` to `.tsx`
- Modify `src/App.tsx`
    - Replace `import React, {Component} from 'react';` with `import * as React from 'react';`
    - Replace `Component<{}>` with `React.Component<object, object>`
- Modify `src/__tests__/App.tsx`
    - Replace `import React from 'react'` with `import * as React from 'react';`
    - Replace `import renderer from 'react-test-renderer';` with `import * as renderer from 'react-test-renderer';`
- `yarn add --dev jest-cli`
- Append the following code into `scripts` in `package.json`

    ```js
    "build": "tsc",
    "build:watch": "tsc --watch",
    "test": "jest"
    ```

- Try to run the scripts `npm run build` `npm run build:watch` `npm run test`

### Lint, Formatter
- `yarn add --dev --exact tslint prettier tslint-config-prettier`
- `node_modules/.bin/tslint --init`
- Append `tslint-config-prettier` into `extends` in `tslint.json`
- Append the following code into `scripts` in `package.json`

    ```js
    "lint": "tslint -c tslint.json 'src/**/*.{ts,tsx}'",
    "format": "prettier --find-config-path --write 'src/**/*.tsx'"
    ```

- Add `.prettierrc` to project root with the following content

    ```js
    {
        "singleQuote": true
    }
    ```

- Try to run the scripts `npm run lint` `npm run format`

### Visual Studio Code
[TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) are useful if you use Visual Studio Code.

## How to devleop
- `react-native run-ios`
- Run `npm run build:watch`
- Write code and reload on simlutor (`⌘R` for iOS, `RR` for Android)