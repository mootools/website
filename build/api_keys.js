"use strict";

var fs = require('fs-extra');
var APIkeys = require('./../config/api_keys.json');
var readline = require('readline');
var rli;

function checkKeys(site, done){
    var keys = Object.keys(APIkeys[site]);
    (function question() {
        var key = keys.shift();
		if (!key) return done();
        rli.question('Please insert ' + site + '\'s ' + key + ': ', function(answer){
            if (answer) APIkeys[site][key] = answer;
            question();
        });
    })();
}

function question(site, next){
    rli.question('Do you want to add or change keys for ' + site + '? (y/n): ', function(answer){
        if (answer.toLowerCase() == 'y') checkKeys(site, next);
        else next();
    });
}

module.exports = function(){
	var services = Object.keys(APIkeys);
	rli = readline.createInterface({
	    input: process.stdin,
	    output: process.stdout
	});

	(function iterator(){
	    var service = services.shift();
	    if (service) return question(service, iterator);

	    rli.close();
		fs.writeFileSync(APIpath, JSON.stringify(APIkeys, null, 4));
	})();
}
