"use strict";

var docs = require('./docs');
var guides = require('./guides');

module.exports = function(app){

	app.get('/moofx', function(req, res){
		res.render('moofx/index', {
			page: "/moofx",
			title: "MooTools Fx",
      site: 'moofx'
		});
	});

	//app.get('/moofx/docs', docs);
	//app.get('/moofx/docs/:version', docs);
    
  app.get('/moofx/guides', guides.index);
  app.get('/moofx/guide/:guide', guides.article);

};
