/* globals describe,it,before */
var expect = require('chai').expect;
var boosh = require('./');
var getPackage = require('./lib/getPackage.js');
var removeKeys = require('./lib/removeKeys.js');

describe('getPackage', function() {
  it('Should get package.json', function() {
    var pkg = getPackage();
    expect(pkg.name).to.equal('booshjs');
  });
});

describe('removeKeys', function() {
  it('Should remote keys from an object', function() {
    var obj = {
      in: 'some value',
      out: 'another value',
      isDev: false,
      entry: 'app.js',
    };

    var newObj = removeKeys(obj, ['in', 'out', 'isDev']);
    expect(newObj.in).to.be.undefined;
    expect(newObj.out).to.be.undefined;
    expect(newObj.isDev).to.be.undefined;
    expect(newObj.entry).to.equal('app.js');
  });

  it('Should not mutate original object', function() {
    var obj = {
      in: 'some value',
      out: 'another value',
      isDev: false,
      entry: 'app.js',
    };
    removeKeys(obj, ['in', 'out', 'isDev']);
    expect(obj).to.eql(obj);
  });
});

describe('boosh', function() {
  var validConfig = {
    in: '/path/to/file',
    out: '/path/to/file',
    isDev: true,
  };

  it('should throw when no config object is passed', function() {
    expect(boosh).to.throw(Error, 'Expected a configuration object');
  });

  it('should throw when required options are not passed', function() {
    var errMessage = 'Configuration object must have `in` and `out` properties.';

    expect(boosh.bind(boosh, {
      in: null,
      out: '/path/to/file',
    })).to.throw(Error, errMessage);

    expect(boosh.bind(boosh, {
      in: '/path/to/file',
      out: null,
    })).to.throw(Error, errMessage);

    expect(boosh.bind(boosh, {
      in: '/path/to/file',
      out: '/path/to/file',
    })).to.not.throw();
  });

  it('Should not export an object with custom options defined', function() {
    var config = boosh(validConfig);

    expect(config.in).to.be.undefined;
    expect(config.out).to.be.undefined;
    expect(config.isDev).to.be.undefined;
    expect(config.entry).to.be.ok;
    expect(config.output).to.be.ok;
  });
});

