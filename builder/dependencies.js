"use strict";

var YAML = require('js-yaml');
var path = require('path');
var fs = require("fs");
var getFiles = require('../lib/getFiles');
var projectPath = require('../lib/projectPath');
var packager = require('mootools-packager');
var DESC_REGEXP = /\/\*\s*^---([\s\S]+?)^(?:\.\.\.|---)\s*\*\//mg;

function makeString(type){
	if (!type) return '';
	return typeof type == 'string' ? type : type.join(', ');
}
function capitalise(name){
	return name.charAt(0).toUpperCase() + name.slice(1);
}


module.exports = function(project, version){

	var isCore = project == 'core';
	var sourcePath = {
		Core: projectPath('core', version)
	};
	if (!isCore) sourcePath[capitalise(project)] = projectPath(project, version);

	var packagerOptions = {
		name: sourcePath,
		noOutput: true,
		removeCoreDependencies: !isCore,
		callback: function(src){
			var headers = src.match(DESC_REGEXP);
			headers.forEach(function(header){
				var yamlHeader = YAML.load(header.slice(2, -2));
				filesInfo[yamlHeader.name] = {
					req: makeString(yamlHeader.requires), 
					prov: makeString(yamlHeader.provides), 
					desc: yamlHeader.description
				};
			});
		}
	};

	var sourceFiles = Object.keys(sourcePath).map(function(proj){
		return sourcePath[proj];
	}).reduce(function(files, folder){
		var folderPath = path.join(__dirname, '/../', folder);
		return getFiles(folderPath, files, '.js');
	}, []);	

	var filesInfo = {};
	packager(sourceFiles, packagerOptions);
	return filesInfo;
};
