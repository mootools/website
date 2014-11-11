"use strict";

module.exports = function(project){

	var builderHash = require('../middleware/builderHash')([project]);

	return function(req, res, next){
		var hash = req.params.hash;
		if (hash){
			builderHash.load(project, hash, function(data) {
				res.locals.hash = data.packages;
				next();
			});
		} else {
			return next();
		}
	}
};
