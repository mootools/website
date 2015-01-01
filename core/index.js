"use strict";

var project = 'core';

var docs = require('../middleware/docs')(project, {
	title: "MooTools Core Documentation"
});

var guides = require('../middleware/guides')(project, {
	title: "MooTools Core Guides"
});

var async = require('async');
var waitForIt = require('../lib/waitForIt');
var hash = require('../middleware/buildHash')(project);
var pkgProject = require('../package.json')._projects[project];
var versions = pkgProject.versions;

var links = versions.slice(1).map(function(version){
	return {
		version: version,
		files: ['compat', 'yui-compressed', 'nocompat', 'nocompat-yui-compressed'].map(function(key){
			return {
				link: 'http://ajax.googleapis.com/ajax/libs/mootools/'+ version + '/mootools' + ((key == 'compat') ? '' : '-' + key) + '.js',
				label: key
			};
		})
	};
});
var latestVersion = versions[0]; // todo: use fs.watch to update latest version
var loadPackages = waitForIt(async.apply(require('../builder/dependencies.js'),project, latestVersion));

	
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
			version: latestVersion,
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
				version: latestVersion,
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
