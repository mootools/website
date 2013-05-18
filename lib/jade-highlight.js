"use strict";

var hljs = require('highlight.js');

module.exports = function(code, options){
	var lang = options.lang;
	var indent = parseInt(options.indent, 10) || 4;

	var tab = new Array(indent + 1).join(' ');

	// fix indentation, code comes in with only one space
	code = code.split('\n').map(function(line){
		var indentations = line.match(/^\s+/g);
		if (!indentations) return line;
		var length = indentations[0].length;
		return new Array(length + 1).join(tab) + line.slice(length);
	}).join('\n');

	if (!lang) code = '<pre><code>' + code + '</code></pre>\n';
	else {
		if (lang == 'js') lang = 'javascript';
		else if (lang == 'html') lang = 'xml';
		else if (lang == 'shell') lang = 'bash';
		code = hljs.highlight(lang, code).value.trim();
		code = '<pre><code class="' + lang + '">' + code + '</code></pre>\n';
	}
	return code.replace(/'/g,'&#39;');
};


