"use strict";

var fs = require('fs');
var async = require('async');

function getName(nickname, authors){
	var author = authors.filter(function(writer){
		return writer.author_display_name.__cdata.toLowerCase() == nickname;
	})[0];
	if (!author) console.log('Blog author not found with nickname: ' + nickname);
	return author.author_first_name.__cdata + ' ' + author.author_last_name.__cdata;
}

function rebuildPost(post, authors, callback){

	var renderLink = post.link.replace('http://mootools.net/blog/', '');
	var content = post.encoded[0].__cdata;

	if (!content){
		if (post.status.__text == 'publish'){
			console.error(post);
			return callback(new Error('Post has no content'));
		}
		return callback();
	}

	if (!post.category.length) post.category = [post.category];
	var tags = post.category.map(function(cat){
		return cat._nicename;
	});

	var md = [
		'---',
		'title: "' + post.title + '"',
		'date: "' + post.pubDate + '"',
		'author: "' + getName(post.creator.__cdata.toLowerCase(), authors) + '"',
		'tags: "' + tags + '"',
		'permalink: "' + renderLink + '"',
		post.status.__text != 'publish' ? 'published: false' : '',
		'---',
		content
	].join('\n');

	var filename = 'blog/posts/' + renderLink.split('/')[3] + '.md';
	fs.writeFile(filename, md, 'utf8', callback);
}

function readArchive(file, callback){
	fs.readFile(file, 'utf-8', function(err, data){
		if (err) return callback(err);
		data = JSON.parse(data);
		callback(err, {
			posts: data.channel.item,
			authors: data.channel.author
		});
	});
}

var importPosts = async.compose(function(data, callback){
	async.map(data.posts, function(post, cb){
		rebuildPost(post, data.authors, cb);
	}, callback);
}, readArchive);

importPosts('build/archived-blog.json', function(err){
	if (err) console.error(err);
	else console.log('imported the old posts');
});

