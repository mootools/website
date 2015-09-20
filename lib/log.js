"use strict";

var fs = require('fs');

var silent = false,
	monitors = [],
	files = {},
	streams = {};

function close(type){
	if (streams[type]){
		streams[type].end();
		streams[type] = null;
	}
}

function open(type, file){
	if (file){
		files[type] = file;
	} else {
		file = files[type];
	}

	close(type);

	if (file){
		var stream = fs.createWriteStream(file, {
			flags: 'a+',
			defaultEncoding: 'utf8',
			mode: parseInt('640', 8)
		});
		stream.addListener('error', function(error){
			stream.end();
			streams[type] = null;
			if (monitors.length){
				for (var i = 0, l = monitors.length; i < l; ++i){
					monitors[i].emit('error', error);
				}
			} else {
				throw error;
			}
		});
		streams[type] = stream;
	}
}

function write(type, data){
	var stream = streams[type];
	if (stream){
		stream.write('[' + (new Date()).toISOString() +  '] ' + data);
	}
}

function configure(configuration){
	if (configuration.silent != null) silent = configuration.silent;
	if (configuration.outFile) open('out', configuration.outFile);
	if (configuration.errFile) open('err', configuration.errFile);
}

function reload(){
	var types = Object.keys(files);
	for (var i = 0, l = types.length; i < l; ++i){
		open(types[i]);
	}
}

function attach(monitor){
	if (monitors.indexOf(monitor) == -1) monitors.push(monitor);
	monitor.addListener('stdout', log);
	monitor.addListener('stderr', logError);
}

function detach(monitor){
	var index = monitors.indexOf(monitor);
	if (index > -1) monitors.splice(index, 1);
	monitor.removeListener('stdout', log);
	monitor.removeListener('stderr', logError);
}

function log(data){
	write('out', data);
	if (!silent) process.stdout.write(data);
}

function logError(data){
	write('err', data);
	if (!silent) process.stderr.write(data);
}

exports.configure = configure;
exports.reload = reload;
exports.attach = attach;
exports.detach = detach;

exports.write = function(data){ return log(data + '\n'); };
exports.error = function(data){ return logError(data + '\n'); };
