"use strict";

var fs = require('fs');
var path = require('path');
var async = require('async');
var pkg = require('../package.json');
var waitForIt = require('../lib/waitForIt');

function loadJSON(file, callback){

	fs.readFile(file, function(err, json){
		if (err) return callback(err);
		try {
			callback(null, JSON.parse(json));
		} catch (e){
			callback(e);
		}
	});

}

function loadDocsVersions(dir, versions, callback){
	var docs = {};
	async.each(versions, function(version, cb){
		async.parallel([
			async.apply(fs.readFile, dir + '/content-' + version + '.html', 'utf-8'),
			async.apply(loadJSON, dir + '/toc-' + version + '.json')
		], function(err, res){
			docs[version] = {content: res && res[0], toc: res && res[1]};
			cb(err, docs[version]);
		});
	}, function(err){
		callback(err, {
			docs: docs,
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

	var timer;
	fs.watch(dir, function(){
		clearTimeout(timer);
		timer = setTimeout(function(){
			console.log('resetting ' + dir + ' docs data');
			loadDocs.reset();
		}, 200);
	});

	return function(req, res, next){

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
