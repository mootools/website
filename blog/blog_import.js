"use strict";

var fs = require('fs');
var compile = require('../lib/compile-md');
var slug = require('slugify');

var exportedBlog = fs.readFileSync('blog/archive.json');
var parsed = JSON.parse(exportedBlog);
var posts = parsed.channel.item;
var authors = parsed.channel.author;
var postsJSON = [];

function formateDate(d){
    var date = new Date(d);
    return [date.getFullYear(), (date.getMonth() + 1), date.getDate()].join('-'); 
}

function getName(nickname){
	var fullName;
	for (var i = 0; i < authors.length; i++){
		var loopAuthor = authors[i].author_display_name.__cdata.toLowerCase();
		if (loopAuthor == nickname){
			fullName = authors[i].author_first_name.__cdata + ' ' +authors[i].author_last_name.__cdata;
			break;
		}
	}
	if (!fullName) console.log('Blog author not found with nickname: ' + nickname);
	return fullName;
}

function extractData(comments){

	if (!comments) return [];
	var comentsArray = comments.length ? comments : [comments];
	comentsArray.map(function(comment){
		var data = {
			comment_author: comment.comment_author.__cdata,
			comment_date: comment.comment_date.__text,
			comment_content: comment.comment_content.__cdata
		};
		return data;
	});
}

function rebuildPost(post, index){

	var title = post.title;
	var content = post.encoded[0].__cdata
	var comments = extractData(post.comment); // TODO, ie use it.
	var tags = post.category.length ? post.category.map(function(cat){
		return cat._nicename;
	}) : [post.category._nicename];
	var permalink = post.guid.__text;
	var author = getName(post.creator.__cdata.toLowerCase());
	var renderLink = post.link.replace('http://mootools.net/blog/', '');
	var authorURL; // TODO
	var post_date = post.pubDate;
	var filename = 'blog/posts/' + renderLink.split('/')[3] + '.md';

	if (!content) return;
	content = compile(content, renderLink).content;

	var md ='---\n';
	md+='title: "' + title + '"\n';
	md+='date: "' + formateDate(post_date) + '"\n';
	md+='author: "' + author + '"\n';
	md+='tags: "' + tags + '"\n';
	md+='permalink: ' + renderLink + '\n';
	md+='---' + '\n';
	md+=content + '\n';

	postsJSON.push({htmlFile: filename, content: md, tags: '', date: formateDate(post_date)});

	fs.writeFile(filename, md, 'utf8', function(err){
		if (err) console.log('Error: ' + err);
	});
	return title;
}

// use only the published posts
posts = posts.filter(function(post){
	return post.status.__text == 'publish';
});

// order by date
posts = posts.sort(function(a, b){
	var date1 = new Date(a.pubDate);
	var date2 = new Date(b.pubDate);
	if (date1 > date2) return -1;
	if (date1 < date2) return 1;
	return 0;
});

posts.forEach(rebuildPost);

fs.writeFile('blog/posts/posts.json', JSON.stringify(postsJSON, null, 4), function(err) {
    if(err) {
      console.log('Error: ' + err);
    } else {
      console.log("JSON saved to posts.json");
    }
}); 
