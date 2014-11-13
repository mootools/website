"use strict";

var fs = require('fs');
var path = require('path');
var async = require('async');
var pkg = require('../package.json');
var waitForIt = require('../lib/waitForIt');
var loadJSON = require('../lib/loadJSON');
var associate = require('../lib/associate');
var debounce = require('../lib/debounce');

function loadToc(dir, version, callback){
	loadJSON(dir + '/toc-' + version + '.json', function(err, data){
		callback(err, !err && {
			dir: dir,
			toc: data,
			version: version
		});
	});
}

function loadDocData(info, callback){
	async.map(info.toc, function(page, cb){
		fs.readFile(info.dir + '/content-' + page.file + '-' + info.version + '.html', 'utf-8', cb);
	}, function(err, files){
		if (err) return callback(err);
		var contentPaths = info.toc.map(function(page){
			return page.path;
		});
		callback(err, {
			content: associate(contentPaths, files),
			toc: info.toc
		});
	});
}

function loadDocsContent(dir, version, callback){
	async.parallel([
		async.apply(fs.readFile, dir + '/content-' + version + '.html', 'utf-8'),
		async.apply(async.compose(loadDocData, loadToc), dir, version)
	], function(err, res){
		callback(err, !err && {
			defaultContent: res[0],
			content: res[1].content,
			toc: res[1].toc
		});
	});
}

function loadDocsVersions(dir, versions, callback){
	var _loadDocsVersion = async.apply(loadDocsContent, dir);
	async.map(versions, _loadDocsVersion, function(err, results){
		callback(err, !err && {
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

	var dir = path.join(__dirname, '..', pkg._buildOutput, project, 'docs');
	var getVersions    = async.apply(loadJSON, dir + '/versions.json');
	var getDocsContent = async.apply(loadDocsVersions, dir);
	var loadDocs       = waitForIt(async.compose(getDocsContent, getVersions));

	fs.watch(dir, debounce(function(){
		console.log('resetting ' + dir + ' docs data');
		loadDocs.reset();
	}));

	function send404(next){
		var err404 = new Error();
		err404.status = 404;
		next(err404);
	}

	return function(req, res, next){

		loadDocs.get(function(err, data){
			if (err) return next(err);

			var docs = data.docs;
			var versions = data.versions;
			var version = req.params.version;
			var file = req.params[0];

			if (!version){
				res.redirect('/' + project + '/docs/' + data.latest);
				return;
			}

			var doc = docs[version];

			if (!doc) return send404(next);

			var content = file ? doc.content[file] : doc.defaultContent;
			var toc = doc.toc;

			if (!content) return send404(next);

			res.render(project + '/docs', {
				title: options.title,
				navigation: 'docs',
				content: content,
				toc: toc,
				version: version,
				versions: versions,
				file: file
			});

		});
	};
};
