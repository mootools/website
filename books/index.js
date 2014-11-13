"use strict";

var books = require('./books.js');

module.exports = function(app){

	app.get('/books', function(req, res){
		res.render('books/index', {
			site: "books",
			title: "MooTools Books",
			books: books
		});
	});
};
