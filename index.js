var debug = require('./lib/debug.js')('index');
var assign = require('lodash.assign');
var invariant = require('invariant');

var baseConfig = require('./lib/config.base.js');
var devConfig = require('./lib/config.dev.js');
var prodConfig = require('./lib/config.prod.js');
var removeKeys = require('./lib/removeKeys.js');

function toPrettyJSON(json) {
  return JSON.stringify(json, null, 2);
}

// Custom arguments that should be removed from the final config we export to
// webpack
var customArgs = [
  'in',
  'out',
  'cleanOnBuild',
  'isDev',
  'https',
  'port',
];

function validateConfig(config) {
  invariant(config, 'Expected a configuration object.');
  if (!config || typeof config !== 'object') {
    debug('Non-object was passed as config');
    throw new TypeError('Expected a configuration object');
  }

  debug('Validating required config params');
  invariant(config.in || config.entry, 'Configuration object must have an `%s` property.', 'in');
  invariant(config.out || config.output, 'Configuration object must have an `%s` property.', 'out');
}

module.exports = function(config) {
  debug('Validating user defined config:', toPrettyJSON(config));
  validateConfig(config);
  debug('Config valid. Exporting based on NODE_ENV: ' + process.env.NODE_ENV);

  var finalConfig = assign(
    {},
    baseConfig(config),
    config.isDev === false ? prodConfig(config) : devConfig(config),
    removeKeys(config, customArgs)
  );

  debug('Exporting final config:', toPrettyJSON(finalConfig));
  return finalConfig;
};
