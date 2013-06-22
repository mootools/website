"use strict";

var fs = require('fs');
var path = require('path');
var pkg = require('../package.json');

module.exports = function(project, options){

	if (!project){
		throw new Error("'project' argument is required");
	}

	if (!options) options = {};
	if (!options.title) options.title = project;

	var versions;

	var dir = path.join(__dirname, '../', pkg._buildOutput, project, 'docs');
	var JSONPath = dir + '/versions.json';

	try {
		versions = require(JSONPath);
	} catch(e){
		console.error("did you run 'node build/docs.js " + project + "'?");
		throw e;
	}

	var latest = versions[0];
	var docs = {};

	versions.forEach(function(version){
		docs[version] = {
			content: fs.readFileSync(dir + '/content-' + version + '.html'),
			toc: require(dir + '/toc-' + version + '.json')
		};
	});

	return function(req, res){

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

	};

};
