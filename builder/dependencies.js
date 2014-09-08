"use strict";

var YAML = require('js-yaml');
var fs = require("fs");

function makeString(type){
	if (!type) return '';
	return typeof type == 'string' ? type : type.join(', ');
}

module.exports = function(component){
	// get all files in sub-directories
	var path = 'cache/'+component+'/docs/'+component+'-1.5.1/Source';
	var files = (function getFiles(dir,files_){
		files_ = files_ || [];
		if (typeof files_ === 'undefined') files_=[];
		var files = fs.readdirSync(dir);
		for(var i in files){
			if (!files.hasOwnProperty(i)) continue;
			var name = dir+'/'+files[i];
			if (fs.statSync(name).isDirectory()){
				getFiles(name,files_);
			} else {
				files_.push(name);
			}
		}
		return files_;
	})(path);

	// get YAML info from each file
	// TODO: add a filter for server build
	var filesInfo = {};
	files.forEach(function(file){
		var content = fs.readFileSync(file, "utf8");
		var src = file.match(/\/([^\/]*)\.js$/);
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

