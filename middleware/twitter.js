"use strict";

var keys = require('./../config/api_keys.json').twitter;
var twitter = require('twitter');
var twit = new twitter(keys);

module.exports = function(interval){

	var tweets;

	// periodically fetching the Twiter API.
	var poller = function(){
		twit.get('/statuses/user_timeline.json', {include_entities:true, screen_name: 'mootools'}, function(data){
			tweets = data.slice(0, 3);
			console.log('recieved Twitter events data');
		});
	};
	
	setInterval(poller, (interval == null) ? 1000 * 60 * 30 : interval);
	return function(req, res, next){
		res.locals.twitter = tweets;
		if (next) next();
	};
	poller();
};
