"use strict";

var builderHash = require('../middleware/builderHash')(require('../config/databases.json'));

module.exports = function(project){

	return function(req, res, next){
		var hash = req.params.hash;
		if (hash){
			builderHash.load(project, hash, function(err, data) {
				if (err) next(err);
				else {
					res.locals.hash = data.packages;
					next();
				}
			});
		} else {
			return next();
		}
	};
};
