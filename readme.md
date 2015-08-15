# boosh [![Build Status](https://travis-ci.org/iansinnott/boosh.svg?branch=master)](https://travis-ci.org/iansinnott/boosh)

> My legendary module


## Install

```
$ npm install --save boosh
```


## Usage

```js
var boosh = require('boosh');
module.exports = boosh({
  in: 'src/app.js',
  out: 'public',
});
```

## Options

### `in`

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

### `out`

**Type:** string
**Default:** `null`

### `cleanOnBuild`

**Type:** boolean
**Default:** `true`

If true, Boosh.js will clear the directory specified by the `out` option every time you build. This is recommended, as it encourages keeping source files and generated files separate.

### Defaults

```
module.exports = boosh({

  // Boosh specific options
  in: null,
  out: null,
  clearOnBuild: true,
  eslintConfig: './.eslintrc',

  // Webpack dev options
  devtool: 'inline-source-map',
  
  // TOOD: finish writing this
});
```

## CLI

```
$ npm install --global boosh
```
```
$ boosh --help

  Usage
    boosh [input]

  Example
    boosh
    unicorns & rainbows

    boosh ponies
    ponies & rainbows

  Options
    --foo  Lorem ipsum. Default: false
```


## API

### boosh(input, [options])

#### input

*Required*  
Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## License

MIT © [Ian Sinnott](http://iansinnott.com)
