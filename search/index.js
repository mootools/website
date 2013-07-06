"use strict";

var request = require('request');

module.exports = function(app){

	var perPage = 3;

	app.get('/search', function(req, res){

		var query = req.query;

		var viewObject = {
			page: 'search',
			title: 'MooTools Search Results',
			results: {hits: []},
			q: query.q
		};

		if (!query.q){
			res.render('search/results', viewObject);
			return;
		}

		var qs = {
			q: query.q,
			pretty: true,
			size: perPage
		};

		if (query.from) qs.from = query.from;

		request.get('http://localhost:9200/page/blogging/_search', {
			qs: qs,
			json: true
		}, function(err, resp, body){
			viewObject.results = body;
			res.render('search/results', viewObject);
		});

	});

};
