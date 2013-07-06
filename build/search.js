"use strict";

var indexing = require('../search/indexing');

indexing(function(err, results){
	console.log(err, results);
});
