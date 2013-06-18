"use strict";

var spawn = require('child_process').spawn;

spawn('../node_modules/.bin/mocha', [
	'./lib/*'
], {
	cwd: __dirname,
	stdio: 'inherit'
}).on('close', function(code){
	process.exit(code);
});
