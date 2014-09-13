"use strict";

var fs = require('fs');
var path = require('path');
var async = require('async');
var pkg = require('../package.json');
var waitForIt = require('../lib/waitForIt');
var loadJSON = require('../lib/loadJSON');
var associate = require('../lib/associate');
var debounce = require('../lib/debounce');

var requestedPath;

function loadDocsVersion(dir, version, callback){
	var submodule = requestedPath.file ? requestedPath.file + '-' : '';
	async.parallel([
		async.apply(fs.readFile, dir + '/content-' + submodule + requestedPath.version + '.html', 'utf-8'),
		async.apply(loadJSON, dir + '/toc-' + requestedPath.version + '.json')
	], function(err, res){
		callback(err, {content: res && res[0], toc: res && res[1]});
	});
}

function loadDocsVersions(dir, versions, callback){
	var _loadDocsVersion = async.apply(loadDocsVersion, dir);
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
	var getDocsContent = async.apply(loadDocsVersions, dir);
	var loadDocs = waitForIt(async.compose(getDocsContent, getVersions));

	fs.watch(dir, debounce(function(){
		console.log('resetting ' + dir + ' docs data');
		loadDocs.reset();
	}));

	return function(req, res, next){

		requestedPath = req.params;
		var latestVersion = pkg._projects[project].versions.sort().reverse()[0];
		if (!requestedPath.version) res.redirect(req.path + '/' + latestVersion);
		loadDocs.reset()

		loadDocs.get(function(err, data){
			if (err) return next(err);

			var docs = data.docs;
			var versions = data.versions;
			var latest = data.latest;

			var version = req.params.version || latest;
			if (!docs[version]) version = latest;

			res.render(project + '/docs', {
				page: "/" + project + "/docs",
				title: options.title,
				content: docs[version].content,
				toc: docs[version].toc,
				version: version,
				versions: versions
			});

		});
	};
};
