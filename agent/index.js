"use strict";

var docs = require('./docs');
var guides = require('./guides');

module.exports = function(app){

	app.get('/agent', function(req, res){
		res.render('agent/index', {
			page: "/agent",
			title: "MooTools Fx",
      site: 'agent'
		});
	});

	//app.get('/agent/docs', docs);
	//app.get('/agent/docs/:version', docs);
    
  app.get('/agent/guides', guides.index);
  app.get('/agent/guide/:guide', guides.article);

};
