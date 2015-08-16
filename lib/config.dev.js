var path = require('path');
var webpack = require('webpack');

var filenameWithoutExt = require('./filenameWithoutExt.js');
var DEV_PORT = process.env.DEV_PORT || 8888;
var WEBPACK_URL = 'http://localhost:' + DEV_PORT + '/'; // Trailing slash is important

module.exports = function(spec) {
  var entry = {};

  if (spec.in) {
    entry[filenameWithoutExt(spec.in)] = [
      'webpack-dev-server/client?' + WEBPACK_URL,
      'webpack/hot/only-dev-server',
      spec.in,
    ];
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

    devServer: {
      contentBase: './public/',
      publicPath: WEBPACK_URL,
      hot: true,
      inline: true,
      port: 8888,
      stats: {
        colors: true,
        chunks: false,
      },
    },

  };
};
