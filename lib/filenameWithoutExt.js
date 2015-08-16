var path = require('path');
module.exports = function filenameWithoutExt(filepath) {
  return path.basename(filepath, path.extname(filepath));
};

