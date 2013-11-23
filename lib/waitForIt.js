"use strict";

var slice = Array.prototype.slice;

module.exports = function(fn){

	var args;
	var isRunning = false;
	var callbacks = [];

	var done = function(callbacks, args){
		var cbs = callbacks.slice(), cb;
		while (cb = cbs.shift()) cb.apply(null, args);
	};

	return {

		get: function(callback){

			if (args){
				callback.apply(null, args);
				return;
			}

			callbacks.push(callback);

			if (isRunning){
				return;
			}

			isRunning = true;

			fn(function(){
				args = slice.call(arguments);
				isRunning = false;
				done(callbacks, args);
			});

			return this;
		},

		reset: function(){
			args = null;
			callbacks = [];
			return this;
		}

	};

};
