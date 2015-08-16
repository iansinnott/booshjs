var fs = require('fs');
var path = require('path');
var findRoot = require('find-root');
var debug = require('debug')('getPackage');

var root = findRoot(process.cwd());

function getPackage() {
  var packagePath = path.resolve(root, 'package.json');
  debug('Attempting to read ' + packagePath);
  try {
    return JSON.parse(fs.readFileSync(packagePath, { encoding: 'utf-8' }));
  } catch (e) {
    throw new Error('Could not find package.json');
  }
}

module.exports = function validatePackage() {
  var pkg = getPackage();

  if (!pkg.name) {
    throw new Error('package.json must specify a `name`');
  }

  if (!pkg.version) {
    throw new Error('package.json must specify a `version`');
  }

  return pkg;
};

