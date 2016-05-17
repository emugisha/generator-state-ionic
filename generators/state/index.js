'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var utils = require('../utils/utils');
var _s = require('underscore.string');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'state',
      message: 'Enter the name of the state: ',
      default: this.appname
    }];

    return this.prompt(prompts).then(function (answers) {
      // To access props later use this.props.someAnswer;
      this.data = answers;
      this.log('Captured answers');

      done();
    }.bind(this));
  },

  writing: function () {
   this.log(this.data);
   var state = this.data.state;

    //Controller
    this.fs.copyTpl(
      this.templatePath('_controller.txt'),
      this.destinationPath('www/states/'+state+'/'+state+'.controller.js'),
      {data:this.data,
        controllerName: _s.capitalize(state,true)+'Controller',
        appName:this.appname}
    );

    //Config file
    this.fs.copyTpl(
      this.templatePath('config.js'),
      this.destinationPath('www/states/'+state+'/'+state+'.config.js'),
      {data:this.data,
        appName:this.appname}
    );

    //view/temlate
    this.fs.copyTpl(
      this.templatePath('view.html'),
      this.destinationPath('www/states/'+state+'/'+state+'.html'),
      {data:this.data,
        appName:this.appname}
    );

    //test file
    this.fs.copyTpl(
      this.templatePath('_spec.js'),
      this.destinationPath('www/states/'+state+'/'+state+'.spec.js'),
      {data:this.data,
        appName:this.appname}
    );

    utils.addToIndexHtmlFile(state,'.config.js');
    utils.addToIndexHtmlFile(state,'.controller.js')
    utils.addToIndexHtmlFile(state,'.controller.spec.js')
    utils.addNewModule('www/app.modules.js','ionic',this.appname+'.states.'+state);

  },

  install: function () {
    this.installDependencies();
  }
});
