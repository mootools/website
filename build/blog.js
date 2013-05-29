"use strict";

var fs = require('fs');
var async = require('async');
var slug = require('slug');
var compile = require('../lib/compile-md');
var splitMetaData = require('../lib/splitMarkdownMetaData');

build(__dirname + "/../blog/posts");

var pad = function(n){
	return (n < 10 ? '0' : '') + n;
};

function build(dir){

	async.auto({

		readdir: function(callback){
			fs.readdir(dir, function(err, files){
				if (err) return callback(err);
				callback(null, files.filter(function(file){
					return (/\.md$/).test(file);
				}));
			});
		},

		readfiles: ['readdir', function(callback, res){
			async.map(res.readdir, function(file, cb){
				fs.readFile(dir + '/' + file, "utf-8", function(err, data){
					if (err) return cb(err);
					cb(null, {file: file, md: data});
				});
			}, callback);
		}],

		compile: ['readfiles', function(callback, res){
			async.map(res.readfiles, function(file, cb){
				var parts = splitMetaData(file.md);
				var data = JSON.parse(parts[0]);
				if (!data.slug) data.slug = slug(data.title).toLowerCase();
				var date = data.date = new Date(data.date);
				data.url = '' + date.getFullYear() + '/' + pad(date.getMonth() + 1) +
					'/' + pad(date.getDate()) + '/' + data.slug;
				data.file = file.file;
				data.htmlFile = file.file.replace(/\.md$/, '.html');
				var md = parts[1];
				var moreIndex = md.indexOf('<!--more-->');
				data.summary = compile(moreIndex == -1 ? parts[1] : md.slice(0, moreIndex)).content;
				var html = compile(md).content;
				cb(null, [data, html]);
			}, callback);
		}],

		saveHTML: ['compile', function(callback, res){
			async.map(res.compile.map(function(file, i){
				return {
					html: file[1],
					file: dir + '/' + file[0].htmlFile
				};
			}), function(file, cb){
				fs.writeFile(file.file, file.html, cb);
			}, callback);
		}],

		saveJSON: ['compile', function(callback, res){
			var posts = res.compile.map(function(post){
				return post[0];
			}).sort(function(a, b){
				return b.date - a.date;
			});
			fs.writeFile(dir + '/posts.json', JSON.stringify(posts, null, 2), callback);
		}]

	}, function(err, res){
		if (err) console.error(err);
		console.log("done building docs");
	});

}

