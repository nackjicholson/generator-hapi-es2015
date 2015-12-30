'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('generator', function () {
  beforeEach(function (cb) {
    var deps = ['../app'];

    helpers.testDirectory(path.join(__dirname, 'tmp'), function (err) {
      if (err) {
        cb(err);
        return;
      }

      this.generator = helpers.createGenerator('hapi-es2015', deps, null, {skipInstall: true});
      cb();
    }.bind(this));
  });

  it('generates expected files', function (cb) {
    var expected = [
      '.dockerignore',
      '.gitignore',
      '.travis.yml',
      'src/server.js',
      'src/lib/loadPlugins.js',
      'src/lib/foo.js',
      'test/foo.test.js',
      'deploy.sh',
      'Dockerfile',
      'package.json',
      'README.md'
    ];

    helpers.mockPrompt(this.generator, {
      projectName: 'my-test-service',
      githubUsername: 'test',
      description: 'test'
    });

    this.generator.run(function () {
      assert.file(expected);
      cb();
    });
  });
});
