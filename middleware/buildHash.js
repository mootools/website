"use strict";

var builderHash = require('../lib/BuilderHash')(require('../config/databases.json'));

module.exports = function(project){

	return function(req, res, next){
		var hash = req.params.hash;
		if (hash){
			builderHash.load(project, hash, function(err, data) {
				if (data){
					res.locals.hash = data.packages;
				}
				next(err);
			});
		} else {
			return next();
		}
	};
};
