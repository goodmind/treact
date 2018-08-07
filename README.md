# Telegram React
[![Build Status](https://travis-ci.org/barbar/vortigern.svg?branch=master)](https://travis-ci.org/barbar/vortigern)
[![Dependency Status](https://david-dm.org/barbar/vortigern.svg)]()
[![devDependency Status](https://david-dm.org/barbar/vortigern/dev-status.svg)]()
[![Code Climate](https://codeclimate.com/github/barbar/vortigern/badges/gpa.svg)](https://codeclimate.com/github/barbar/vortigern)
[![GitHub issues](https://img.shields.io/github/issues/barbar/vortigern.svg)](https://github.com/barbar/vortigern/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/barbar/vortigern/develop/LICENSE)
___

**Work in progress** 

Contact me in telegram [@goodmind](https://telegram.me/goodmind)

![treact](screenshot.png)

[![TypeScript](https://barbaruploads.s3.amazonaws.com/bicoz/typescript.png)](https://www.typescriptlang.org/) 
[![React](https://barbaruploads.s3.amazonaws.com/bicoz/react.png)](https://github.com/facebook/react) 
[![Redux](https://barbaruploads.s3.amazonaws.com/bicoz/redux.png)](https://github.com/reactjs/redux)

## Installation

You can clone from this repository

```bash
$ git clone https://github.com/goodmind/treact
$ cd treact
$ cd packages/theme-parser && yarn build
$ cd packages/treact && yarn start:dev
```

## Usage

All commands defaults to development environment. You can set `NODE_ENV` to `production` or use the shortcuts below.

```bash
# Running

$ yarn start # This starts the app in development mode

# Starting it with the production build
$ NODE_ENV=production yarn start # or
$ yarn start:prod

# Building 

$ yarn build # This builds the app in development mode

# Commands below builds the production build
$ NODE_ENV=production yarn build # or
$ yarn build:prod

# Testing
$ yarn test
```

## Credits

TReact is released under the [MIT license](LICENSE). 
