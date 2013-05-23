"use strict";

var rs = require('robotskirt');
var hljs = require('highlight.js');
var slug = require ('slug');
var jade = require('jade');
var fs = require('fs');

var viewsDir = __dirname + '/../views';
var tocTemplate = jade.compile(fs.readFileSync(viewsDir + '/partials/docs/toc.jade'));
var headingTemplate = jade.compile(fs.readFileSync(viewsDir + '/partials/docs/heading.jade'));
var blockcodeTemplate = jade.compile(fs.readFileSync(viewsDir + '/partials/docs/blockcode.jade'));

function compile(md){

	var renderer = new rs.HtmlRenderer();

	renderer.blockcode = function(code, lang){
		if (lang == 'js') lang = 'javascript';
		else if (lang == 'html') lang = 'xml';
		else if (lang == 'shell') lang = 'bash';
		code = hljs.highlight(lang, code).value.trim();
		
		return blockcodeTemplate({
			lang: lang,
			code: code
		});
	};

	var data = [];
	var index = -1;

	var sidebar = '';
	var links = {};
	renderer.header = function(text, level){
		if (level == 1) {
			index++;
		}

		var section = data[index];
		if (!section) {
			data.push(section = {
				links: []
			});
		}

		if (level <= 2){
			// handle duplicate headers
			var link = slug(text);
			if (links[link]) link += '-' + links[link]++;
			else links[link] = 1;

			if (level == 1) {
				section.link = link;
				section.text = text;
			} else {
				section.links.push({
					link: link,
					text: text
				});
			}
		}

		return headingTemplate({
			level: level,
			link: link,
			text: text
		})
	};

	var parser = new rs.Markdown(renderer, [rs.EXT_FENCED_CODE]);

	var html = parser.render(md);

	return {content: html, toc: tocTemplate({toc: data})};
}

module.exports = compile;
