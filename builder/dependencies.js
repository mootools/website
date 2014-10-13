"use strict";

var YAML = require('js-yaml');
var fs = require("fs");
var getFiles = require('../lib/getFiles');

function makeString(type){
	if (!type) return '';
	return typeof type == 'string' ? type : type.join(', ');
}

module.exports = function(project, version){
	// get all files in sub-directories
	var path = 'cache/' + project + '/docs/' + project + '-' + version + '/Source';
	var files = getFiles(path, [], '.js');

	// get YAML info from each file
	// TODO: add a filter for server build
	var filesInfo = {};
	files.forEach(function(file){
		var content = fs.readFileSync(file, "utf8");
		var src = file.match(/[\/\\]([^\/\\]*)\.js$/);

		if (src){
			var DESC_REGEXP = /\/\*\s*^---([.\s\S]*)^(?:\.\.\.|---)\s*\*\//m;
			var yamlHeader = YAML.load(content.match(DESC_REGEXP)[1] || '');
			filesInfo[src[1]] = {
				req: makeString(yamlHeader.requires), 
				prov: makeString(yamlHeader.provides), 
				desc: yamlHeader.description
			};
		}
	});
	return filesInfo;
};
