"use strict";

var rs = require('robotskirt');
var hljs = require('highlight.js');
var slug = require ('slug');

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

module.exports = compile;
