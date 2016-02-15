"use strict";

var fs = require('fs');
var path = require('path');
var async = require('async');
var pkg = require('../package.json');
var waitForIt = require('../lib/waitForIt');
var getFiles = require('../lib/getFiles');
var loadJSON = require('../lib/loadJSON');
var associate = require('../lib/associate');
var debounce = require('../lib/debounce');


function filterToc(file, cb){
	cb(!fs.statSync(file).isDirectory() && file.indexOf('toc-demos.json') == -1 && file.slice(-4) == 'json');
}

function loadFiles(dir, callback){

	var addPath = function(files, cb){
		async.map(files, function(fileName, cbMap){
			cbMap(null, path.join(dir, fileName));
		}, cb);
	}
	var filterFiles = function(files, cb){
		async.filter(files, filterToc, function(filtered){
			// to sort files alphabetically without file extension interfering 
			var orderedFiles = filtered.map(function(file){
				return file.slice(0, -5);
			}).sort().map(function(file){
				return file + '.json';
			});
			cb(null, orderedFiles);
		});
	}
	var addContent = function(arr, cb){
		async.map(arr, loadJSON, cb);
	}
	var loadToc = function(filesContent, cb){
		loadJSON(dir + '/toc-demos.json', function(err, data){
			cb(err, !err && {
				content: associate(Object.keys(data), filesContent),
				toc: data
			});
		});
	}
	var compiler = async.compose(loadToc, addContent, filterFiles, addPath, fs.readdir);
	compiler(dir, callback);
}

module.exports = function(project, options){

	if (!project){
		throw new Error("'project' argument is required");
	}

	if (!options) options = {};
	if (!options.title) options.title = project;

	var dir = path.join(__dirname, '..', pkg._buildOutput, project, 'docs');
	var files = async.apply(loadFiles, dir);
	var loadDemos = waitForIt(files);

	fs.watch(dir, debounce(function(){
		console.log('resetting ' + dir + ' docs data');
		loadDemos.reset();
	}));

	function send404(next){
		var err404 = new Error();
		err404.status = 404;
		next(err404);
	}

	return function(req, res, next){

		loadDemos.get(function(err, results){

			if (err) return next(err);
			var demo = req.query.demo || Object.keys(results.content)[0];
			var toc = results.toc[demo];
			var data = results.content[demo];
			if (!data) return send404(next);
			
			res.render(project, {
				title: options.title,
				navigation: 'demos',
				content: data,
				description: data.details,
				demoName: toc.description.name,
				dependencies: toc.description.dependencies || 'dependencies/more/',
				version: pkg._projects.core.versions[0],
				toc: results.toc
			});
		});
	};
};
