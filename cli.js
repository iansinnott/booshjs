#!/usr/bin/env node
var meow = require('meow');

var cli = meow({
  help: [
    'Usage',
    '  $ boosh [input]',
    '',
    'Examples',
    '  $ boosh',
    '  unicorns & rainbows',
    '',
    '  $ boosh ponies',
    '  ponies & rainbows',
    '',
    'Options',
    '  --foo  Lorem ipsum. Default: false',
  ],
});

console.log(cli.input[0]); // eslint-disable-line no-console
