"use strict";

var docs = require('../middleware/docs')('core', {
	title: "MooTools Core Documentation"
});

var guides = require('../middleware/guides')('core', {
	title: "MooTools Core Guides"
});

var project = 'core';
var versions = require('../package.json')._projects[project].versions;
var lastVersion = versions[0];

module.exports = function(app){

	var core = function(req, res, next){
		res.locals.site = 'core';
		next();
	};

	app.get('/core', core, function(req, res){
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

		res.render('core/index', {
			page: "/core",
			title: "MooTools Core",
			navigation: 'core',
			versions: links
		});
	});
	
	app.get('/core/builder', function(req, res){
		res.render('builder/index', {
			title: 'MooTools Core Builder',
			navigation: 'core',
			page: 'builder',
			project: 'Core',
			version: lastVersion,
			dependencies: require('../builder/dependencies.js')(project, lastVersion)
		});
	});

	app.all('/core/docs/:version/:module/:file?', core, docs);	
	app.get('/core/docs', core, docs);
	app.get('/core/docs/:version', core, docs);

	app.get('/core/guides', core, guides.index);
	app.get('/core/guides/:guide', core, guides.article);

};
