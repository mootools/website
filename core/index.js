"use strict";

var project = 'core';

var docs = require('../middleware/docs')(project, {
	title: "MooTools Core Documentation"
});

var guides = require('../middleware/guides')(project, {
	title: "MooTools Core Guides"
});

var fs = require('fs');
var path = require('path');
var async = require('async');
var debounce = require('../lib/debounce');
var waitForIt = require('../lib/waitForIt');
var hash = require('../middleware/buildHash')(project);
var pkgReader = require('../middleware/packageJSONreader')(project);
var pkgProject = pkgReader();

var loadPackages = waitForIt(async.apply(require('../builder/dependencies.js'), project, pkgProject.lastVersion));
var dir = path.join(__dirname, '..', pkgProject.buildOutput, project, 'docs');

function getLinks(versions){
	return versions.slice(1).map(function(version){
		return {
			version: version,
			files: ['compat', 'yui-compressed', 'nocompat', 'nocompat-yui-compressed'].map(function(key){
				var link = 'http://ajax.googleapis.com/ajax/libs/mootools/'+ version + '/mootools' + ((key == 'compat') ? '' : '-' + key) + '.js';
				return {link: link, label: key};
			})
		};
	});
};
var links = getLinks(pkgProject.versions);

fs.watch(dir, debounce(function(){
	console.log('resetting ' + dir + ' docs data');
	loadPackages.reset();
	
	console.log('resetting package.json data');
	pkgProject = pkgReader();
	links = getLinks(pkgProject.versions);
}));

module.exports = function(app){

	var core = function(req, res, next){
		res.locals.site = 'core';
		next();
	};

	app.get('/core', core, function(req, res){
		res.render('core/index', {
			title: "MooTools Core",
			navigation: 'core',
			project: 'Core',
			version: pkgProject.lastVersion,
			versions: links
		});
	});

	app.get('/core/builder/:hash?', hash, core, function(req, res){
		loadPackages.get(function(err, packages){
			res.render('builder/index', {
				title: 'MooTools Core Builder',
				navigation: 'builder',
				project: 'Core',
				hashDependencies: res.locals.hash || [],
				version: pkgProject.lastVersion,
				versions: links,
				dependencies: packages
			});
		});
	});

	app.get('/core/docs', core, docs);
	app.get('/core/docs/:version', core, docs);
	app.all('/core/docs/:version/*', core, docs);

	app.get('/core/guides', core, guides.index);
	app.get('/core/guides/:guide', core, guides.article);

	// hash build redirect
	app.get('/core/:hash', function(req, res){
		res.redirect('/core/builder/' + req.params.hash);
	});

};
