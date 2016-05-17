/**
 * Created by emugisha on 5/16/2016.
 */
'use strict';
var fs = require('fs'),
  _s = require('underscore.string'),
  os = require('os');

function insertInto(file, startPoint, endPoint, text) {
  var fileString = fs.readFileSync(file, 'utf8');
  var destination = fileString.lastIndexOf(startPoint);
  var origin = fileString.indexOf(endPoint, destination);
  fileString = _s.insert(fileString, destination + (origin - destination), text);
  fs.writeFileSync(file, fileString);
}

function appendTo(file, template, token) {
  var fileString = fs.readFileSync(file, 'utf8');
  fileString = fileString.replace(token, template);
  fs.writeFileSync(file, fileString);
}

function addNewModule(file, after, newModule) {
  insertInto(file, after, ',', ',\n\t\t\t\t\t\'' + newModule + '\'');
}

function addToIndexHtmlFile(state, type) {
  var tag = '<script type="text/javascript" src="states/' + state +'/'+ state +type+'"></script>' + os.EOL;
  insertInto('www/index.html', '<!-- generatorinsert -->', '<!-- endgeneratorinsert -->', tag);
}

module.exports = {
  addToIndexHtmlFile:addToIndexHtmlFile,
  addNewModule:addNewModule

};
