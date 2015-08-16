var debug = require('debug');
var getPackage = require('./getPackage.js');

var pkg = getPackage();

module.exports = function moduleDebug(filename) {
  return debug(pkg.name + ':' + filename);
};
