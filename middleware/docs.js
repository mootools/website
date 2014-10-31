"use strict";

var fs = require('fs');
var path = require('path');
var async = require('async');
var pkg = require('../package.json');
var waitForIt = require('../lib/waitForIt');
var loadJSON = require('../lib/loadJSON');
var associate = require('../lib/associate');
var debounce = require('../lib/debounce');
var getFiles = require('../lib/getFiles');

function getSubmodules(dir, project, version, callback){
	var cache = {};
	var docsPath = path.join(dir, project + '-' + version, 'Docs');
	var docsIntro = pkg._projects[project].docsIntro;
	async.each(getFiles(docsPath, [], '.md'), function(file, cb){
		var moduleName = path.basename(file, '.md');
		if (file.indexOf(docsIntro) != -1) moduleName = 'docsIntro';
		fs.readFile(dir + '/content-' + moduleName + '-' + version + '.html', 'utf-8', function(err, data){
			cache[moduleName] = data;
			cb();
		});
	}, function(){
		callback(null, cache);
	});
}

function loadDocsVersion(dir, project, version, callback){
	async.parallel([
		async.apply(getSubmodules, dir, project, version),
		async.apply(loadJSON, dir + '/toc-' + version + '.json')
	], function(err, res){
		callback(err, {content: res && res[0], toc: res && res[1]});
	});
}

function loadDocsVersions(dir, project, versions, callback){
	var _loadDocsVersion = async.apply(loadDocsVersion, dir, project);
	async.map(versions, _loadDocsVersion, function(err, results){
		callback(err, {
			docs: associate(versions, results),
			versions: versions,
			latest: versions[0]
		});
	});
}

module.exports = function(project, options){

	if (!project){
		throw new Error("'project' argument is required");
	}

	if (!options) options = {};
	if (!options.title) options.title = project;
	var dir = path.join(__dirname, '../', pkg._buildOutput, project, 'docs');
	var getVersions = async.apply(loadJSON, dir + '/versions.json');
	var getDocsContent = async.apply(loadDocsVersions, dir, project);
	var loadDocs = waitForIt(async.compose(getDocsContent, getVersions));

	fs.watch(dir, debounce(function(){
		console.log('resetting ' + dir + ' docs data');
		loadDocs.reset();
	}));

	return function(req, res, next){

		loadDocs.get(function(err, data){
			if (err) return next(err);

			var docs = data.docs;
			var versions = data.versions;
			var latest = data.latest;
			var version = req.params.version || latest;
			var submodule = req.params.file;
			var content = docs[version].content[submodule ? submodule : 'docsIntro'];

			if (!docs[version]) version = latest;
			if (!req.params.version) res.redirect('/' + project + '/docs/' + latest);

			res.render(project + '/docs', {
				page: "/" + project + "/docs",
				title: options.title,
				navigation: project,
				content: content,
				toc: docs[version].toc,
				version: version,
				versions: versions,
				file: req.params.file
			});

		});
	};
};
