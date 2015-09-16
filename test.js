/* globals describe,it,before */

// Quick polyfill
if (!Object.assign) {
  Object.assign = require('lodash.assign');
}

var expect = require('chai').expect;
var boosh = require('./');
var getPackage = require('./lib/getPackage.js');
var removeKeys = require('./lib/removeKeys.js');
var filenameWithoutExt = require('./lib/filenameWithoutExt.js');

describe('getPackage', function() {
  it('Should get package.json', function() {
    var pkg = getPackage();
    expect(pkg.name).to.equal('booshjs');
  });
});

describe('filenameWithoutExt', function() {
  it('Should return filenames without extensions', function() {
    expect(filenameWithoutExt('path/to/file.html')).to.equal('file');
    expect(filenameWithoutExt('./relative/path/to/something.js')).to.equal('something');
    expect(filenameWithoutExt('/abs/path/to/something/else.clj')).to.equal('else');
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

  it('Should throw when no config object is passed', function() {
    expect(boosh).to.throw(Error, 'Invariant Violation: Expected a configuration object.');
  });

  it('Should throw when required options are not passed', function() {
    expect(boosh.bind(boosh, {
      in: null,
      out: '/path/to/file',
    })).to.throw(Error, 'Invariant Violation: Configuration object must have an `in` property.');

    expect(boosh.bind(boosh, {
      in: '/path/to/file',
      out: null,
    })).to.throw(Error, 'Invariant Violation: Configuration object must have an `out` property.');

    expect(boosh.bind(boosh, {
      in: '/path/to/file',
      out: '/path/to/file',
    })).to.not.throw();
  });

  it('Should accept entry and output as valid forms of in or out', function() {
    expect(boosh.bind(boosh, {
      entry: '/path/to/file',
      out: '/path/to/file',
    })).to.not.throw();

    expect(boosh.bind(boosh, {
      in: '/path/to/file',
      output: '/path/to/file',
    })).to.not.throw();

    expect(boosh.bind(boosh, {
      entry: '/path/to/file',
      output: '/path/to/file',
      isDev: true,
    })).to.not.throw();
  });

  it('Should not export an object with custom options defined', function() {
    var config = boosh({
      in: '/path/to/file',
      out: '/path/to/file',
      cleanOnBuild: true,
      isDev: true,
      https: true,
      port: 8888,
      define: { something: 'else' },
    });

    expect(config.in).to.be.undefined;
    expect(config.out).to.be.undefined;
    expect(config.isDev).to.be.undefined;
    expect(config.cleanOnBuild).to.be.undefined;
    expect(config.https).to.be.undefined;
    expect(config.port).to.be.undefined;
    expect(config.define).to.be.undefined;
    expect(config.entry).to.be.ok;
    expect(config.output).to.be.ok;
  });

  it('Should pass the https param in to dev server', function() {
    var config = boosh(Object.assign({}, validConfig, { https: true }));
    expect(config.devServer.https).to.be.true;
  });

  it('Should pass the port param in to dev server', function() {
    var config = boosh(Object.assign({}, validConfig, { port: 1234 }));
    expect(config.devServer.port).to.equal(1234);
  });

  it('Should base input keys on filenames', function() {
    var config = boosh({
      in: 'oh-hai.js',
      out: 'some/path/',
      isDev: false,
    });

    expect(config.entry).to.have.key('oh-hai');
  });

  it('Can take a hash as input to the `in` parameter', function() {
    var obj = {
      in: {
        ohHai: 'oh-hai.js',
        login: 'src/login.js',
      },
      out: 'some/path/',
      isDev: false,
    };

    var config = boosh(obj);

    expect(config.entry).to.eql(obj.in);

    obj.isDev = true;

    config = boosh(obj);

    expect(config.entry.ohHai).to.contain(obj.in.ohHai);
    expect(config.entry.login).to.contain(obj.in.login);
  });

  it('Should allow overwriting via standard webpack config', function() {
    var config = boosh({
      in: 'app.js',
      out: 'some/path/',
      isDev: true,
    });

    expect(config.entry.app).to.be.instanceOf(Array);

    config = boosh({
      out: 'bleh',
      entry: {
        app: 'some/thang.js',
      },
    });

    expect(config.entry.app).to.equal('some/thang.js');
  });
});

