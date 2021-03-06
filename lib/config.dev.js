var isString = require('lodash.isstring');
var isObject = require('lodash.isobject');
var mapValues = require('lodash.mapvalues');
var assign = require('lodash.assign');
var path = require('path');
var webpack = require('webpack');

var filenameWithoutExt = require('./filenameWithoutExt.js');
var DEV_PORT = process.env.DEV_PORT || 8888;
var WEBPACK_URL = '//localhost:' + DEV_PORT + '/'; // Trailing slash is important

module.exports = function(spec) {
  var entry = {};

  if (isString(spec.in)) {
    entry[filenameWithoutExt(spec.in)] = [
      'webpack-dev-server/client?' + WEBPACK_URL,
      'webpack/hot/only-dev-server',
      spec.in,
    ];
  } else if (isObject(spec.in)) {
    entry = mapValues(spec.in, function(value) {
      return [
        'webpack-dev-server/client?' + WEBPACK_URL,
        'webpack/hot/only-dev-server',
        value,
      ];
    });
  }

  return {

    devtool: 'inline-source-map',

    entry: entry,

    output: {
      path: path.resolve(__dirname, spec.out || 'public/'),
      filename: '[name].js',
      publicPath: WEBPACK_URL,
    },

    module: {
      loaders: [
        // See .babelrc for Babel config
        { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
        { test: /\.json$/, loaders: ['json'] },
        { test: /\.styl$/, loaders: ['style', 'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:6]', 'autoprefixer', 'stylus'] },
        { test: /\.sass$/, loaders: ['style', 'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:6]', 'autoprefixer', 'sass?indentedSyntax'] },
        { test: /\.scss$/, loaders: ['style', 'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:6]', 'autoprefixer', 'sass'] },
        { test: /\.less$/, loaders: ['style', 'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:6]', 'autoprefixer', 'less'] },
        { test: /\.css$/, loaders: ['style', 'css', 'autoprefixer'] },
        { test: /\.(png|jpg|gif)$/, loaders: ['file?name=[name].[ext]'] },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['url?limit=10000&minetype=application/font-woff'] },
        { test: /\.(ttf|eot|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['file'] },
      ],
    },

    // We't load locales when requiring moment.js. We usually only need english
    plugins: [
      // Enable HRM
      new webpack.HotModuleReplacementPlugin(),

      // Don't reload on errors
      new webpack.NoErrorsPlugin(),

      // Define magic globals
      new webpack.DefinePlugin(assign({ __DEV__: true }, spec.define || {})),
    ],

    // Show progress
    progress: true,

    devServer: {
      contentBase: './public/',
      publicPath: WEBPACK_URL,
      hot: true,
      inline: true,
      port: spec.port || DEV_PORT,
      https: spec.https,
      stats: {
        colors: true,
        chunks: false,
      },
    },

  };
};
