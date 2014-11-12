"use strict";

var async = require('async');
var path = require('path');
var express = require('express');
var UglifyJS = require('uglify-js');
var packager = require('mootools-packager');
var getFiles = require('../lib/getFiles');
var projectPath = require('../lib/projectPath');
var bodyParser = require('body-parser');
var pkgProjects = require('../package.json')._projects;
var builderHash = require('../lib/BuilderHash')(require('../config/databases.json'));
var copyright = '/* MooTools: the javascript framework. license: MIT-style license. copyright: Copyright (c) 2006-' + new Date().getFullYear() + ' [Valerio Proietti](http://mad4milk.net/).*/ ';

function uglify(source){
	var uglifyed = UglifyJS.minify(source, {
		fromString : true,
		mangle: ['sort'] // to assign shorter names to most frequently used variables.
	});
	return uglifyed.code;
}

function processPost(req, res, next){

	var postData = req.body;
	var minified = postData.minified;
	var project = postData.project;
	var project_ = project.toLowerCase();

	if (!pkgProjects[project_]) {
		var e = new Error('This project does not exist');
		e.status = 404;
		next(e);
		return;
	}

	var version = pkgProjects[project_].versions[0];
	var modules = !postData.modules ? [project + '/*'] : postData.modules;
	if (postData.removeCoreDependencies == 'removeNone') modules.unshift('Core/*');

	function packageFile(cb) {

		var corePath = projectPath('core', version);
		var morePath = projectPath('more', version);

		var packagerOptions = {
			name: {
				Core: corePath,
				More: morePath
			},
			noOutput: true,
			callback: function(data){
				cb(null, data);
			},
			removeCoreDependencies: postData.removeCoreDependencies == 'removeAll'
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
	}

	function hash(cb){
		if (!modules || minified) return cb();
		builderHash.save(project_, modules, cb);
	}

	async.parallel([packageFile, hash], function(err, results){
		if (err) return next(err);

		var filename = ['MooTools-', project, '-', version, (postData.compat ? '-compat' : '') + (minified ? '-compressed' : ''), '.js'].join('');
		var data = results[0];
		if (minified) data = uglify(data);

		data = copyright + '\n' +
			(results[1] ? '/*\nWeb Build: http://mootools.net/' + project_ + '/builder/' + results[1].hash + '\n*/\n' : '') +
			data;

		res.setHeader('Content-Type', 'application/javascript');
		res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
		res.write(data);
		res.end();
	});
}

module.exports = function(app){
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.post('/builder', processPost);
};
