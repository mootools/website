"use strict";

var YAML = require('js-yaml');
var fs = require("fs");
var getFiles = require('../lib/getFiles');
var packager = require('mootools-packager');
var DESC_REGEXP = /\/\*\s*^---([\s\S]+?)^(?:\.\.\.|---)\s*\*\//mg;

function makeString(type){
	if (!type) return '';
	return typeof type == 'string' ? type : type.join(', ');
}

module.exports = function(project, version){
	// get all files in sub-directories
	var path = 'cache/' + project + '/docs/' + project + '-' + version + '/Source';
	var files = getFiles(path, [], '.js');
	var packagerOptions = {
		name: project.charAt(0).toUpperCase() + project.substring(1),
		noOutput: true,
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

	var filesInfo = {};
	packager(files, packagerOptions);
	return filesInfo;
};
