"use strict";

var fs = require('fs');

var posts;
var JSONPath = './posts/posts.json';

try {
	posts = require(JSONPath);
} catch (e){
	console.error(JSONPath + " doesn not exist. \n" +
		"Did you build the blog with 'node build/blog'?");
	throw e;
}

var content = posts.map(function(post){
	return fs.readFileSync(__dirname + '/posts/' + post.htmlFile);
});

var postsByURL = {};

posts.forEach(function(post, i){
	post.date = new Date(post.date);
	postsByURL[post.url] = i;
});

var perPage = 2;
var pages = Math.ceil(posts.length / perPage);

module.exports = function(app){

	var index = function(req, res, next){
		var page = req.params.page ? parseInt(req.params.page, 10) : 1;

		// page with posts does not exit
		if (page < 1 || page > pages) return next();

		var count = page == pages ? (posts.length - (pages - 1) * perPage) : perPage;
		var _posts = new Array(count);
		for (var i = 0; i < count; i++){
			_posts[i] = posts[i + (page - 1) * perPage];
		}

		res.render('blog/index', {
			title: "MooTools Blog",
			posts: _posts,
			nextPage: page < pages && page + 1,
			previousPage: page > 1 && page - 1
		});

	};

	app.get('/blog', index);
	app.get('/blog/page/:page', index);

	app.get('/blog/:year/:month/:day/:title', function(req, res, next){
		var url = req.params.year + '/' + req.params.month + '/' +
			req.params.day + '/' + req.params.title;

		var postIndex = postsByURL[url];
		var post = postIndex != null && posts[postIndex];
		if (!post) return next();

		res.render('blog/post', {
			title: "MooTools Blog: " + post.title,
			post: post,
			content: content[postIndex]
		});

	});

};
