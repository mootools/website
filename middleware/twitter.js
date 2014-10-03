"use strict";

var keys = require('./../config/api_keys.json').twitter;
var twitter = require('twitter');
var twit = new twitter(keys);

module.exports = function(interval){

	var tweets;
	var timer;

	// interval updating the data happens
	if (!interval) interval = 1000 * 60 * 30; // each 30 minutes

	// periodically fetching the Twiter API.
	var poller = function(){
		twit.get('/statuses/user_timeline.json', {include_entities:true, screen_name: 'mootools'}, function(data) {
			tweets = data.slice(0, 3);
			console.log('recieved Twitter events data');
		});
	};
	timer = setInterval(poller(), interval);
	return function(req, res, next){
		res.locals.twitter = tweets;
		if (next) next();
	};
};
