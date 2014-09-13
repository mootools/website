"use strict";

var docs = require('../middleware/docs')('core', {
	title: "MooTools Core Documentation"
});

var guides = require('../middleware/guides')('core', {
	title: "MooTools Core Guides"
});

var project = 'core';
var lastVersion = require('../package.json')._projects[project].versions[0];

module.exports = function(app){

	var core = function(req, res, next){
		res.locals.site = 'core';
		next();
	};

	app.get('/core', core, function(req, res){
		res.render('core/index', {
			page: "/core",
			title: "MooTools Core"
		});
	});
	
	app.get('/core/builder', function(req, res){
		res.render('builder/index', {
			title: 'MooTools Core Builder',
			page: 'builder',
			project: 'Core',
			version: lastVersion,
			dependencies: require('../builder/dependencies.js')(project, lastVersion)
		});
	});

	app.all('/core/docs/:module/:file/:version?', core, docs);	
	app.get('/core/docs', core, docs);
	app.get('/core/docs/:version', core, docs);

	app.get('/core/guides', core, guides.index);
	app.get('/core/guides/:guide', core, guides.article);

};
