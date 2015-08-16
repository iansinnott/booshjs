var debug = require('./debug')('removeKeys');
var pick = require('lodash.pick');

/**
 *
 * @param {object} config
 * @return {object} Valid webpack config object
 */
module.exports = function removeKeys(object, keys) {
  debug('Removing keys', keys);
  var validKeys = Object.keys(object).filter(function(key) {
    return keys.indexOf(key) === -1;
  });

  debug('Keeping keys', validKeys);
  return pick(object, validKeys);
};
