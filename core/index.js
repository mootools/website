"use strict";

var project = 'core';

var docs = require('../middleware/docs')(project, {
	title: "MooTools Core Documentation"
});

var guides = require('../middleware/guides')(project, {
	title: "MooTools Core Guides"
});

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

module.exports = function(app){

	var core = function(req, res, next){
		res.locals.site = 'core';
		next();
	};

	app.get('/core', core, function(req, res){
		res.render('core/index', {
			page: "/core",
			title: "MooTools Core",
			navigation: 'core',
			project: 'Core',
			version: versions[0],
			versions: links
		});
	});

	app.get('/core/builder/:hash?', hash, function(req, res){
		res.render('builder/index', {
			title: 'MooTools Core Builder',
			navigation: 'core',
			page: 'builder',
			project: 'Core',
			site: 'core',
			hashDependencies: res.locals.hash || [],
			version: versions[0],
			versions: links,
			dependencies: require('../builder/dependencies.js')(project, versions[0])
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
