"use strict";

module.exports = function(app){

	var developersData = require('./developers');

	var randomSort = function(){
		return 0.5 - Math.random();
	};

	var developers = function(req, res, next){
		res.locals.site = 'developers';
		next();
	};

	app.get('/developers', developers, function(req, res){

		Object.keys(developersData).forEach(function(section){
			developersData[section] = developersData[section].sort(randomSort);
		});
		res.render('developers/index', {
			site: "mootools",
			title: "MooTools Developers",
			developersData: developersData
		});
	});

};

