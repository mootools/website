"use strict";

var fs = require('fs');
var compile = require('../lib/compile-md');
var slug = require('slugify');
var parsed = JSON.parse(fs.readFileSync('build/archived-blog.json'));
var posts = parsed.channel.item;
var authors = parsed.channel.author;

function getName(nickname){
    var author = authors.filter(function(writer){
        return writer.author_display_name.__cdata.toLowerCase() == nickname;
    })[0];
    if (!author) console.log('Blog author not found with nickname: ' + nickname);
    return author.author_first_name.__cdata + ' ' + author.author_last_name.__cdata;
}

var rebuildPost = function(post, index){

	var renderLink = post.link.replace('http://mootools.net/blog/', '');
	var content = post.encoded[0].__cdata;
	if (!content){
		console.warn('Post has no content.');
		return;
	}
	content = compile(content, renderLink).content;
	var author = getName(post.creator.__cdata.toLowerCase());
	var authorURL; // TODO

	if (!post.category.length) post.category = [post.category];
	var tags  = post.category.map(function(cat){
		return cat._nicename;
	});

	var md = [
		'---',
		'title: "' + post.title + '"',
		'date: "' + post.pubDate + '"',
		'author: "' + author + '"',
		'tags: "' + tags + '"',
		'permalink: "' + renderLink + '"',
		'---',
		content
	].join('\n');

	var filename = 'blog/posts/' + renderLink.split('/')[3] + '.md';
	fs.writeFile(filename, md, 'utf8', function(err){
		if (err) console.log('Error: ' + err);
	});

	return {
		htmlFile: filename, 
		content: md, 
		tags: tags, 
		date: post.pubDate
	};
}

// use only the published posts
posts = posts.filter(function(post){
	return post.status.__text == 'publish';
}).sort(function(date1, date2){
	date1 = new Date(date1.pubDate);
	date2 = new Date(date2.pubDate);
	return date2 - date1;
}).map(function(post, number){
	return rebuildPost(post, number);
});

fs.writeFile('blog/posts/posts.json', JSON.stringify(posts, null, 4), function(err) {
    if(err) {
      console.log('Error: ' + err);
    } else {
      console.log("JSON saved to posts.json");
    }
}); 
