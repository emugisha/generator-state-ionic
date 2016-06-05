'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function () {

    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'service',
      message: 'Enter the name of the service',
      default: this.appname
    }];

    return this.prompt(prompts).then(function (answers) {
      // To access props later use this.props.someAnswer;
      this.data = answers;
      
      done();
    }.bind(this));
  },

  writing: function () {
    
    var service = this.data.service;
    
    //service.js
    this.fs.copyTpl(
      this.templatePath('_service.txt'),
      this.destinationPath('www/services/'+service+'/'+service+'.service.js'),
      {data:this.data,
        serviceName: _s.capitalize(service,true)+'Service',
        appName:this.appname}
    );

    //test file
    this.fs.copyTpl(
      this.templatePath('_spec.js'),
      this.destinationPath('www/service/'+service+'/'+service+'.service.spec.js'),
      {data:this.data,
        appName:this.appname}
    );
    
    //Add to index.html
    utils.addToIndexHtmlFile(service,'.service.js')
    utils.addToIndexHtmlFile(service,'.service.spec.js')
    utils.addNewModule('www/app.modules.js','ionic',this.appname+'.services.'+ service);
    
    
  }
  
});
