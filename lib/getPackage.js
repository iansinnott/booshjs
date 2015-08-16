var fs = require('fs');
var path = require('path');
var findRoot = require('find-root');

var root = findRoot(process.cwd());

function getPackage() {
  try {
    return JSON.parse(fs.readFileSync(path.resolve(root, 'package.json')));
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

