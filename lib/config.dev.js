var assign = require('lodash.assign');
var path = require('path');
var webpack = require('webpack');

var baseConfig = require('./config.base.js');
var DEV_PORT = process.env.DEV_PORT || 8888;
var WEBPACK_URL = 'http://localhost:' + DEV_PORT + '/'; // Trailing slash is important

module.exports = function(spec) {
  return assign({}, baseConfig(spec), {

    devtool: spec.devtool || 'inline-source-map',

    entry: {
      app: [
        'webpack-dev-server/client?' + WEBPACK_URL,
        'webpack/hot/only-dev-server',
        spec.in,
      ],
    },

    output: {
      path: path.resolve(__dirname, spec.out),
      filename: '[name].js',
      publicPath: WEBPACK_URL,
    },

    module: {
      loaders: [
        // See .babelrc for Babel config
        { test: /\.js?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
        { test: /\.styl$/, loaders: ['style', 'css?modules&importLoaders=2&localIdentName=[name]__[local]___[hash:base64:6]', 'autoprefixer', 'stylus'] },
        { test: /\.(png|jpg|gif)$/, loaders: ['file?name=[name].[ext]'] },
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['url?limit=10000&minetype=application/font-woff'] },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loaders: ['file'] },
      ],
    },

    // We't load locales when requiring moment.js. We usually only need english
    plugins: [
      // Enable HRM
      new webpack.HotModuleReplacementPlugin(),

      // Don't reload on errors
      new webpack.NoErrorsPlugin(),

      // Define magic globals
      new webpack.DefinePlugin({ __DEV__: true }),
    ],

    // Show progress
    progress: true,

  });
};
