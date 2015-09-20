"use strict";

var app = 'index',
	name = 'mootools-website';

var Monitor = require('forever-monitor').Monitor,
	log = require('./lib/log.js');

var monitor = new Monitor(__dirname + '/' + app + '.js', {
	silent: true,
	minUptime: 2000,
	args: process.argv.splice(2)
});

log.attach(monitor);
try {
	log.configure(require('./config/log.json'));
} catch (error){
}

function stop(){
	log.error('** Requested stop of ' + name);
	monitor.stop();
}

function reload(){
	log.error('** Requested reload of ' + name);
	log.reload();
	monitor.restart();
}

function reloadLogs(){
	log.error('** Requested log reload of ' + name);
	log.reload();
}

process.addListener('SIGINT', stop);
process.addListener('SIGTERM', stop);
process.addListener('SIGHUP', reload);
process.addListener('SIGUSR2', reloadLogs);

monitor.addListener('start', function(){
	log.error('** Starting ' + name + ' monitor');
});

monitor.addListener('stop', function(){
	log.error('** Stopping ' + name + ' monitor');
});

monitor.addListener('exit:code', function(code){
	if (code == null) code = 0;
	log.error('** Detected ' + name + ' process exited (exit code ' + code + ')');
});

monitor.addListener('restart', function(){
	log.error('** Restarting ' + name + ' process (#' + monitor.times + ')');
});

monitor.addListener('error', function(error){
	if (error.stack){
		log.error('** ' + error.stack);
	} else if (error.message) {
		log.error('** Error: ' + error.message);
	} else {
		log.error('** Error: ' + error);
	}
});

monitor.start();
