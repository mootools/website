"use strict";

var async = require('async');
var blog = require('../blog/searchIndexing');

var index = async.apply(async.parallel, [
	blog
]);

module.exports = index;
