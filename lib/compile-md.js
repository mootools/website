"use strict";

var rs = require('robotskirt');
var hljs = require('highlight.js');
var slug = require ('slugify');
var jade = require('jade');
var fs = require('fs');

var viewsDir = __dirname + '/../views';
var headingTemplate = jade.compile(fs.readFileSync(viewsDir + '/partials/docs/heading.jade'));
var blockcodeTemplate = jade.compile(fs.readFileSync(viewsDir + '/partials/docs/blockcode.jade'));

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

	var sidebar = [];
	var links = {};
	var index = -1;

	renderer.header = function(text, level){

		var mdFile = path.split('/').pop();
		text = text.replace(/(\s?{#.*})/g, '');
		if (level == 1 || index == -1) index++;

		var section = sidebar[index];
		if (!section){
			sidebar.push(section = {
				links: []
			});
		}

		var link;
		if (level <= 2){
			// handle duplicate headers
			link = slug(text);
			if (links[link]) link += '-' + links[link]++;
			else links[link] = 1;

			if (level == 1){
				section.link = path ? path : '#' + link;
				section.text = mdFile;
			} else {
				section.links.push({
					link: (path ? path : '') + '#' + link,
					text: text
				});
			}
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
