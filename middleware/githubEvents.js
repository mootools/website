"use strict";

var GitHub = require('github');

module.exports = function(options){

	if (!options){
		throw new Error("you need to set options, with either an 'user' or 'org' property");
	}

	// interval updating the data happens
	if (!options.interval) options.interval = 1000 * 60 * 30; // each 30 minutes
	// if this number of request fail after each other, then just stop
	if (!options.maxFailingRequests) options.maxFailingRequests = 3;
	// the variable name the result ends up in your templates
	if (!options.variable) options.variable = 'githubEvents';

	var client = new GitHub({
		version: "3.0.0"
	});

	var request;

	// separate client options from the options used in this file
	var clientOptions = {};
	for (var k in options){
		if (!({interval: 1, maxFailingRequests: 1, variable: 1}[k])){
			clientOptions[k] = options[k];
		}
	}

	// using the data from an org or from an user
	if (options.org){
		request = function(callback){
			client.events.getFromOrg(clientOptions, callback);
		};
	} else if (options.user){
		request = function(callback){
			client.events.getFromUser(clientOptions, callback);
		};
	}

	if (!request){
		throw new Error("You either need to set a user or an organisation");
	}

	var errors = 0;
	var events;
	var timer;

	// periodically fetching the GitHub API.
	var poller = function(){
		request(function(err, data){
			if (err){
				console.error(err);
				// too many errors after each other, stop polling GitHub
				if (++errors < options.maxFailingRequests){
					clearInterval(timer);
				}
			} else {
				console.log('recieved GitHub events data');
				errors = 0;
				events = data;
			}
		});
		return poller;
	};

	timer = setInterval(poller(), options.interval);

	return function(req, res, next){
		res.locals[options.variable] = events;
		if (next) next();
	};

};
