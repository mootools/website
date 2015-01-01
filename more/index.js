"use strict";

var project = 'more';

var docs = require('../middleware/docs')(project, {
	title: "MooTools More Documentation"
});

var guides = require('../middleware/guides')(project, {
	title: "MooTools More Guides"
});

var async = require('async');
var waitForIt = require('../lib/waitForIt');
var hash = require('../middleware/buildHash')(project);
var pkgProject = require('../package.json')._projects[project];
var versions = pkgProject.versions;
var latestVersion = versions[0]; // todo: use fs.watch to update latest version
var loadPackages = waitForIt(async.apply(require('../builder/dependencies.js'),project, latestVersion));

module.exports = function(app){

	var more = function(req, res, next){
		res.locals.site = 'more';
		next();
	};

	app.get('/more', more, function(req, res){
		res.render('more/index', {
			navigation: 'more',
			project: 'More',
			version: latestVersion,
			title: "MooTools More"
		});
	});

	app.get('/more/builder/:hash?', hash, more, function(req, res){
		loadPackages.get(function(err, packages){
			res.render('builder/index', {
				title: 'MooTools More Builder',
				navigation: 'builder',
				project: 'More',
				hashDependencies: res.locals.hash || [],
				version: latestVersion,
				dependencies: packages
			});
		});
	});

	app.get('/more/docs', more, docs);
	app.get('/more/docs/:version', more, docs);
	app.all('/more/docs/:version/*', more, docs);

	app.get('/more/guides', more, guides.index);
	app.get('/more/guides/:guide', more, guides.article);

	// hash build redirect
	app.get('/more/:hash', function(req, res){
		res.redirect('/more/builder/' + req.params.hash);
	});

};
