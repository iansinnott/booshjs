var axis = require('axis');
var rupture = require('rupture');
var typographic = require('typographic');

module.exports = function() {
  return {
    resolve: {
      extensions: ['', '.js', '.jsx', '.json'],
    },

    stylus: {
      use: [axis(), rupture(), typographic()],
    },
  };
};
