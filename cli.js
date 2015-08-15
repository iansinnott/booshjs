#!/usr/bin/env node
'use strict';
var meow = require('meow');
var boosh = require('./');

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
		'  --foo  Lorem ipsum. Default: false'
	]
});

console.log(boosh(cli.input[0] || 'unicorns'));
