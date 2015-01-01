'use strict';

var fs = require('fs');
var path = require('path');
var async = require('async');
var YAML = require('js-yaml');
var pkg = require('../package.json');
var DESC_REGEXP = /\/\*\s*^---([\s\S]+?)^(?:\.\.\.|---)\s*\*\//mg;

function makeString(type){
	if (!type) return '';
	return typeof type == 'string' ? type : type.join(', ');
}

function getPackageYML(project, version, callback){
	var file = path.join(__dirname, '..', pkg._buildOutput, project, 'docs', project + '-' + version, 'package.yml');
	fs.readFile(file, 'utf-8', function(err, data){
		var modules = YAML.load(data).sources.map(function(module){
			return path.basename(module, '.js');
		});
		callback(err, modules);
	});
}

function getHeaders(project, version, callback){
	var SourceFolder = path.join(__dirname, '..', pkg._buildOutput, project, 'docs', project + '-' + version, 'Source');
	fs.readdir(SourceFolder, function(err, subFolders){
		subFolders = subFolders.filter(function(file){
			var filePath = path.join(SourceFolder, file);
			return fs.statSync(filePath).isDirectory();
		});
		async.map(subFolders, function(folder, cbFolder){
			var subFolder = path.join(SourceFolder, folder);
			fs.readdir(subFolder, function(err, files){
				async.map(files, function(file, cbFile){
					var filePath = path.join(subFolder, file);
					fs.readFile(filePath, 'utf-8', function(err, src){
						var header = src.match(DESC_REGEXP)[0];
						var yaml = YAML.load(header.slice(2, -2));
						cbFile(err, !err && {
							name: yaml.name,
							file: path.basename(file, '.js'),
							req: makeString(yaml.requires), 
							prov: makeString(yaml.provides), 
							desc: yaml.description
						});
					});
				}, function(err, files){
					cbFolder(err, files);
				});
			});
		}, function(err, headers){
			callback(err, headers);
		});	
	});
}

module.exports = function(project, version, callback){
	async.parallel([
		async.apply(getPackageYML, project, version),
		async.apply(getHeaders, project, version)
	], function(err, res){
		
		var headers = res[1].reduce(function(a, b){
			return a.concat(b);
		});
		var orderedModules = res[0].map(function(module, i){
			return headers.filter(function(obj){
				return obj.name == module || obj.file == module;
			})[0];
		});
		if (orderedModules.length != headers.length) console.log('Err: package.yml and files missmatch');
		callback(err, !err && orderedModules);
	});	
};

