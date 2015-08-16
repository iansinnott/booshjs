var debug = require('./lib/debug.js')('index');

var devConfig = require('./lib/config.dev.js');
var prodConfig = require('./lib/config.prod.js');
var removeKeys = require('./lib/removeKeys.js');

// Custom arguments that should be removed from the final config we export to
// webpack
var customArgs = [
  'in',
  'out',
  'cleanOnBuild',
  'isDev',
];

function validateConfig(config) {
  if (!config || typeof config !== 'object') {
    debug('Non-object was passed as config');
    throw new TypeError('Expected a configuration object');
  }

  debug('Validating required config params');
  ['in', 'out'].forEach(function(opt) {
    if (!config[opt]) {
      debug('`' + opt + '` was not defined on configuration object');
      throw new Error('Configuration object must have `in` and `out` properties.');
    }
  });
}

module.exports = function(config) {
  debug('Validating user defined config:', config);
  validateConfig(config);
  debug('Config valid. Exporting based on NODE_EN: ' + process.env.NODE_ENV);

  var finalConfig = removeKeys(
    config.isDev === false ? prodConfig(config) : devConfig(config),
    customArgs
  );

  debug('Exporting final config:', finalConfig);
  return finalConfig;
};
