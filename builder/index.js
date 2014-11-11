"use strict";

var path = require('path');
var express = require('express');
var UglifyJS = require('uglify-js');
var packager = require('mootools-packager');
var getFiles = require('../lib/getFiles');
var projectPath = require('../lib/projectPath');
var bodyParser = require('body-parser');
var pkgProjects = require('../package.json')._projects;
var builderHash = require('../middleware/builderHash')(Object.keys(pkgProjects));
var copyright = '/* MooTools: the javascript framework. license: MIT-style license. copyright: Copyright (c) 2006-' + new Date().getFullYear() + ' [Valerio Proietti](http://mad4milk.net/).*/ ';


function uglify(source){
	var uglifyed = UglifyJS.minify(source, {
		fromString : true,
		mangle: ['sort'] // to assign shorter names to most frequently used variables.
	});
	return copyright + uglifyed.code;
}

function processPost(req, res){

	var postData = req.body;
	var minified = postData.minified;
	var project = postData.project;
	var version = pkgProjects[project.toLowerCase()].versions[0];

	var corePath = projectPath('core', version);
	var morePath = projectPath('more', version);

	var modules = !postData.modules ? [project + '/*'] : postData.modules;
	var packagerOptions = {
		name: {
			Core: corePath,
			More: morePath
		},
		noOutput: true,
		callback: stream,
		removeCoreDependencies: postData.removeCoreDependencies
	};

	if (modules.length) packagerOptions.only = modules;
	if (!postData.compat) packagerOptions.strip = ['.*compat'];

	// get all files and send to packager
	var sourceFiles = [corePath, morePath].reduce(function(files, folder){
		var folderPath = path.join(__dirname, '/../', folder);
		return getFiles(folderPath, files, '.js');
	}, []);

	// compile files
	packager(sourceFiles, packagerOptions);

	// callback from packager
	function stream(data){
		var filename = ['MooTools-', project, '-', version, (postData.compat ? '-compat' : '') + (minified ? '-compressed' : ''), '.js'].join('');
		if (minified) data = uglify(data);
		res.setHeader('Content-Type', 'application/javascript');
		res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
		res.write(data);
		res.end();
	}
}
function hash(req, res, next){
	if (!req.query.packages) return res.end();
	builderHash.save(req.query.project, req.query.packages, function(data) {
		res.locals.hash = data.hash;
		next();
	});
}
module.exports = function(app){
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.post('/builder', processPost);
	app.get('/builder', hash, function(req, res){
		res.send({
			hash: res.locals.hash,
			project: req.query.project
		});
	});
};
