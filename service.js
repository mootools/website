"use strict";

var app = 'index',
	name = 'mootools-website';

var Monitor = require('forever-monitor').Monitor;

var monitor = new Monitor(__dirname + '/' + app + '.js', {
	minUptime: 2000,
	args: process.argv.splice(2)
});

function stop(){
	console.error('** Requested stop of ' + name);
	monitor.stop();
}

function reload(){
	console.error('** Requested reload of ' + name);
	monitor.restart();
}

process.addListener('SIGINT', stop);
process.addListener('SIGTERM', stop);
process.addListener('SIGHUP', reload);

monitor.addListener('start', function(){
	console.error('** Starting ' + name + ' monitor');
});

monitor.addListener('stop', function(){
	console.error('** Stopping ' + name + ' monitor');
});

monitor.addListener('exit:code', function(code){
	if (code == null) code = 0;
	console.error('** Detected ' + name + ' process exited (exit code ' + code + ')');
});

monitor.addListener('restart', function(){
	console.error('** Restarting ' + name + ' process (#' + monitor.times + ')');
});

monitor.addListener('error', function(error){
	if (error.stack){
		console.error('** ' + error.stack);
	} else if (error.message) {
		console.error('** Error: ' + error.message);
	} else {
		console.error('** Error: ' + error);
	}
});

monitor.start();
