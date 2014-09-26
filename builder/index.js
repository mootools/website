"use strict";

var express = require('express');
var UglifyJS = require("uglify-js");
var packager = require('mootools-packager');
var getFiles = require('../lib/getFiles');

var copyright = '/* MooTools: the javascript framework. license: MIT-style license. copyright: Copyright (c) 2006-' + new Date().getFullYear() + ' [Valerio Proietti](http://mad4milk.net/).*/ ';
var allVersions = require('../package.json');

function uglify(source){
	var uglifyed = UglifyJS.minify(source, {
		fromString : true,
		mangle: ['sort'] // to assign shorter names to most frequently used variables. 
	});
	return copyright + uglifyed.code;
}

function projectPath(project_, version_){
	var versions = allVersions._projects[project_].versions;
	if (!~versions.indexOf(version_)) version_ = versions.filter(function(ver){
		return ver.slice(0, -2) <= version_.slice(0, -2); 
	})[0];
	return 'cache/' + project_.toLowerCase() + '/docs/' + project_.toLowerCase() + '-' + version_ + '/Source/';
}

function processPost(req, res){

	var postData = req.body;
	var compat = postData.compat;
	var minified = postData.minified;
	var project = postData.project;
	var version = postData.version;
	var removeCoreDependencies = postData.removeCoreDependencies;
	['removeCoreDependencies', 'compat', 'minified', 'project', 'version'].forEach(function(prop){
		delete postData[prop];
	});

	var sourcePath = [projectPath('core', version), projectPath('more', version)];
	var modules = Object.keys(postData).length == 0 ? [project + '/*'] : Object.keys(postData);
	var packagerOptions = {
		name: {
			Core: projectPath('core', version),
			More: projectPath('more', version)
		},
		noOutput: true,
		callback: stream,
		removeCoreDependencies: removeCoreDependencies
	};
	if (modules.length) packagerOptions.only = modules;
	if (!compat) packagerOptions.strip = ['.*compat'];

	// get all files and send to packager
	var sourceFiles = [];
	sourcePath.forEach(function(folder){
		var folderPath = __dirname + '/../' + folder;
		sourceFiles = getFiles(folderPath, sourceFiles, '.js');
	});

	// compile files
	packager(sourceFiles, packagerOptions);

	// callback from packager
	function stream(data){
		var filename = ['MooTools-', project, '-', version, (compat ? '-compat' : '') + (minified ? '-compressed' : ''), '.js'].join('');
		if (minified) data = uglify(data);

		res.setHeader('Content-Type', 'application/javascript');
		res.setHeader('Content-disposition', 'attachment; filename=' + filename);
		res.write(data, 'binary');
		res.end();
	}
}
	
module.exports = function(app){
	app.use(express.bodyParser());
	app.post('/builder', processPost);
};
