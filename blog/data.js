
var fs = require('fs');
var path = require('path');
var async = require('async');
var waitForIt = require('../lib/waitForIt');
var pkg = require('../package.json');

var dir = path.join(__dirname, '../', pkg._buildOutput, 'blog/posts');

function loadJSONPosts(callback){

	var JSONPath = dir + '/posts.json';

	try {
		callback(null, require(JSONPath));
	} catch (e){
		callback(new Error(JSONPath + " doesn not exist. \n" +
			"Did you build the blog with 'node build/blog'?"));
	}

}

function loadPost(post, callback){
	fs.readFile(dir + '/' + post.htmlFile, function(err, str){
		if (err) return callback(err);
		post.content = str;
		callback(null, post);
	});
}

function loadContent(posts, callback){
	async.map(posts, loadPost, callback);
}

function index(posts, callback){

	var total = {
		posts: posts,
		urls: {},
		tags: {}
	};

	posts.forEach(function(post, i){
		post.date = new Date(post.date);
		total.urls[post.permalink] = i;
		if (post.tags && Array.isArray(post.tags)) post.tags.forEach(function(tag){
			tag = tag.toLowerCase();
			(total.tags[tag] || (total.tags[tag] = [])).push(i);
		});
	});

	callback(null, total);

}

var load = async.compose(index, loadContent, loadJSONPosts);

module.exports = waitForIt(load);
