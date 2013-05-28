"use strict";

var stylus = require('stylus');
var nib = require('nib');
var fs = require('fs');

var compileCSS = function(str, path){
	return stylus(str)
		.set('filename', path)
		.use(nib())
}

module.exports = function(app, options) {

	if (!options) options = {};
	if (!options.path) options.path = '/';

	// development only
	if ('development' == app.get('env')) {

		// wrapup middleware
		var wrapup = require('wrapup-middleware');
		app.get((options.path == '/' ? '' : options.path) + '/js/*.js', wrapup({
			src: options.dirname + '/views',
			dest: options.dirname + '/public'
		}));

		// stylus middleware
		app.use(options.path, stylus.middleware({
			src: options.dirname + '/views',
			dest: options.dirname + '/public',
			compile: function(str, path){
				return compileCSS(str, path)
					.set('linenos', true)
			}
		}));

	} else {

		// compile js
		var wrup = require('wrapup')();
		wrup.require(options.dirname + '/views/js/main.js')
			.options({
			output: options.dirname + '/public/js/main.js',
			compress: true
		})
			.up(function(err) {
			if (err) console.error(err);
			else console.log("built public/js/main.js");
		});

		// compile css
		var stylFile = options.dirname + '/views/css/style.styl';
		var str = fs.readFileSync(stylFile, 'utf8');

		compileCSS(str, stylFile)
			.render(function(err, css) {
			if (err) console.error(err);
			else {
				fs.writeFile(options.dirname + '/public/css/style.css', css);
				console.log("built public/css/style.js");
			}
		});
	}

};