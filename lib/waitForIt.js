"use strict";

module.exports = function(fn){

	var result, isRunning = false, callbacks = [];

	var done = function(err, res){
		var cbs = callbacks.slice(), cb;
		while (cb = cbs.shift()) cb(err, res);
	};

	return {

		get: function(callback){

			if (result){
				callback(null, result);
				return;
			}

			callbacks.push(callback);

			if (isRunning){
				return;
			}

			isRunning = true;

			fn(function(err, res){
				if (!err) result = res;
				isRunning = false;
				done(err, res);
			});

		},

		reset: function(){
			result = null;
			callbacks = [];
		}

	};

};
