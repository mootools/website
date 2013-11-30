"use strict";

var fs = require('fs-extra');
var path = require('path');
var async = require('async');
var slug = require('slugify');
var compile = require('../lib/compile-md');
var fm = require('front-matter');
var pkg = require('../package.json');

var srcdir = path.join(__dirname, "/../blog/posts");
var destdir = path.join(__dirname, "../", pkg._buildOutput, "blog/posts");

build(srcdir, destdir);

var pad = function(n){
	return (n < 10 ? '0' : '') + n;
};

function build(srcdir, destdir){

	async.auto({

		mkdir: async.apply(fs.mkdirs, destdir),

		readdir: ['mkdir', function(callback){
			fs.readdir(srcdir, function(err, files){
				if (err) return callback(err);
				callback(null, files.filter(function(file){
					return (/\.md$/).test(file);
				}));
			});
		}],

		readfiles: ['readdir', function(callback, res){
			async.map(res.readdir, function(file, cb){
				fs.readFile(srcdir + '/' + file, "utf-8", function(err, data){
					if (err) return cb(err);
					cb(null, {file: file, md: data});
				});
			}, callback);
		}],

		compile: ['readfiles', function(callback, res){
			async.map(res.readfiles, function(file, cb){
				var parts = fm(file.md);
				var post = parts.attributes;

				if (!post.permalink){
					var link  = slug(post.title).toLowerCase();
					var date = post.date = new Date(post.date);
					post.permalink = link;
				}

				post.published = post.published !== false;
				post.file = file.file;
				post.htmlFile = file.file.replace(/\.md$/, '.html');
				if (typeof post.tags == 'string') post.tags = [post.tags];
				if (!post.tags || !Array.isArray(post.tags)) post.tags = [];
				var md = parts.body;
				var moreIndex = md.indexOf('<!--more-->');
				post.summary = compile(moreIndex == -1 ? md : md.slice(0, moreIndex)).content;
				var html = compile(md).content;
				cb(null, [post, html]);
			}, callback);
		}],

		saveHTML: ['compile', function(callback, res){
			async.map(res.compile.map(function(file, i){
				return {
					html: file[1],
					file: destdir + '/' + file[0].htmlFile
				};
			}), function(file, cb){
				fs.writeFile(file.file, file.html, cb);
			}, callback);
		}],

		saveJSON: ['compile', function(callback, res){
			var posts = res.compile.map(function(post){
				return post[0];
			}).filter(function(post){
				return post.published;
			}).sort(function(a, b){
				return b.date - a.date;
			});
			fs.writeFile(destdir + '/posts.json', JSON.stringify(posts, null, 2), callback);
		}]

	}, function(err, res){
		if (err) console.error(err);
		console.log("done building docs");
	});

}

