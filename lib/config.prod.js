var assign = require('lodash.assign');
var strip = require('strip-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var baseConfig = require('./config.base.js');
var WEBPACK_URL = '/';

module.exports = function(spec) {
  return assign({}, baseConfig(spec), {

    entry: {
      app: spec.in,
    },

    output: {
      path: path.resolve(__dirname, spec.out),
      filename: '[name].js',
      publicPath: WEBPACK_URL,
    },

    /**
     * Note: css-lader is passed the no-restructuring param b/c it can sometimes
     * cause issues where selectors will be reordered and no longer get applied.
     */
    module: {
      loaders: [
        // See .babelrc for Babel config. Also note that all calls to console.log
        // and debug will be stripped from the code
        { test: /\.js?$/, loaders: [strip.loader('debug', 'console.log'), 'babel'], exclude: /node_modules/ },

        { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2!autoprefixer!stylus') },
        { test: /\.(png|jpg|gif)$/, loaders: ['file?name=[name].[ext]'] },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['url?limit=10000&minetype=application/font-woff'] },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['file'] },
      ],
    },

    plugins: [
      new ExtractTextPlugin('[name].css', { allChunks: true }),

      // Minify
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,

        // This matches nothing and thus removes all comments
        comments: /.^/,
        screw_ie8: true,

        // Options: http://lisperator.net/uglifyjs/compress
        compress: { warnings: false },
      }),

      // Dedupe
      new webpack.optimize.DedupePlugin(),

      // Don't reload on errors
      new webpack.NoErrorsPlugin(),

      // Define magic globals
      new webpack.DefinePlugin({ __DEV__: false }),
    ],

  });
};
