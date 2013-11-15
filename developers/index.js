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
		developersData.developers = developersData.developers.sort(randomSort);
		developersData.alumni = developersData.alumni.sort(randomSort);
		res.render('developers/index', {
			page: "/developers",
			title: "MooTools Developers",
			developersData: developersData
		});
	});

};

