'use strict';
var chalk = require('chalk');
var superb = require('superb');
var _s = require('underscore.string');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.blue('Hapi ES2015') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What would you like to call this project?',
        default: this.appname.replace(/\s/g, '-'),
        filter: function(val) {
          return _s.slugify(val);
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Describe your service',
        default: 'My ' + superb() + ' service.'
      },
      {
        name: 'githubUsername',
        message: 'What is the GitHub username?',
        store: true,
        validate: function(val) {
          return val.length > 0 ? true : 'You have to provide a username';
        }
      }
    ];

    this.prompt(prompts, function (props) {
      props.name = this.user.git.name();
      props.email = this.user.git.email();
      props.serviceId = _s.camelize(props.projectName);
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },
  writing: {
    serviceFiles: function() {
      this.template('_package.json', 'package.json', this.props);
      this.template('_README.md', 'README.md', this.props);
      this.template('_deploy.sh', 'deploy.sh', this.props);
      this.template('_Dockerfile', 'Dockerfile', this.props);
      this.template('src/_server.js', 'src/server.js', this.props, {
        // Prevent templating of ecmascript6 {} deconstruction syntax as template vars.
        interpolate: /<%=([\s\S]+?)%>/g
      });
      this.template('src/lib/_loadPlugins.js', 'src/lib/loadPlugins.js', this.props, {
        // Prevent templating of ecmascript6 {} deconstruction syntax as template vars.
        interpolate: /<%=([\s\S]+?)%>/g
      });

      this.copy('src/lib/foo.test.js', 'src/lib/foo.test.js');
    },
    configFiles: function() {
      this.copy('dockerignore', '.dockerignore');
      this.copy('gitignore', '.gitignore');
      this.copy('travis.yml', '.travis.yml');
    }
  },
	install: function() {
		this.installDependencies({bower: false});
	}
});
