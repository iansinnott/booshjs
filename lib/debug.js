var debug = require('debug');
module.exports = function moduleDebug(filename) {
  return debug(require('../package.json').name + ':' + filename);
};
