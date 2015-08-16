# boosh.js [![Build Status](https://travis-ci.org/iansinnott/boosh.svg?branch=master)](https://travis-ci.org/iansinnott/boosh)

A Webpack configuration generator and project boilerplate for building modern web applications

This project is an evolution of my old [React + Webpack boilerplate][]. I was further inspired to make this into its own module by [hjs-webpack][].

[React + Webpack boilerplate]: https://github.com/iansinnott/react-boilerplate
[hjs-webpack]: https://github.com/HenrikJoreteg/hjs-webpack/

## Install

```
$ npm install --save booshjs
```


## Usage

```js
// webpack.config.js
var boosh = require('booshjs');
module.exports = boosh({
  in: 'src/app.js',
  out: 'public',
});
```


## API

### boosh([options])

### options

#### `in`

**Type:** string, array, object
**Default:** `null`

The path to the main entry point of your application or a configuration object specifying multiple entry points. For small apps passing a single string is usually enough, but as your app grows you may need multiple entry points. The `in` option is passed directly to Webpack's `entry` configuration.

```
// String example
{
  in: 'src/app.js',
}

// Object example with multiple entrypoints
{
  in: {
    app: 'src/app.js',
    login: 'src/login.js',
  },
}
```

#### `out`

**Type:** string
**Default:** `null`

#### `cleanOnBuild`

**Type:** boolean
**Default:** `true`

If true, Boosh.js will clear the directory specified by the `out` option every time you build. This is recommended, as it encourages keeping source files and generated files separate.

#### Defaults

```
module.exports = boosh({

  // Boosh specific options
  in: null,
  out: null,
  clearOnBuild: true,

  // Webpack dev options
  devtool: 'inline-source-map',
  
});
```


## CLI Project Generator

Boosh.js also let's you generate quick project boilerplates so that setting up a new project takes seconds.

```
$ npm install --global booshjs
```
```
$ boosh --help

  Usage
    boosh [folder] [options]

  Example
    boosh new-project

  Options
    --todo  TODO: Write the options
```


## License

MIT © [Ian Sinnott](http://iansinnott.com)
