"use strict";

var rs = require('robotskirt');
var hljs = require('highlight.js');
var slug = require ('slugify');
var jade = require('jade');
var fs = require('fs');
var projects = require('../package.json')._projects;

var viewsDir = __dirname + '/../views';
var headingTemplate = jade.compile(fs.readFileSync(viewsDir + '/partials/docs/heading.jade'));
var blockcodeTemplate = jade.compile(fs.readFileSync(viewsDir + '/partials/docs/blockcode.jade'));
var linkTemplate = jade.compile(fs.readFileSync(viewsDir + '/partials/docs/link.jade'));

function preparePath(path){
	if (path.indexOf('#') != -1){
		var components = path.split('#');
		var file = components[0].split('/').filter(Boolean).slice(-2).join('/');
		path = file + '#' + components[1];
	} else {
		path = path.split('/').filter(Boolean).slice(-2).join('/');
	}
	return path;
}

function compile(md, path){

	var renderer = new rs.HtmlRenderer();

	if (!path) path = '';

	renderer.blockcode = function(code, lang){

		if (lang){
			if (lang == 'js') lang = 'javascript';
			else if (lang == 'html') lang = 'xml';
			else if (lang == 'shell') lang = 'bash';
		} else {
			if (code.match(/^<\w+[>\s]/)) lang = 'xml';
			else lang = 'javascript';
		}
		code = hljs.highlight(lang, code).value.trim();

		return blockcodeTemplate({
			lang: lang,
			code: code
		});
	};

	// fix redirection of old paths
	renderer.link = function(link, title, text){
		var version = path.match(/[\d.]+/);
		var project;

		if (link.match(/^\//)){
			project = link.match(/^\/([^\d\/]+)/)[1];
			var mdPath = preparePath(link);
			link = '/' + project + '/docs/' + version + '/' + mdPath;
		}
		if (link.match(/125$/)){
			project = link.match(/([^\d\/]+)\d+$/)[1];
			link = projects[project].versions.filter(function(version){
				return version.slice(0, 3) == '1.2';
			})[0];
			text = text.replace(/\s([\d.]+)\s/, ' ' + link + ' ');
		}

		return linkTemplate({link: link, text: text});
	}

	var sidebar = [];
	var links = {};
	var index = -1;
	var mdFile = path.split('/').pop();
	renderer.header = function(text, level){

		var anchorName = text.match(/{#(.*)}/);
		text = text.replace(/({#.*})/g, '');
		if (index == -1) index++;

		var section = sidebar[index];
		if (!section){
			sidebar.push(section = {
				links: []
			});
		}

		var link;
		if (level <= 2){
			// handle duplicate headers
			link = anchorName ? anchorName[1] : slug(text);
			if (links[link]) link += '-' + links[link]++;
			else links[link] = 1;

			if (level == 1){
				section.link = path ? path : '#' + link;
				section.text = mdFile;
			}

			var linkText = text.match(/[\w\s]+:([\S\s]+)/);
			section.links.push({
				link: (path || '') + '#' + link,
				text: linkText ? linkText[1] : text,
				subTitle: level == 1
			});
		}

		return headingTemplate({
			level: level,
			link: link,
			text: text
		});
	};

	var parser = new rs.Markdown(renderer, [rs.EXT_FENCED_CODE]);

	var html = parser.render(md);

	return {content: html, toc: sidebar};
}

module.exports = compile;
