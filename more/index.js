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
			navigation: 'more',
			page: "/more",
			project: 'More',
			version: lastVersion,
			title: "MooTools More"
		});
	});

	app.get('/more/builder/:hash?', function(req, res){
		var hash = req.params.hash;
		res.render('builder/index', {
			title: 'MooTools More Builder',
			navigation: 'more',
			page: 'builder',
			project: 'More',
			site: 'more',
			hashDependencies: getHashDependencies(hash),
			version: lastVersion,
			dependencies: require('../builder/dependencies.js')(project, lastVersion)
		});
	});

	app.get('/more/docs', more, docs);
	app.get('/more/docs/:version', more, docs);
	app.all('/more/docs/:version/*', more, docs);

	app.get('/more/guides', more, guides.index);
	app.get('/more/guides/:guide', more, guides.article);

	// hash build redirect
	var regex = /more\/([a-z]+[0-9]+[a-z0-9]*|[0-9]+[a-z]+[a-z0-9]*)$/;
	app.get(regex, function(req, res){
		var hash = req.url.match(regex)[1];
		res.redirect('/more/builder#' + hash);
	});

};
