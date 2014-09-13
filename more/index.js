"use strict";

var docs = require('../middleware/docs')('more', {
	title: "MooTools More Documentation"
});

var guides = require('../middleware/guides')('more', {
	title: "MooTools More Guides"
});

var project = 'more';
var lastVersion = require('../package.json')._projects[project].versions[0];

module.exports = function(app){

	var more = function(req, res, next){
		res.locals.site = 'more';
		next();
	};

	app.get('/more', more, function(req, res){
		res.render('more/index', {
			page: "/more",
			title: "MooTools More"
		});
	});

	app.get('/more/builder', function(req, res){
		res.render('builder/index', {
			title: 'MooTools More Builder',
			page: 'builder',
			project: 'More',
			version: lastVersion,
			dependencies: require('../builder/dependencies.js')(project, lastVersion)
		});
	});

	app.all('/more/docs/:module/:file/:version?', more, docs);	
	app.get('/more/docs', more, docs);
	app.get('/more/docs/:version', more, docs);

	app.get('/more/guides', more, guides.index);
	app.get('/more/guides/:guide', more, guides.article);

};
