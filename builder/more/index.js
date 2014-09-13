"use strict";

var project = 'more';
var lastVersion = require('../../package.json')._projects[project].versions[0];

module.exports = function(app){

	app.get('/builder/more', function(req, res){
		res.render('builder/index', {
			title: 'MooTools More Builder',
			page: 'builder',
			project: 'More',
			version: lastVersion,
			dependencies: require('../dependencies.js')(project, lastVersion)
		});
	});
};
