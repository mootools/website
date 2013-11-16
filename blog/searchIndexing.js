"use strict";

var request = require('request');
var async = require('async');
var slug = require('slugify');
var data = require('./data');

function insertBlog(posts, callback){

	var commands = [];

	posts.posts.forEach(function(post){

		commands.push(
			JSON.stringify({
				index : {
					_index: 'page',
					_type: 'blogging',
					_id: post.permalink
				}
			}),
			JSON.stringify({
				title: post.title,
				date: post.date,
				author: post.author,
				tags: post.tags.slice(),
				url: "/blog/" + post.permalink,
				content: post.content.toString()
			})
		);

	});

	var _commands = commands.join("\n") + "\n";

	request.post("http://localhost:9200/_bulk/", {
		body: _commands
	}, function(err, res, body){
		callback(err, body);
	});
}

module.exports = async.compose(insertBlog, data.get);
