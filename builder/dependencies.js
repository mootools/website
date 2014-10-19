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


module.exports = function(project, version){

	var sourcePath = {
		Core: projectPath('core', version),
		More: projectPath('more', version)
	};

	var packagerOptions = {
		name: sourcePath,
		noOutput: true,
		removeCoreDependencies: project != 'core',
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

	var sourceFiles = [sourcePath.Core, sourcePath.More].reduce(function(files, folder){
		var folderPath = path.join(__dirname, '/../', folder);
		return getFiles(folderPath, files, '.js');
	}, []);	

	var filesInfo = {};
	packager(sourceFiles, packagerOptions);
	return filesInfo;
};
