"use strict";

module.exports = function(app){
	
	var developersData = require('./developers');
	
	var randomSort = function(){
		return 0.5 - Math.random()
	};
	developersData.developers = developersData.developers.sort(randomSort);
	developersData.alumni = developersData.alumni.sort(randomSort);

	var developers = function(req, res, next){
		res.locals.site = 'developers';
		next();
	};

	app.get('/developers', developers, function(req, res){
		res.render('developers/index', {
			page: "/developers",
			title: "MooTools Developers",
			developersData: developersData
		});
	});

};

