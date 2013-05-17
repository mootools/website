"use strict";

var fs = require('fs-extra');
var async = require('async');
var path = require('path');
var rs = require('robotskirt');
var hljs = require('highlight.js');
var slug = require ('slug');
var semver = require('semver');

var args = process.argv;

if (args.length < 3){
	console.log('usage: node docs.js [project]');
	process.exit(1);
}

var project = args[2];

var docsdir = __dirname + "/../" + project + "/docs";

build(project, docsdir);

function build(project, docsdir){

	async.auto({

		readdir: function(callback){
			fs.readdir(docsdir, function(err, files){
				if (err) return callback(err);
				async.filter(files, function(file, cb){
					fs.stat(docsdir + '/' + file, function(err, stat){
						cb(!err && stat.isDirectory());
					});
				}, function(files){
					callback(null, files);
				});
			});
		},

		doc: ['readdir', function(callback, res){
			async.map(res.readdir, function(file, cb){
				file = docsdir + '/' + file + '/doc/' + project + '.md';
				fs.readFile(file, "utf-8", cb);
			}, callback);
		}],

		compile: ['readdir', 'doc', function(callback, res){
			var files = res.readdir;
			async.each(files, function(file, cb){
				var md = res.doc[files.indexOf(file)];
				var html = compile(md);
				var version = file.slice(project.length + 1);
				async.parallel([
					async.apply(fs.writeFile, docsdir + '/' + 'toc-' + version + '.html', html.toc),
					async.apply(fs.writeFile, docsdir + '/' + 'content-' + version + '.html', html.content)
				], cb);
			}, callback);
		}],

		versions: ['readdir', function(cb, res){
			cb(null, res.readdir.map(function(file){
				return file.slice(project.length + 1);
			}).sort(semver.rcompare));
		}],

		makeVerionsIndex: ['versions', function(cb, res){
			fs.writeFile(docsdir + '/versions.json', JSON.stringify(res.versions, null, 2), cb);
		}]

	}, function(err){
		if (err) console.error(err);
		console.log("done building documentation html files for " + project);
	});

}

function compile(md){

	var renderer = new rs.HtmlRenderer();

	renderer.blockcode = function(code, lang){
		if (!lang) return '<pre><code>' + code + '</code></pre>\n';
		if (lang == 'js') lang = 'javascript';
		else if (lang == 'html') lang = 'xml';
		else if (lang == 'shell') lang = 'bash';
		code = hljs.highlight(lang, code).value.trim();
		return '<pre><code class="' + lang + '">' + code + '</code></pre>\n';
	};

	var sidebar = '';
	var links = {};
	renderer.header = function(text, level){
		if (level <= 2){

			// handle duplicate headers
			var link = slug(text);
			if (links[link]) link += '-' + links[link]++;
			else links[link] = 1;

			sidebar += '<a href="#' + link + '"' + (level == 1 ? ' class="top"' : '') + '>' + text + '</a>\n';
			text = '<a href="#' + link + '" name="' + link + '">' + text + '</a>';
		}
		return '<h' + level + '>' + text + '</h' + level + '>\n';
	};

	var parser = new rs.Markdown(renderer, [rs.EXT_FENCED_CODE]);

	var html = parser.render(md);

	return {content: html, toc: sidebar};
}
