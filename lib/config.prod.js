var isString = require('lodash.isstring');
var isObject = require('lodash.isobject');
var assign = require('lodash.assign');
var strip = require('strip-loader');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var filenameWithoutExt = require('./filenameWithoutExt.js');
var WEBPACK_URL = '/';

var plugins = [
  // Extract all CSS to appropriately named css files
  new ExtractTextPlugin('[name].css', { allChunks: true }),

  // Don't reload on errors
  new webpack.NoErrorsPlugin(),
];

module.exports = function(spec) {
  var entry = {};

  if (isString(spec.in)) {
    entry[filenameWithoutExt(spec.in)] = spec.in;
  } else if (isObject(spec.in)) {
    entry = spec.in;
  }

  if (spec.cleanOnBuild) {
    plugins.unshift(new Clean(['public']));
  }

  if (spec.minify) {
    // Minify & Dudupe
    // Minify opptions: http://lisperator.net/uglifyjs/compress
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        comments: /.^/,
        screw_ie8: true,
        compress: { warnings: false },
      }),
      new webpack.optimize.DedupePlugin()
    );
  }

  plugins.push(new webpack.DefinePlugin(assign({ __DEV__: false }, spec.define || {})));

  return {

    entry: entry,

    output: {
      path: path.resolve(__dirname, spec.out || 'public/'),
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

        { test: /\.json$/, loaders: ['json'] },
        { test: /\.styl$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2!autoprefixer!stylus') },
        { test: /\.sass$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2!autoprefixer!sass?indentedSyntax') },
        { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2!autoprefixer!sass') },
        { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2!autoprefixer!less') },
        { test: /\.css/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer') },
        { test: /\.(png|jpg|gif)$/, loaders: ['file?name=[name].[ext]'] },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['url?limit=10000&minetype=application/font-woff'] },
        { test: /\.(ttf|eot|svg|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['file'] },
      ],
    },

    plugins: plugins,

  };
};
